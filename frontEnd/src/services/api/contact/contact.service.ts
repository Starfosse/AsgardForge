import { Conversation } from "@/pages/client/Contact";
import { apiClient } from "../client";
import { ConversationData } from "./types";

export const contactService = {
  getConversations: (userId: number) => {
    return apiClient.fetch<ConversationData[]>(`/contact/${userId}`, {
      method: "GET",
    });
  },
};
