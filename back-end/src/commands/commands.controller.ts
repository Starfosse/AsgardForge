import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandsRepository } from './commands.repository';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';

@Controller('commands')
export class CommandsController {
  constructor(
    private readonly commandsService: CommandsService,
    private readonly commandsRepository: CommandsRepository,
  ) {}

  @Post()
  async create(@Body() createCommandDto: CreateCommandDto) {
    try {
      return this.commandsRepository.createCommand(createCommandDto);
    } catch (error) {
      console.error('Error creating command:', error);
      throw new Error('Could not create command');
    }
  }

  @Get('/users/:userId')
  findAll(@Param('userId') userId: string) {
    return this.commandsService.findAll(+userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.commandsService.findOne(+id);
    } catch (error) {
      console.error('Error getting command:', error);
      throw new Error('Could not get command');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commandsRepository.remove(+id);
    } catch (error) {
      console.error('Error removing command:', error);
      throw new Error('Could not remove command');
    }
  }
}
