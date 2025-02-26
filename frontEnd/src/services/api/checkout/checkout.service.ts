import { OrderCommand } from "./types";

export const checkoutService = {
  createOrder: (order: OrderCommand) => {
    return apiClient.fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(order),
    });
  },
};
