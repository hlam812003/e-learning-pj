import { Module } from '@nestjs/common';
import { EnrollmentResolver } from '../common/resolvers/enrollment.resolver';
import { EnrollmentService } from '../common/providers/enrollment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [EnrollmentResolver, EnrollmentService, PrismaService],
  exports: [EnrollmentService], // Xuất EnrollmentService để sử dụng ở nơi khác
})
export class EnrollmentModule {}
