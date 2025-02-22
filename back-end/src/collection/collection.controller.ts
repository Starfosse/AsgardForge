import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection-dto';

@Controller('collection')
export class CategoryController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCollectionDto) {
    try {
      return await this.collectionRepository.create(
        createCategoryDto.name,
        createCategoryDto.description,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not create category');
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

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() createCategoryDto: CreateCollectionDto,
  ) {
    try {
      return await this.collectionRepository.update(
        name,
        createCategoryDto.name,
        createCategoryDto.description,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not update category');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.collectionRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete category');
    }
  }
}
