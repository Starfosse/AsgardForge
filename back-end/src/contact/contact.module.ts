import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactGateway } from './contact.gateway';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactGateway, ContactRepository, ContactService],
})
export class ContactModule {}
