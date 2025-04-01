import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEnum, IsUUID } from 'class-validator';
import { SenderType } from '@prisma/client';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => String)
  @IsEnum(SenderType)
  senderType: SenderType;

  @Field(() => String)
  @IsUUID()
  conversationId: string;
}

@InputType()
export class UpdateMessageInput {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  content: string;
}
