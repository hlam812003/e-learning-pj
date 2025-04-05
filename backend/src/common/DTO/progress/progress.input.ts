import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength, IsInt, Min } from 'class-validator';

@InputType()
export class UpdateProgressInput {
  @Field()
  progressId: string;

  @Field()
  @IsInt()
  @Min(0)
  completedLessons: number;


}