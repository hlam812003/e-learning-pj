import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonService } from '../providers/lesson.service';
import { LessonDto } from '../DTO/lesson/lesson.dto';
import { CreateLessonDto } from '../DTO/lesson/create-lesson.dto';
import { UpdateLessonDto } from '../DTO/lesson/update-lesson.dto';

@Resolver(() => LessonDto)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => [LessonDto])
  async getAllLessons(): Promise<LessonDto[]> {
    const lessons = await this.lessonService.getAllLessons();
    return lessons.map((lesson) => ({
      ...lesson,
      abstract: lesson.abstract,
    }));
  }

  @Query(() => LessonDto, { nullable: true })
  async getLessonById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LessonDto | null> {
    return this.lessonService.getLessonById(id);
  }

  @Mutation(() => LessonDto)
  async createLesson(@Args('data') data: CreateLessonDto): Promise<LessonDto> {
    return this.lessonService.createLesson(data);
  }

  @Mutation(() => LessonDto)
  async updateLesson(@Args('data') data: UpdateLessonDto): Promise<LessonDto> {
    return this.lessonService.updateLesson(data);
  }

  @Mutation(() => LessonDto)
  async deleteLesson(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LessonDto> {
    return this.lessonService.deleteLesson(id);
  }
}
