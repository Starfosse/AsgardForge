import { apiClient } from "../client";
import { ConversationAdminData, ConversationData } from "./types";

export const contactService = {
  getConversations: (userId: number) => {
    return apiClient.fetch<ConversationData[]>(`/contact/${userId}`, {
      method: "GET",
    });
  },
  getAllConversations: () => {
    return apiClient.fetch<ConversationAdminData[]>(`/contact`, {
      method: "GET",
    });
  },
};
