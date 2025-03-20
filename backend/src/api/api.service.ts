import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterInput, LoginInput, GoogleLoginInput } from './dto/api.input';
import { ApiResponse } from './dto/api.response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // ✅ Sửa lỗi xử lý email đã tồn tại
  async register(data: RegisterInput): Promise<ApiResponse> {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          username: 'testuser',
          password: hashedPassword,
          role: 'USER',
        },
      });

      return { 
        success: true,
        message: "User registered successfully",
        token: this.jwtService.sign({ id: user.id, role: user.role }),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Sửa lỗi khi email không tồn tại hoặc mật khẩu sai
  async login(data: LoginInput): Promise<ApiResponse> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      return {
        success: false,
        message: "Email or password is incorrect",
        token: undefined,
      };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password).catch(() => false);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Email or password is incorrect",
        token: undefined,
      };
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return {
      success: true,
      message: "Login successful",
      token,
    };
  }

  // ✅ Kiểm tra Google ID trước khi tạo user mới
  async googleLogin(data: GoogleLoginInput): Promise<ApiResponse> {
    if (!data.googleId || !data.email) {
      throw new BadRequestException('Google ID and email are required');
    }

    let user = await this.prisma.user.findUnique({ where: { email: data.email } });

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await this.prisma.user.create({
        data: {
          email: data.email,
          googleId: data.googleId,
          role: 'USER',
        },
      });
    } else if (!user.googleId) {
      // Nếu user đã tồn tại nhưng chưa có googleId, cập nhật
      await this.prisma.user.update({
        where: { email: data.email },
        data: { googleId: data.googleId },
      });
    }

    return { 
      success: true,
      message: isNewUser ? "New user created via Google login" : "Google login successful",
      token: this.jwtService.sign({ id: user.id, role: user.role }),
    };
  }

  // ✅ Kiểm tra context trước khi xóa JWT
  async logout(context): Promise<boolean> {
    if (!context || !context.res || typeof context.res.clearCookie !== 'function') {
      throw new UnauthorizedException('Logout failed: Invalid request context');
    }
    
    context.res.clearCookie('jwt');
    return true;
  }
}
