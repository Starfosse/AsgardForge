import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { productData } from './product.service';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}

  async createProduct(product: productData) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM collections WHERE name = ?',
        [product.collection],
      );
      const [result]: any = await this.connection.query(
        'INSERT INTO products (name, description, price, promotion_price, stock, collection_id, alert_stock, specifications, dimensions, weight, material, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product.name,
          product.description,
          product.price,
          product.promotion_price,
          product.stock,
          rows[0].id,
          product.alertStock,
          product.specifications,
          product.dimensions,
          product.weight,
          product.material,
          product.featured ? 1 : 0,
        ],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product (repository)');
    }
  }

  async findProduct(id: number) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM products WHERE id = ?',
        [id],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find product');
    }
  }

  async findAll() {
    try {
      const [rows] = await this.connection.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  async deleteProduct(id: number) {
    try {
      await this.connection.query('DELETE FROM products WHERE id = ?', [id]);
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product');
    }
  }

  async createProductImage(productId: number, imageUrl: string) {
    try {
      const [result] = await this.connection.query(
        'SELECT COALESCE(MAX(image_order), -1) as maxOrder FROM product_images WHERE product_id = ?',
        [productId],
      );

      const nextOrder = result[0].maxOrder + 1;

      await this.connection.query(
        'INSERT INTO product_images (product_id, image_path, image_order) VALUES (?, ?, ?)',
        [productId, imageUrl, nextOrder],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not create product image');
    }
  }

  async findAllImagesFromProduct(productId: number) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM product_images WHERE product_id = ? ORDER BY image_order ASC',
        [productId],
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find images');
    }
  }

  async findFirstImageFromProduct(productId: number) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM product_images WHERE product_id = ? ORDER BY image_order ASC LIMIT 1',
        [productId],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Could not find image');
    }
  }

  async findProductsByCollection(id: number) {
    try {
      const [rows] = await this.connection.query(
        `SELECT p.*, (SELECT pi.image_path FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.image_order ASC LIMIT 1) AS main_image FROM products p WHERE p.collection_id = ?ORDER BY p.created_at DESC`,
        [id],
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }

  async deleteProductImage(productId: number, imageUrl: string) {
    try {
      await this.connection.query(
        'DELETE FROM product_images WHERE product_id = ? AND image_path = ?',
        [productId, imageUrl],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product image');
    }
  }

  async deleteAllImagesFromProduct(productId: number) {
    try {
      await this.connection.query(
        'DELETE FROM product_images WHERE product_id = ?',
        [productId],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not delete product images');
    }
  }

  async updateProduct(product: productData, id: number) {
    try {
      const [rows] = await this.connection.query(
        'SELECT * FROM products WHERE id = ?',
        [id],
      );
      await this.connection.query(
        'UPDATE products SET name = ?, description = ?, price = ?, promotion_price = ?, stock = ?, collection_id = ?, alert_stock = ?, specifications = ?, dimensions = ?, weight = ?, material = ?, featured = ? WHERE id = ?',
        [
          product.name,
          product.description,
          product.price,
          product.promotion_price,
          product.stock,
          rows[0].collection_id,
          product.alertStock,
          product.specifications,
          product.dimensions,
          product.weight,
          product.material,
          product.featured ? 1 : 0,
          rows[0].id,
        ],
      );

      return { message: 'Product updated' };
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product');
    }
  }

  async updateProductImage(productId: number, imageUrl: string) {
    try {
      await this.connection.query(
        'UPDATE product_images SET image_path = ? WHERE product_id = ?',
        [imageUrl, productId],
      );
    } catch (error) {
      console.error(error);
      throw new Error('Could not update product image');
    }
  }

  async findFeaturedProducts() {
    try {
      const [rows] = await this.connection.query(`
        SELECT p.id, p.name, p.collection_id AS collectionId, c.name AS collectionName, p.price, p.promotion_price, (SELECT pi.image_path FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.image_order ASC LIMIT 1) AS main_image FROM products p JOIN collections c ON p.collection_id = c.id WHERE p.featured = 1 ORDER BY p.created_at DESC`);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not find products');
    }
  }
}
