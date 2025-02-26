import { useAuth } from "@/contexts/AuthContext";
import CreateConversation from "@/modals/CreateConversation";
import { contactService } from "@/services/api";
import { Plus, Send, Shield } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface Message {
  id: string | number;
  content: string;
  sender: "client" | "support";
  timestamp: Date;
}

export interface Conversation {
  id: string | number;
  subject: string;
  orderId?: string;
  messages: Message[];
  status: "open" | "closed";
  createdAt: Date;
  lastUpdate: Date;
}

export interface NewConversation {
  subject: string;
  orderId: string;
  initialMessage: string;
}

export default function Contact() {
  const { customer } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newConversation, setNewConversation] = useState<NewConversation>({
    subject: "",
    orderId: "",
    initialMessage: "",
  });

  const handleCreateConversation = () => {
    if (!customer) return;
    const tmpId = nanoid();
    const conversation: Conversation = {
      id: tmpId,
      subject: newConversation.subject,
      orderId: newConversation.orderId || undefined,
      status: "open",
      lastUpdate: new Date(),
      createdAt: new Date(),
      messages: [
        {
          id: `msg-${nanoid()}`,
          content: newConversation.initialMessage,
          sender: "client",
          timestamp: new Date(),
        },
      ],
    };
    setConversations([conversation, ...conversations]);
    const { id, subject, orderId, createdAt } = conversation;
    const { content, sender } = conversation.messages[0];
    socket.emit(
      "createConversation",
      {
        id,
        subject,
        orderId,
        content,
        sender,
        createdAt,
        customerId: customer.id,
      },
      (response: {
        success: boolean;
        conversationId: number;
        messageId: number;
      }) => {
        if (response.success) {
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === tmpId
                ? {
                    ...conv,
                    id: response.conversationId,
                    messages: [{ ...conv.messages[0], id: response.messageId }],
                  }
                : conv
            )
          );
        }
      }
    );

    setSelectedConversation(conversation);
    setIsCreateModalOpen(false);
    setNewConversation({ subject: "", orderId: "", initialMessage: "" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    const tmpId = nanoid();
    const newMessageObj: Message = {
      id: tmpId,
      content: newMessage,
      sender: "client",
      timestamp: new Date(),
    };
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessageObj],
      lastUpdate: new Date(),
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
    const msgConvId = {
      content: newMessage,
      conversationId: selectedConversation.id,
      sender: "client",
      timestamp: new Date(),
    };
    socket.emit(
      "message",
      msgConvId,
      (response: { success: boolean; messageId: number }) => {
        if (response.success) {
          setSelectedConversation((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              messages: [
                ...prev.messages,
                { ...newMessageObj, id: response.messageId },
              ],
            };
          });
        }
      }
    );
    setNewMessage("");
  };

  const fetchConversations = async () => {
    if (!customer) return;
    const res = await contactService.getConversations(customer.id);
    setConversations(
      res.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.created_at),
        })),
      }))
    );
  };

  useEffect(() => {
    fetchConversations();
  }, [customer]);

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
    <div className="bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-700 mb-4">
            Centre de Messages
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Notre équipe de forgerons experts est là pour répondre à toutes vos
            questions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex h-[600px]">
            <div className="w-80 border-r border-stone-200">
              <div className="p-4 bg-stone-800 text-amber-300 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Vos Conversations</h2>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="p-1 hover:bg-stone-700 rounded-full transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer border-b border-stone-200 hover:bg-stone-50 transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? "bg-stone-100"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-stone-800 truncate pr-4">
                        {conversation.subject}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          conversation.status === "open"
                            ? "bg-green-100 text-green-800"
                            : "bg-stone-100 text-stone-800"
                        }`}
                      >
                        {conversation.status === "open"
                          ? "En cours"
                          : "Terminé"}
                      </span>
                    </div>
                    {conversation.orderId && (
                      <p className="text-sm text-stone-600 mb-1">
                        Commande: {conversation.orderId}
                      </p>
                    )}
                    <p className="text-xs text-stone-500">
                      Dernière mise à jour:{" "}
                      {formatDate(
                        conversation.messages[conversation.messages.length - 1]
                          .timestamp
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 bg-stone-800 text-white">
                    <h3 className="font-semibold text-amber-300">
                      {selectedConversation.subject}
                    </h3>
                    {selectedConversation.orderId && (
                      <p className="text-sm text-stone-400">
                        Commande: {selectedConversation.orderId}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 bg-stone-50">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "client"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.sender === "client"
                                ? "bg-amber-700 text-white"
                                : "bg-white shadow-md"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === "client"
                                  ? "text-amber-100"
                                  : "text-stone-500"
                              }`}
                            >
                              {formatDate(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-stone-200 bg-white">
                    <div className="flex gap-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1 p-2 border border-stone-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows={3}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center bg-stone-50 text-stone-600">
                  <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-amber-700" />
                    <h3 className="text-xl font-semibold mb-2">
                      Bienvenue dans votre espace messages
                    </h3>
                    <p className="text-stone-500">
                      Sélectionnez une conversation pour voir vos messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateConversation
          newConversation={newConversation}
          setNewConversation={setNewConversation}
          setIsCreateModalOpen={setIsCreateModalOpen}
          handleCreateConversation={handleCreateConversation}
        />
      )}
    </div>
  );
}
