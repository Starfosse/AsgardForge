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

  async handleConnection(socket: Socket) {
    const { sessionId, userType } = socket.handshake.query;

    if (!sessionId || !userType) {
      socket.disconnect();
      return;
    }

    await this.contactService.handleConnection(
      socket,
      sessionId.toString(),
      userType.toString(),
    );
  }

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
      this.server.to('sessionCurrentTest').emit('msgClientToSupport', {
        ...data,
        id: res,
      });
    } else {
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
    client: Socket,
    @MessageBody() data: CreateContactDto,
    sessionId: string,
  ) {
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

  // handleConnection(client: Socket) {
  //   console.log(`Client connected: ${client.id}`);
  // }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
