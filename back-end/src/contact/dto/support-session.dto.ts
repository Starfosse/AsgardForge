import { Socket } from 'socket.io';

export interface ClientInfo {
  name: string;
  email: string;
}

export interface SupportSession {
  clientSocket: Socket | null;
  agentSocket: Socket | null;
}
