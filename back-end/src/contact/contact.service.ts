import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-conversation.dto';

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
