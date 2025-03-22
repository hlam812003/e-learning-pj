import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID, IsOptional } from 'class-validator';

@ObjectType()
export class CourseDto {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  courseName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  abstract?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
