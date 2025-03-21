import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { UserResponse } from './dto/user.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => ({
      ...user,
      phoneNumber: user.phoneNumber ?? undefined, // 👈 Chuyển null thành undefined
    }));
  }
  
  async findOne(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { 
      ...user, 
      phoneNumber: user.phoneNumber ?? undefined // 👈 Chuyển null thành undefined
    };
  }
  
  async create(data: CreateUserInput): Promise<UserResponse> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber ?? undefined, // 👈 Chuyển null thành undefined
        role: "user",
      }
    });
  
    return { 
      ...user, 
      phoneNumber: user.phoneNumber ?? undefined 
    };
  }
  
  async update(data: UpdateUserInput): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({ where: { id: data.id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.id} not found`);
    }
  
    if (data.email) {
      const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (emailExists && emailExists.id !== data.id) {
        throw new BadRequestException('Email already in use by another user');
      }
    }
  
    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data,
    });
  
    return { 
      ...updatedUser, 
      phoneNumber: updatedUser.phoneNumber ?? undefined 
    };
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
  
}
