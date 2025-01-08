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
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        const refreshResponse = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refreshResponse.ok) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          throw new Error("Session expired");
        }

        const { access_token } = await refreshResponse.json();
        localStorage.setItem("access_token", access_token);

        const newResponse = await fetch(url, {
          ...options,
          headers: new Headers({
            ...headers,
            Authorization: `Bearer ${access_token}`,
          }),
        });
        if (!newResponse.ok) {
          const errorData = await newResponse.json().catch(() => ({}));
          throw new Error(errorData.message || "API Error");
        }
        return newResponse.json();
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API Error");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("No access token available");
    }
  },
};
