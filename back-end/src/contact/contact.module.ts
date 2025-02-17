import { Module } from '@nestjs/common';
import { ContactGateway } from './contact.gateway';
import { ContactRepository } from './contact.repository';
import { Contact } from './entities/contact.entity';
import { ContactService } from './contact.service';

@Module({
  // controllers: [ContactController],
  providers: [ContactGateway, ContactRepository, ContactService],
})
export class ContactModule {}
