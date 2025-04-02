import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from '../providers/course.service';
import { CourseDto } from '../DTO/cousre/course.dto';
import { CreateCourseDto } from '../DTO/cousre/create-course.dto';
import { UpdateCourseDto } from '../DTO/cousre/update-course.dto';

@Resolver(() => CourseDto)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => [CourseDto])
  async getAllCourses(): Promise<CourseDto[]> {
    const courses = await this.courseService.getAllCourses();
    return courses.map((course) => ({
      ...course,
      abstract: course.abstract,
    }));
  }

  @Query(() => CourseDto, { nullable: true })
  async getCourseById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CourseDto | null> {
    return this.courseService.getCourseById(id);
  }

  @Mutation(() => CourseDto)
  async createCourse(@Args('data') data: CreateCourseDto): Promise<CourseDto> {
    return this.courseService.createCourse(data);
  }

  @Mutation(() => CourseDto)
  async updateCourse(@Args('data') data: UpdateCourseDto): Promise<CourseDto> {
    return this.courseService.updateCourse(data);
  }

  @Mutation(() => CourseDto)
  async deleteCourse(@Args('id') id: string): Promise<CourseDto> {
    return this.courseService.deleteCourse(id);
  }
}
