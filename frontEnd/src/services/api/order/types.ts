export interface OrderCommand {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  total: string;
}

interface Product {
  id: number;
  name: string;
  imagePath: string | null;
}

export interface OrderItem {
  price: number;
  quantity: number;
  promotionPrice: number;
  product: Product;
}

export interface OrderHistoryDetails {
  id: number;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  recipientPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  total: number;
  items: OrderItem[];
  createdAt: string; // Format ISO "2024-02-27T14:30:00Z"
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  trackingNumber?: string;
  paymentMethod?: string;
  estimatedDeliveryDate?: string;
}

export interface OrderSummary {
  id: number;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  recipientPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  total: number;
  items: OrderItem[];
  createdAt: string; // Format ISO "2024-02-27T14:30:00Z"
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
}

export type OrderSummaryConfirmation = Omit<
  OrderSummary,
  "createdAt" | "status"
>;
