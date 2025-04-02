import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateEnrollmentInput {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  courseId: string;
}