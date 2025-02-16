import { MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";

// Types
interface Message {
  id: string;
  content: string;
  sender: "client" | "support";
  timestamp: Date;
}

interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  unread: boolean;
  updatedAt: Date;
  messages: Message[];
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    customerId: "C123",
    customerName: "Jean Dupont",
    title: "Problème avec ma commande #4567",
    unread: true,
    updatedAt: new Date("2024-02-15T10:30:00"),
    messages: [
      {
        id: "m1",
        content: "Bonjour, je n'ai toujours pas reçu ma commande #4567",
        sender: "client",
        timestamp: new Date("2024-02-15T10:30:00"),
      },
      {
        id: "m2",
        content: "Bonjour, je vérifie cela tout de suite pour vous",
        sender: "support",
        timestamp: new Date("2024-02-15T10:35:00"),
      },
    ],
  },
  {
    id: "2",
    customerId: "C124",
    customerName: "Marie Martin",
    title: "Demande de retour",
    unread: false,
    updatedAt: new Date("2024-02-15T09:15:00"),
    messages: [
      {
        id: "m3",
        content: "Je souhaite retourner un article",
        sender: "client",
        timestamp: new Date("2024-02-15T09:15:00"),
      },
    ],
  },
];

export default function Support() {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      sender: "support",
      timestamp: new Date(),
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessageObj],
      updatedAt: new Date(),
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
    setSelectedConversation(updatedConversation);
    setNewMessage("");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex h-screen max-h-[850px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Liste des conversations */}
      <div className="w-80 h-full border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
              } ${conversation.unread ? "font-semibold" : ""}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{conversation.customerName}</span>
                </div>
                {conversation.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {conversation.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(conversation.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de messages */}
      <div className="flex-1 h-full flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-semibold">
                  {selectedConversation.customerName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  (Client #{selectedConversation.customerId})
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "support"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "support"
                          ? "bg-blue-500 text-white"
                          : "bg-white shadow-sm"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "support"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150 flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-2" />
              <p>Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
