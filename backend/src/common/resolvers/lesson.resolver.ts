import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonService } from '../providers/lesson.service';
import { LessonDto } from '../DTO/lesson/lesson.dto';
import { CreateLessonDto } from '../DTO/lesson/create-lesson.dto';
import { UpdateLessonDto } from '../DTO/lesson/update-lesson.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, RolesGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Resolver(() => LessonDto)
@UseGuards(AuthGuard, RolesGuard)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => [LessonDto])
  @Roles('USER', 'ADMIN')
  async getAllLessons(): Promise<LessonDto[]> {
    const lessons = await this.lessonService.getAllLessons();
    return lessons.map((lesson) => ({
      ...lesson,
      abstract: lesson.abstract,
    }));
  }

  @Query(() => [LessonDto])
  @Roles('USER', 'ADMIN')
  async getLessonsByCourseId(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LessonDto[]> {
    return this.lessonService.getLessonsByCourseId(id);
  }

  @Query(() => LessonDto, { nullable: true })
  @Roles('USER', 'ADMIN')
  async getLessonById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LessonDto | null> {
    return this.lessonService.getLessonById(id);
  }

  @Mutation(() => LessonDto)
  @Roles('ADMIN')
  async createLesson(@Args('data') data: CreateLessonDto): Promise<LessonDto> {
    return this.lessonService.createLesson(data);
  }

  @Mutation(() => LessonDto)
  @Roles('ADMIN')
  async updateLesson(@Args('data') data: UpdateLessonDto): Promise<LessonDto> {
    return this.lessonService.updateLesson(data);
  }

  @Mutation(() => LessonDto)
  @Roles('ADMIN')
  async deleteLesson(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LessonDto> {
    return this.lessonService.deleteLesson(id);
  }
}
