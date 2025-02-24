import { Controller, Get, Param } from '@nestjs/common';
import { ContactRepository } from './contact.repository';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactRepository: ContactRepository) {}

  @Get(':customerId')
  async findOne(@Param('customerId') customerId: string) {
    const res =
      await this.contactRepository.findConversationsAndMessages(+customerId);
    return res;
  }

  @Get()
  async findAll() {
    const res = await this.contactRepository.findAllConversationsAndMessages();
    return res;
  }
}
