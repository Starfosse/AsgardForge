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
        item.promotionPrice,
        item.quantity,
      ]);

      // Exécution de la requête SQL avec des paramètres préparés
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

  async findOne(id: number) {
    try {
      const [rows]: any = await this.connection.query(
        'SELECT * FROM orders WHERE id = ?',
        [id],
      );
      return rows[0];
    } catch (error) {
      console.error(error);
    }
  }
}
