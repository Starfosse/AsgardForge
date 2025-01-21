import { isPublicRoute } from "./publicRoutes";

interface ApiResponse<T> {
  data: T | null;
  status: number;
  message: string;
}

type MethodUpload = "POST" | "PUT";

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

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        try {
          const refreshResponse = await fetch("/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshResponse.ok) {
            localStorage.removeItem("access_token");
            window.location.href = "/auth/google";
            throw new Error("Session expired");
          }

          const refreshData: ApiResponse<{ access_token: string }> =
            await refreshResponse.json();

          if (refreshData.data?.access_token) {
            localStorage.setItem("access_token", refreshData.data.access_token);

            const newResponse = await fetch(url, {
              ...options,
              headers: new Headers({
                ...headers,
                Authorization: `Bearer ${refreshData.data.access_token}`,
              }),
            });

            if (!newResponse.ok) {
              const errorData: ApiResponse<any> = await newResponse.json();
              throw new Error(errorData.message || "API Error");
            }

            const newData: ApiResponse<T> = await newResponse.json();
            return newData.data as T;
          } else {
            throw new Error("Invalid refresh token response");
          }
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          window.location.href = "/auth/google";
          throw refreshError;
        }
      }

      if (!response.ok) {
        const errorData: ApiResponse<any> = await response.json();
        throw new Error(errorData.message || "API Error");
      }

      const responseData: ApiResponse<T> = await response.json();
      return responseData.data as T;
    } catch (error) {
      console.error("API request failed:", error);
      throw error instanceof Error
        ? error
        : new Error("Unknown error occurred");
    }
  },
  upload: async <T>(
    url: string,
    formData: FormData,
    methodUpload: MethodUpload
  ): Promise<T> => {
    const headers = new Headers();
    if (!isPublicRoute(url)) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        throw new Error("No access token available");
      }
    }

    try {
      const response = await fetch(url, {
        method: methodUpload,
        body: formData,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API Error");
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error instanceof Error
        ? error
        : new Error("Unknown error occurred");
    }
  },
};
