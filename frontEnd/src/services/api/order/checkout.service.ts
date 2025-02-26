import { CartItem } from "@/contexts/CartContext";
import { apiClient } from "../client";
import { OrderCommand } from "./types";
import { OrderCommandForm } from "@/pages/client/Checkout";

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
};
