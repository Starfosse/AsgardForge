import { Injectable } from '@nestjs/common';
import { CommandsRepository } from './commands.repository';
import { CreateCommandDto } from './dto/create-command.dto';

@Injectable()
export class CommandsService {
  constructor(private commandsRepository: CommandsRepository) {}

  create(createCommandDto: CreateCommandDto) {
    return 'This action adds a new command';
  }

  async findAll(userId: number) {
    try {
      const commandsUser = [];
      const commandsDetails =
        await this.commandsRepository.getCommandsByUserId(userId);
      for (const command of commandsDetails) {
        const commandItemsDetails =
          await this.commandsRepository.getCommandItemsByCommandId(command.id);
        const commandDetails = { command, commandItemsDetails };
        commandsUser.push(commandDetails);
      }
      return commandsUser;
    } catch (error) {
      console.error('Error getting commands:', error);
      throw new Error('Could not get commands');
    }
  }

  async findOne(id: number) {
    try {
      const commandDetails = await this.commandsRepository.getCommandById(id);
      const commandItemsDetails =
        await this.commandsRepository.getCommandItemsByCommandId(id);
      const command = { commandDetails, commandItemsDetails };
      return command;
    } catch (error) {
      console.error('Error getting command:', error);
      throw new Error('Could not get command');
    }
  }
}
