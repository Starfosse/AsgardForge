import { isPublicRoute } from "./publicRoutes";

export const apiClient = {
  fetch: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...options.headers,
    });

    if (!isPublicRoute(url)) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        throw new Error("No access token available");
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API Error");
    }

    return response.json();
  },
};
