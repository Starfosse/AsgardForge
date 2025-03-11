import { CartItem } from "@/contexts/CartContext";
import { OrderCommandForm } from "@/pages/client/Checkout";
import { apiClient } from "../client";
import { OrderCommand, OrderHistoryDetails, OrderSummary } from "./types";

export const orderService = {
  createOrder: (orderForm: OrderCommandForm, cart: CartItem[]) => {
    const orderData: OrderCommand = {
      customerId: orderForm.customerId!,
      firstName: orderForm.firstName,
      lastName: orderForm.lastName,
      email: orderForm.email,
      phone: orderForm.phone,
      address: orderForm.address,
      city: orderForm.city,
      zipCode: orderForm.zipCode,
      total: orderForm.total,
    };
    return apiClient.fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ orderData, cart }),
    });
  },
  getOrder: (orderId: number) => {
    return apiClient.fetch<OrderHistoryDetails>(`/api/orders/${orderId}`, {
      method: "GET",
    });
  },

  getOrdersByUserId: (userId: number) => {
    return apiClient.fetch<OrderSummary[]>(`/api/orders/user/${userId}`, {
      method: "GET",
    });
  },
};
