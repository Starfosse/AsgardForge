import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-conversation.dto';
import { ContactRepository } from './contact.repository';
import { timestamp } from 'rxjs';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  async createConversationAndMessage(createContactDto: CreateContactDto) {
    const conversationId =
      await this.contactRepository.createConversation(createContactDto);
    const createMessageDto = {
      content: createContactDto.content,
      conversationId: conversationId,
      sender: createContactDto.sender,
      timestamp: createContactDto.createdAt,
    };
    const messageId =
      await this.contactRepository.createMessage(createMessageDto);
    return { conversationId: conversationId, messageId: messageId };
  }
}
