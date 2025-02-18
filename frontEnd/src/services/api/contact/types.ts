interface Message {
  id: string | number;
  content: string;
  sender: "client" | "support";
  created_at: Date;
}

export interface ConversationData {
  id: string | number;
  subject: string;
  orderId?: string;
  messages: Message[];
  status: "open" | "closed";
  createdAt: Date;
  lastUpdate: Date;
}
