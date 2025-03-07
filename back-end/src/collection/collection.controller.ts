import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection-dto';
import { AuthGuard } from '@nestjs/passport';
import { Customer } from 'src/customer/entities/customer.entity';
import { CurrentUser } from 'src/customer/decorators/current-customer.decorator';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @CurrentUser() user: Customer,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    try {
      return await this.collectionService.createCollection(
        createCollectionDto.name,
        createCollectionDto.description,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not create collection');
    }
  }

  @Get()
  async findAll() {
    return await this.collectionRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.collectionRepository.findCollection(id);
  }

  @Get(':id/products')
  async findProducts(@Param('id') id: number) {
    try {
      return await this.collectionService.findProductsByCollection(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @CurrentUser() user: Customer,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    try {
      console.log('id', id);
      return await this.collectionService.updateCollection(
        +id,
        createCollectionDto.name,
        createCollectionDto.description,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not update collection');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@CurrentUser() user: Customer, @Param('id') id: number) {
    if (user.email !== process.env.ADMIN_USER_EMAIL) {
      throw new Error('You are not authorized to create a collection');
    }
    try {
      return await this.collectionRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete collection');
    }
  }
}
