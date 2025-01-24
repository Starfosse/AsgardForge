import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}

  async createPromotion(createPromotionDto: CreatePromotionDto) {
    try {
      const [rows]: any = await this.connection.execute(
        'INSERT INTO promotions (code, description, reduction) VALUES (?, ?, ?)',
        [
          createPromotionDto.code,
          createPromotionDto.description,
          createPromotionDto.reduction,
        ],
      );
      return rows.insertId;
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw new Error('Could not create promotion');
    }
  }

  async updatePromotion(id: number, updatePromotionDto: UpdatePromotionDto) {
    try {
      await this.connection.execute(
        'UPDATE promotions SET code = ?, description = ?, reduction = ? WHERE id = ?',
        [
          updatePromotionDto.code,
          updatePromotionDto.description,
          updatePromotionDto.reduction,
          id,
        ],
      );
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw new Error('Could not update promotion');
    }
  }

  async deletePromotion(id: number) {
    try {
      await this.connection.execute('DELETE FROM promotions WHERE id = ?', [
        id,
      ]);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw new Error('Could not delete promotion');
    }
  }

  async getPromotionById(id: number) {
    try {
      const [promotions]: any = await this.connection.execute(
        'SELECT * FROM promotions WHERE id = ?',
        [id],
      );
      if (!promotions || !promotions[0]) return null;
      return promotions[0];
    } catch (error) {
      console.error('Error getting promotion:', error);
      throw new Error('Could not get promotion');
    }
  }

  async getPromotions() {
    try {
      const [promotions]: any = await this.connection.execute(
        'SELECT * FROM promotions',
      );
      return promotions;
    } catch (error) {
      console.error('Error getting promotions:', error);
      throw new Error('Could not get promotions');
    }
  }
}
