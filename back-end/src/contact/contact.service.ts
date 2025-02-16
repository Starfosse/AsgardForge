import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-conversation.dto';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  createOrUpdateConversation(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }
}
