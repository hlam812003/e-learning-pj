import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProgressService } from '../providers/progress.service';
import { UpdateProgressInput } from '../DTO/progress/progress.input';
import { ProgressResponse } from '../DTO/progress/progress.response';
import { UserResponse } from '../DTO/user/user.response';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Resolver('Progress')
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Mutation(() => ProgressResponse)
  async updateProgress(@Args('input') input: UpdateProgressInput): Promise<ProgressResponse> {
  return this.progressService.updateProgress(input);
}


@Query(() => ProgressResponse)
async getProgress(@Args('progressId') progressId: string): Promise<ProgressResponse> {
  return this.progressService.getProgress(progressId);
}
}