import { Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { CreateContactDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Conversation } from './dto/conversation.dto';

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
    console.log('message1 ===>', createMessageDto.timestamp);
    const formattedDate = new Date(createMessageDto.timestamp)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    console.log('message2 ===>', formattedDate);
    const [result]: any = await this.connection.query(
      'INSERT INTO messages_support(conversation_id, sender, content, created_at) VALUES (?, ?, ?, ?)',
      [
        createMessageDto.conversationId,
        createMessageDto.sender,
        createMessageDto.content,
        formattedDate,
      ],
    );
    return result.insertId;
  }

  async findAllConversationsAndMessages(userId: number) {
    const [results]: any = await this.connection.query(
      "SELECT JSON_OBJECT('id', c.id, 'subject', c.subject, 'status', c.status, 'created_at', c.created_at, 'messages', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', m.id, 'sender', m.sender, 'content', m.content, 'created_at', m.created_at)) FROM messages_support m WHERE m.conversation_id = c.id)) as conversation FROM conversations_support c WHERE c.user_id = ?",
      [userId],
    );
    return results.map((row) =>
      typeof row.conversation === 'string'
        ? JSON.parse(row.conversation)
        : row.conversation,
    ) as Conversation[];
  }
}
