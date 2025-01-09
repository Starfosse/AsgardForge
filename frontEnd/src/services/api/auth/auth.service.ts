import { apiClient } from "../client";
import { UserResponse } from "./types";

export const authService = {
  getUserProfile: () => apiClient.fetch<UserResponse>("/user/me"),
  logout: () => apiClient.fetch<null>("/auth/logout", { method: "POST" }),
};
