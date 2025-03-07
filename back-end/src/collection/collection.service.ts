import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
  constructor(
    private readonly productRepository: ProductRepository,
    private collectionRepository: CollectionRepository,
  ) {}
  async findProductsByCollection(id: number) {
    const productsWithImage = [];
    const products = await this.productRepository.findProductsByCollection(id);
    for (const values of Object.values(products)) {
      const product = values;
      const images = await this.productRepository.findFirstImageFromProduct(
        values.id,
      );
      productsWithImage.push({
        ...product,
        images,
      });
    }
    return productsWithImage;
  }

  async createCollection(name: string, description: string) {
    const collectionId = await this.collectionRepository.create(
      name,
      description,
    );
    return await this.collectionRepository.findCollection(collectionId);
  }

  async updateCollection(
    id: number,
    newCollection: string,
    description: string,
  ) {
    const collectionUpdatedId = await this.collectionRepository.update(
      id,
      newCollection,
      description,
    );
    return await this.collectionRepository.findCollection(collectionUpdatedId);
  }
}
