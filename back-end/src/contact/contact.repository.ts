import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreateContactDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

export class ContactRepository {
  constructor(@Inject(DATABASE_CONNECTION) private connection: Connection) {}
  async createConversation(createContactDto: CreateContactDto, userId: number) {
    const [result]: any = await this.connection.query(
      'INSERT INTO conversations_support(user_id, subject, status) VALUES (?, ?, ?)',
      [userId, createContactDto.subject, true],
    );
    return result.insertId;
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const [result]: any = await this.connection.query(
      'INSERT INTO messages(conversation_id, sender, message, created_at) VALUES (?, ?, ?, ?)',
      [
        createMessageDto.conversationId,
        createMessageDto.sender,
        createMessageDto.message,
        createMessageDto.createdAt,
      ],
    );
    return result.insertId;
  }
}
