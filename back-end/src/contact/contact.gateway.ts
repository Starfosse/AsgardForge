import {
  ConnectedSocket,
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
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ContactGateway {
  constructor(
    private readonly contactService: ContactService,
    private readonly contactRepository: ContactRepository,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    return 'joined room';
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() payload: [CreateMessageDto, string]) {
    const [data, sessionId] = payload;
    const res = await this.contactRepository.createMessage(data);
    if (data.sender === 'client') {
      console.log('msgClientToSupport BackEnd');
      this.server.to('sessionCurrentTest').emit('msgClientToSupport', {
        ...data,
        id: res,
      });
    } else {
      console.log('msgSupportToClient BackEnd');
      this.server.to(sessionId).emit('msgSupportToClient', {
        ...data,
        id: res,
      });
    }
    return {
      success: true,
      messageId: res,
    };
  }

  @SubscribeMessage('createConversation')
  async handleCreateConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: [string, CreateContactDto],
  ) {
    const userFirstName = client.handshake?.query?.userFirstName;
    const userLastName = client.handshake?.query?.userLastName;
    const [sessionId, data] = payload;
    console.log(data);
    const res = await this.contactService.createConversationAndMessage(data);
    this.server.to(sessionId).emit('newTicket', {
      ...data,
      conversationId: res.conversationId,
      messageId: res.messageId,
      userFirstName,
      userLastName,
    });
    return {
      success: true,
      conversationId: res.conversationId,
      messageId: res.messageId,
    };
  }
}
