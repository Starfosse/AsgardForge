import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection-dto';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
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
  async update(
    @Param('id') id: string,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    try {
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
  async remove(@Param('id') id: number) {
    try {
      return await this.collectionRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete collection');
    }
  }
}
