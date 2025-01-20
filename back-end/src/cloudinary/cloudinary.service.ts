import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(imagePath: string) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'products',
      });
      return result;
    } catch (error) {
      console.error("Erreur lors de l'upload sur Cloudinary:", error);
      throw error;
    }
  }

  async uploadImages(imagePaths: string[]) {
    try {
      const results = await Promise.all(
        imagePaths.map((imagePath) => this.uploadImage(imagePath)),
      );
      return results;
    } catch (error) {
      console.error("Erreur lors de l'upload sur Cloudinary:", error);
      throw error;
    }
  }
}
