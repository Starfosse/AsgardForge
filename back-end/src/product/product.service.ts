import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

export interface productData {
  images: string[];
  price: number;
  promotion_price: number;
  stock: number;
  alertStock: number;
  weight: number;
  name: string;
  description: string;
  collection: string;
  specifications: string;
  dimensions: string;
  material: string;
  featured: boolean;
}

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(product: productData) {
    try {
      console.log('product', product);
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
      console.log('productUpdated', productUpdated);
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
