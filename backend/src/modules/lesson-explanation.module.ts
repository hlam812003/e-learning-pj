import { Module } from '@nestjs/common';
import { LessonExplanationService } from '../common/providers/lesson-explanation.service';
import { LessonExplanationDAO } from '../common/DAO/lesson-explanation.dao';
import { LessonExplanationResolver } from '../common/resolvers/lesson-explanation.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [
    LessonExplanationService,
    LessonExplanationDAO,
    LessonExplanationResolver,
  ],
  exports: [LessonExplanationService],
})
export class LessonExplanationModule {}
