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

export interface ConversationAdminData {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  created_at: Date;
  status: "open" | "closed";
  subject: string;
  messages: Message[];
}

// interface Message {
//   id: string;
//   content: string;
//   sender: "client" | "support";
//   timestamp: Date;
// }

// interface Conversation {
//   id: string | number;
//   // customerId: string;
//   customerFirstName: string;
//   customerLastName: string;
//   subject: string;
//   createdAt: Date;
//   messages: Message[];
// }
