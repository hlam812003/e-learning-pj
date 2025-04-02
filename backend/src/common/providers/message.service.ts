import { Injectable } from '@nestjs/common';
import { MessageDAO } from '../DAO/message.dao';
import {
  CreateMessageInput,
  UpdateMessageInput,
} from '../DTO/message/message.input';
import { MessageResponse } from '../DTO/message/message.response';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MessageService {
  constructor(private readonly messageDAO: MessageDAO) {}

  async createMessage(input: CreateMessageInput): Promise<MessageResponse> {
    const message = await this.messageDAO.createMessage({
      content: input.content,
      senderType: input.senderType,
      conversationId: input.conversationId,
    });
    return plainToClass(MessageResponse, message);
  }

  async getMessageById(id: string): Promise<MessageResponse | null> {
    const message = await this.messageDAO.getMessageById(id);
    if (!message) return null;
    return plainToClass(MessageResponse, message);
  }

  async getMessagesByConversationId(
    conversationId: string,
  ): Promise<MessageResponse[]> {
    const messages =
      await this.messageDAO.getMessagesByConversationId(conversationId);
    return messages.map((message) => plainToClass(MessageResponse, message));
  }

  async updateMessage(input: UpdateMessageInput): Promise<MessageResponse> {
    const message = await this.messageDAO.updateMessage(input.id, {
      content: input.content,
    });
    return plainToClass(MessageResponse, message);
  }

  async deleteMessage(id: string): Promise<MessageResponse> {
    const message = await this.messageDAO.deleteMessage(id);
    return plainToClass(MessageResponse, message);
  }

  async deleteMessagesByConversationId(
    conversationId: string,
  ): Promise<number> {
    return this.messageDAO.deleteMessagesByConversationId(conversationId);
  }
}
