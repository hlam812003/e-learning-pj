import { Module } from '@nestjs/common';
import { UserService } from '../common/providers/user.service';
import { UserResolver } from '../common/resolvers/user.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDAO } from '../common/DAO/user.dao';

@Module({
  providers: [UserResolver, UserDAO, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
