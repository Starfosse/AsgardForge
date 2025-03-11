import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
  constructor(
    private readonly productRepository: ProductRepository,
    private collectionRepository: CollectionRepository,
  ) {}

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
