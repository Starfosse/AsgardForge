import { apiClient } from "../client";
import { ApiResponse } from "../types";
import { UserResponse } from "./types";

export const authService = {
  getUserProfile: () => apiClient.fetch<ApiResponse<UserResponse>>("/user/me"),
  logout: () =>
    apiClient.fetch<ApiResponse<null>>("/auth/logout", { method: "POST" }),
};
