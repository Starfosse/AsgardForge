import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ContactGateway {
  constructor(
    private readonly contactService: ContactService,
    private readonly contactRepository: ContactRepository,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: CreateMessageDto) {
    const res = await this.contactRepository.createMessage(data);
    return {
      success: true,
      messageId: res,
    };
  }

  @SubscribeMessage('createConversation')
  async handleCreateConversation(@MessageBody() data: CreateContactDto) {
    const res = await this.contactService.createConversationAndMessage(data);
    return {
      success: true,
      conversationId: res.conversationId,
      messageId: res.messageId,
    };
  }
}
