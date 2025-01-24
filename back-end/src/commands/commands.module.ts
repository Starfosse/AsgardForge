import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { CommandsRepository } from './commands.repository';

@Module({
  controllers: [CommandsController],
  providers: [CommandsService, CommandsRepository],
})
export class CommandsModule {}
