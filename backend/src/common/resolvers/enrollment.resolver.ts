import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EnrollmentService } from '../providers/enrollment.service';
import { CreateEnrollmentInput } from '../DTO/enrollment/enrollment.input';
import { EnrollmentResponse } from '../DTO/enrollment/enrollment.response';

@Resolver(() => EnrollmentResponse) // Sửa để đảm bảo TypeScript hiểu đúng kiểu dữ liệu
export class EnrollmentResolver {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Mutation(() => EnrollmentResponse)
  async enrollCourse(@Args('input') input: CreateEnrollmentInput): Promise<EnrollmentResponse> {
    return this.enrollmentService.enrollUserToCourse(input);
  }

  @Query(() => [EnrollmentResponse])
  async getUserEnrollments(@Args('userId') userId: string): Promise<EnrollmentResponse[]> {
    return this.enrollmentService.getUserEnrollments(userId);
  }
}
