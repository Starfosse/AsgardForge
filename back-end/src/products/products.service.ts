import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
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
  category: string;
  details: string;
  specifications: string;
  dimensions: string;
  material: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async create(product: productData) {
    try {
      const productCreatedId =
        await this.productsRepository.createProduct(product);
      for (const imageUrl of product.images) {
        await this.productsRepository.createProductImage(
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

  findOne(name: string) {
    try {
      return this.productsRepository.findProductByName(name);
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  async updateProduct(productUpdated: productData, id: number) {
    try {
      await this.productsRepository.updateProduct(productUpdated, id);
      await this.productsRepository.deleteAllImagesFromProduct(id);
      for (const image of productUpdated.images) {
        await this.productsRepository.createProductImage(id, image);
      }
      return productUpdated;
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }

  remove(name: string) {
    try {
      return this.productsRepository.deleteProduct(name);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product');
    }
  }
}
