import { contactService } from "@/services/api";
import { MessageSquare, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string | number;
  content: string;
  sender: "client" | "support";
  timestamp: Date;
}

interface Conversation {
  id: string | number;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  subject: string;
  createdAt: Date;
  messages: Message[];
}

export default function Support() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

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
    const msgConvId = {
      content: newMessage,
      conversationId: selectedConversation.id,
      sender: "support",
      timestamp: new Date(),
    };
    socket?.emit(
      "message",
      msgConvId,
      "sessionCurrentTest",
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
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  };

  const fetchAllConversations = async () => {
    const res = await contactService.getAllConversations();
    setConversations(
      res.map((conv) => ({
        ...conv,
        customerFirstName: conv.firstName,
        customerLastName: conv.lastName,
        createdAt: new Date(conv.created_at),
        customerId: conv.userId,
        messages: conv.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.created_at),
        })),
      }))
    );
  };

  useEffect(() => {
    fetchAllConversations();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      query: {
        sessionId: "sessionCurrentTest",
        userId: "support",
        userType: "support",
      },
    });

    newSocket.emit("joinRoom", "sessionCurrentTest", (response: any) => {
      console.log(response);
    });
    setSocket(newSocket);

    newSocket.on("msgClientToSupport", (data) => {
      if (data.sender === "client") {
        const newMessageObj: Message = {
          id: data.id,
          content: data.content,
          sender: "client",
          timestamp: new Date(data.timestamp),
        };
        setConversations((prevConversations) => {
          return prevConversations.map((conv) => {
            if (conv.id === data.conversationId) {
              const updatedConv = {
                ...conv,
                messages: [...conv.messages, newMessageObj],
              };
              if (selectedConversation?.id === conv.id) {
                setSelectedConversation(updatedConv);
              }

              return updatedConv;
            }
            return conv;
          });
        });
      }
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className="flex h-screen max-h-[850px] bg-white rounded-lg shadow-lg overflow-hidden">
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
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {conversation.customerFirstName +
                      " " +
                      conversation.customerLastName}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {conversation.subject}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(conversation.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-semibold">
                  {selectedConversation.customerFirstName +
                    " " +
                    selectedConversation.customerLastName}
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
