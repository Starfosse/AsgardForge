const publicRoutes = [
  "/api/auth/google",
  "/api/auth/google/callback",
  "/api/auth/refresh",
] as const;

type PublicRoute = (typeof publicRoutes)[number];

interface ApiOptions extends RequestInit {
  headers?: HeadersInit;
}

interface ApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const apiClient = {
  fetch: async <T>(url: string, options: ApiOptions = {}): Promise<T> => {
    const isPublicRoute = publicRoutes.some((route) => url.includes(route));

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (!isPublicRoute) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
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

// Fonctions typées pour les appels API
export const getUserProfile = (): Promise<ApiResponse<UserProfile>> => {
  return apiClient.fetch<ApiResponse<UserProfile>>("/api/user/profile");
};

export const login = (): Promise<ApiResponse<LoginResponse>> => {
  return apiClient.fetch<ApiResponse<LoginResponse>>("/api/auth/google", {
    method: "GET",
  });
};
