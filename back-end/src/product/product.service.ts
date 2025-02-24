import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { UploadApiResponse } from 'cloudinary';

export interface productData {
  images: string[];
  price: number;
  promotionPrice: number;
  stock: number;
  alertStock: number;
  weight: number;
  name: string;
  description: string;
  collection: string;
  details: string;
  specifications: string;
  dimensions: string;
  material: string;
}

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(product: productData) {
    try {
      const productCreatedId =
        await this.productRepository.createProduct(product);
      for (const imageUrl of product.images) {
        await this.productRepository.createProductImage(
          productCreatedId,
          imageUrl,
        );
      }
      return productCreatedId;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product');
    }
  }

  findOne(id: number) {
    try {
      return this.productRepository.findProduct(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  async updateProduct(productUpdated: productData, id: number) {
    try {
      await this.productRepository.updateProduct(productUpdated, id);
      await this.productRepository.deleteAllImagesFromProduct(id);
      for (const image of productUpdated.images) {
        await this.productRepository.createProductImage(id, image);
      }
      return productUpdated;
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }

  remove(id: number) {
    try {
      return this.productRepository.deleteProduct(id);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product');
    }
  }
}
