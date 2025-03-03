import { Customer } from "@/contexts/AuthContext";
import { apiClient } from "../client";

export const customerService = {
  updateProfile: (data: Customer) => {
    return apiClient.fetch("/api/customers/update", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
