import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.create(
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
    console.log('findAll');
    return await this.categoryRepository.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.categoryRepository.findCategory(name);
  }

  @Get(':name/products')
  async findProducts(@Param('name') name: string) {
    try {
      return await this.categoryService.findProductsByCategory(name);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      return await this.categoryRepository.update(
        name,
        createCategoryDto.name,
        createCategoryDto.description,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not update category');
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    try {
      return await this.categoryRepository.delete(name);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete category');
    }
  }
}
