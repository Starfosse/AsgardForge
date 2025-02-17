import { apiClient } from "../client";

export const contactService = {
  getConversations: (userId: number) => {
    return apiClient.fetch(`/contact/${userId}`, { method: "GET" });
  },
};
