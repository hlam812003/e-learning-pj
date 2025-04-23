import { Module } from '@nestjs/common';
import { UserService } from '../common/providers/user.service';
import { UserResolver } from '../common/resolvers/user.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { UserDAO } from '../common/DAO/user.dao';
import { AuthModule } from './auth.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserResolver, UserDAO, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
