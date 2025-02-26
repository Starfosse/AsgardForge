import { CartItem } from "@/contexts/CartContext";
import { apiClient } from "../client";
import { OrderCommand } from "./types";

export const orderService = {
  createOrder: (order: OrderCommand, cart: CartItem[]) => {
    return apiClient.fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ order, cart }),
    });
  },
};
