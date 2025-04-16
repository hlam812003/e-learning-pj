import { Module } from '@nestjs/common';
import { SystemPromptService } from '../common/providers/system-prompt.service';
import { SystemPromptResolver } from '../common/resolvers/system-prompt.resolver';
import { SystemPromptDAO } from '@/common/DAO/systemPrompt.dao';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule


@Module({
  imports: [PrismaModule], // Import PrismaModule
  providers: [SystemPromptService, SystemPromptDAO, SystemPromptResolver],
  exports: [SystemPromptService],
})
export class SystemPromptModule {}
