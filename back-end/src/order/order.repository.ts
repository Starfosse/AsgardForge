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
      const [result]: any = await this.connection.execute(
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
      const [rows]: any = await this.connection.query(
        "SELECT JSON_OBJECT('id', o.id, 'recipientFirstName', o.recipient_first_name, 'recipientLastName', o.recipient_last_name, 'recipientEmail', o.recipient_email, 'recipientPhone', o.recipient_phone, 'shippingAddress', o.shipping_address, 'shippingCity', o.shipping_city, 'shippingPostalCode', o.shipping_postal_code, 'total', o.total, 'createdAt', o.created_at, 'status', o.status, 'items',(SELECT JSON_ARRAYAGG(JSON_OBJECT('product', JSON_OBJECT('id', p.id, 'name', p.name, 'imagePath', (SELECT pi.image_path FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.image_order LIMIT 1)), 'price', oi.price, 'promotionPrice', oi.promotion_price, 'quantity', oi.quantity)) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id)) as 'order' FROM orders o WHERE o.id = ?",
        [orderId],
      );
      return rows[0].order;
    } catch (error) {
      console.error(error);
    }
  }

  async findAllByUserId(userId: number) {
    try {
      const [rows]: any = await this.connection.query(
        "SELECT JSON_OBJECT('id', o.id, 'recipientFirstName', o.recipient_first_name, 'recipientLastName', o.recipient_last_name, 'recipientEmail', o.recipient_email, 'recipientPhone', o.recipient_phone, 'shippingAddress', o.shipping_address, 'shippingCity', o.shipping_city, 'shippingPostalCode', o.shipping_postal_code, 'total', o.total, 'createdAt', o.created_at, 'status', o.status, 'items',(SELECT JSON_ARRAYAGG(JSON_OBJECT('product', JSON_OBJECT('id', p.id, 'name', p.name, 'imagePath', (SELECT pi.image_path FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.image_order LIMIT 1)), 'price', oi.price, 'promotionPrice', oi.promotion_price, 'quantity', oi.quantity)) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id)) as 'order' FROM orders o WHERE o.customer_id = ?",
        [userId],
      );
      return rows.map((row) => row.order);
    } catch (error) {
      console.error(error);
    }
  }
}
