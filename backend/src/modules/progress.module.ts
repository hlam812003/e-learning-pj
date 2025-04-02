import { Module } from '@nestjs/common';
import { ProgressService } from '../common/providers/progress.service';
import { ProgressResolver } from '../common/resolvers/progress.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ProgressService, ProgressResolver, PrismaService],
  exports: [ProgressService], // Xuất ProgressService để sử dụng ở nơi khác
})
export class ProgressModule {}
