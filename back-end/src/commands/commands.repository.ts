import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class CommandsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private connection: Connection,
  ) {}

  async createCommand(command: any) {
    try {
      const [commandId]: any = await this.connection.execute(
        'INSERT INTO commands (promotion_code, total_amount, user_id, status) VALUES (?, ?, ?, ?)',
        [command.promotionCode, command.totalAmount, command.userId, 'PENDING'],
      );
      for (const product of command.products) {
        await this.connection.execute(
          'INSERT INTO command_items (command_id, product_id, quantity, price, promotion_code) VALUES (?, ?, ?, ?, ?)',
          [
            commandId.insertId,
            product.productId,
            product.quantity,
            product.price,
            product.promotionCode,
          ],
        );
      }
      return commandId.insertId;
    } catch (error) {
      console.error('Error creating command:', error);
      throw new Error('Could not create command');
    }
  }

  async getCommandById(commandId: number) {
    try {
      const [command]: any = await this.connection.execute(
        'SELECT * FROM commands WHERE id = ?',
        [commandId],
      );
      if (!command || !command[0]) return null;
      return command[0];
    } catch (error) {
      console.error('Error getting command:', error);
      throw new Error('Could not get command');
    }
  }

  async getCommandItemsByCommandId(commandId: number) {
    try {
      const [commandItems]: any = await this.connection.execute(
        'SELECT * FROM command_items WHERE command_id = ?',
        [commandId],
      );
      return commandItems;
    } catch (error) {
      console.error('Error getting command items:', error);
      throw new Error('Could not get command items');
    }
  }

  async getCommandsByUserId(userId: number) {
    try {
      const [commands]: any = await this.connection.execute(
        'SELECT * FROM commands WHERE user_id = ?',
        [userId],
      );
      return commands;
    } catch (error) {
      console.error('Error getting commands:', error);
      throw new Error('Could not get commands');
    }
  }

  async remove(commandId: number) {
    try {
      await this.connection.execute(
        'DELETE FROM command_items WHERE command_id = ?',
        [commandId],
      );
      await this.connection.execute('DELETE FROM commands WHERE id = ?', [
        commandId,
      ]);
    } catch (error) {
      console.error('Error removing command:', error);
      throw new Error('Could not remove command');
    }
  }
}
