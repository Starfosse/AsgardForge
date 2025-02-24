import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';

@Injectable()
export class CollectionService {
  constructor(private readonly productRepository: ProductRepository) {}
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
}
