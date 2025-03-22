// course.module.ts
import { Module } from '@nestjs/common';
import { CourseService } from '../common/providers/course.service';
import { CourseResolver } from '../common/resolvers/course.resolver';
import { CourseDAO } from '../common/DAO/course.dao';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule
  providers: [CourseService, CourseResolver, CourseDAO],
  exports: [CourseService],
})
export class CourseModule {}
