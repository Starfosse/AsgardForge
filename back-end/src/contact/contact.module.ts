import { Module } from '@nestjs/common';
import { ContactGateway } from './contact.gateway';
import { ContactRepository } from './contact.repository';

@Module({
  // controllers: [ContactController],
  providers: [ContactGateway, ContactRepository],
})
export class ContactModule {}
