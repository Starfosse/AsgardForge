import { apiClient } from "../client";
import { CustomerResponse } from "./types";

export const authService = {
  getCustomerProfile: () =>
    apiClient.fetch<CustomerResponse>("/api/customers/me"),
  logout: () => apiClient.fetch<null>("/api/auth/logout", { method: "POST" }),
};
