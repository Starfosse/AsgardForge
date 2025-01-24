import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionsRepository } from './promotions.repository';

@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService,
    private readonly promotionsRepository: PromotionsRepository,
  ) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    try {
      return await this.promotionsRepository.createPromotion(
        createPromotionDto,
      );
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw new Error('Could not create promotion');
    }
  }

  @Get()
  async findAll() {
    try {
      return this.promotionsRepository.getPromotions();
    } catch (error) {
      console.error('Error getting promotions:', error);
      throw new Error('Could not get promotions');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.promotionsRepository.getPromotionById(+id);
    } catch (error) {
      console.error('Error getting promotion:', error);
      throw new Error('Could not get promotion');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionsRepository.updatePromotion(+id, updatePromotionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.promotionsRepository.deletePromotion(+id);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw new Error('Could not delete promotion');
    }
  }
}
