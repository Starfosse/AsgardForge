import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-conversation.dto';
import { SupportSession } from './dto/support-session.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}
  private activeSessions: Map<string, SupportSession> = new Map();

  async handleConnection(
    socket: Socket,
    sessionId: string,
    userType: string,
  ): Promise<void> {
    if (!this.activeSessions.has(sessionId)) {
      this.activeSessions.set(sessionId, {
        clientSocket: userType === 'client' ? socket : null,
        agentSocket: userType === 'support' ? socket : null,
      });
    } else {
      const session = this.activeSessions.get(sessionId);
      if (session) {
        if (userType === 'client') {
          session.clientSocket = socket;
        } else {
          session.agentSocket = socket;
        }
        this.activeSessions.set(sessionId, session);
      }
    }
    // socket.on('disconnect', () => {
    //   this.handleDisconnection(sessionId, userType);
    // });
  }

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

  async SendMessageToTheRoom(
    sessionId: string,
    message: string,
    sender: 'client' | 'support',
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      if (session.clientSocket) {
        session.clientSocket.emit('message', {
          message: message,
          sender: sender,
        });
      }
      if (session.agentSocket) {
        session.agentSocket.emit('message', {
          message: message,
          sender: sender,
        });
      }
    }
  }
}
