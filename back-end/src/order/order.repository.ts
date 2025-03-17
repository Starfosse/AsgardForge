import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class OrderRepository {
  constructor(@Inject(DATABASE_CONNECTION) private connection: Connection) {}
  async createOrder(order: CreateOrderDto): Promise<number> {
    try {
      const [result]: any = await this.connection.query(
        'INSERT INTO orders (customer_id, recipient_first_name, recipient_last_name, recipient_email, recipient_phone, shipping_address, shipping_city, shipping_postal_code, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          order.customerId,
          order.firstName,
          order.lastName,
          order.email,
          order.phone,
          order.address,
          order.city,
          order.zipCode,
          order.total,
        ],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async createOrderItem(cart: CreateOrderItemDto[], orderId: number) {
    try {
      const placeholders = cart.map(() => '(?, ?, ?, ?, ?)').join(', ');
      const values = cart.flatMap((item) => [
        orderId,
        item.id,
        item.price,
        item.promotion_price || item.price,
        item.quantity,
      ]);
      await this.connection.execute(
        `
    INSERT INTO order_items (order_id, product_id, price, promotion_price, quantity)
    VALUES ${placeholders}
  `,
        values,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(orderId: number) {
    try {
      const [orderRows]: any = await this.connection.query(
        `SELECT 
          id, 
          recipient_first_name, 
          recipient_last_name, 
          recipient_email, 
          recipient_phone, 
          shipping_address, 
          shipping_city, 
          shipping_postal_code, 
          total, 
          created_at, 
          status
        FROM orders 
        WHERE id = ?`,
        [orderId],
      );
      if (!orderRows || orderRows.length === 0) {
        return null;
      }
      const order = orderRows[0];
      const [items]: any = await this.connection.query(
        `SELECT 
          oi.product_id, 
          oi.price, 
          oi.promotion_price, 
          oi.quantity,
          p.id as product_id,
          p.name as product_name
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?`,
        [orderId],
      );
      const itemsWithImages = await Promise.all(
        items.map(async (item) => {
          const [images]: any = await this.connection.query(
            `SELECT image_path 
            FROM product_images 
            WHERE product_id = ? 
            ORDER BY image_order 
            LIMIT 1`,
            [item.product_id],
          );
          return {
            product: {
              id: item.product_id,
              name: item.product_name,
              imagePath: images.length > 0 ? images[0].image_path : null,
            },
            price: item.price,
            promotionPrice: item.promotion_price,
            quantity: item.quantity,
          };
        }),
      );
      return {
        id: order.id,
        recipientFirstName: order.recipient_first_name,
        recipientLastName: order.recipient_last_name,
        recipientEmail: order.recipient_email,
        recipientPhone: order.recipient_phone,
        shippingAddress: order.shipping_address,
        shippingCity: order.shipping_city,
        shippingPostalCode: order.shipping_postal_code,
        total: order.total,
        createdAt: order.created_at,
        status: order.status,
        items: itemsWithImages,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllByUserId(userId: number) {
    try {
      const [orderRows]: any = await this.connection.query(
        `SELECT 
          id, 
          recipient_first_name, 
          recipient_last_name, 
          recipient_email, 
          recipient_phone, 
          shipping_address, 
          shipping_city, 
          shipping_postal_code, 
          total, 
          created_at, 
          status
        FROM orders 
        WHERE customer_id = ?`,
        [userId],
      );
      if (!orderRows || orderRows.length === 0) {
        return [];
      }
      const result = await Promise.all(
        orderRows.map(async (order) => {
          const [items]: any = await this.connection.query(
            `SELECT 
              oi.product_id, 
              oi.price, 
              oi.promotion_price, 
              oi.quantity,
              p.id as product_id,
              p.name as product_name
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?`,
            [order.id],
          );
          const itemsWithImages = await Promise.all(
            items.map(async (item) => {
              const [images]: any = await this.connection.query(
                `SELECT image_path 
                FROM product_images 
                WHERE product_id = ? 
                ORDER BY image_order 
                LIMIT 1`,
                [item.product_id],
              );
              return {
                product: {
                  id: item.product_id,
                  name: item.product_name,
                  imagePath: images.length > 0 ? images[0].image_path : null,
                },
                price: item.price,
                promotionPrice: item.promotion_price,
                quantity: item.quantity,
              };
            }),
          );
          return {
            id: order.id,
            recipientFirstName: order.recipient_first_name,
            recipientLastName: order.recipient_last_name,
            recipientEmail: order.recipient_email,
            recipientPhone: order.recipient_phone,
            shippingAddress: order.shipping_address,
            shippingCity: order.shipping_city,
            shippingPostalCode: order.shipping_postal_code,
            total: order.total,
            createdAt: order.created_at,
            status: order.status,
            items: itemsWithImages,
          };
        }),
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
