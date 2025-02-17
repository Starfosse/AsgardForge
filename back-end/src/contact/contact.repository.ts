import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreateContactDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

export class ContactRepository {
  constructor(@Inject(DATABASE_CONNECTION) private connection: Connection) {}
  async createConversation(createContactDto: CreateContactDto) {
    const formattedDate = new Date(createContactDto.createdAt)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const [result]: any = await this.connection.query(
      'INSERT INTO conversations_support(user_id, subject, status, created_at) VALUES (?, ?, ?, ?)',
      [
        createContactDto.userId,
        createContactDto.subject,
        'open',
        formattedDate,
      ],
    );
    return result.insertId;
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const formattedDate = new Date(createMessageDto.createdAt)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    console.log('message3 ===>', createMessageDto.content);
    const [result]: any = await this.connection.query(
      'INSERT INTO messages_support(conversation_id, sender, message, created_at) VALUES (?, ?, ?, ?)',
      [
        createMessageDto.conversationId,
        createMessageDto.sender,
        createMessageDto.content,
        formattedDate,
      ],
    );
    return result.insertId;
  }
}
