import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateContactDto } from './dto/create-conversation.dto';
import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ContactRepository } from './contact.repository';

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

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
