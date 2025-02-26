import OrderSummary from "@/components/OrderSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import CheckoutForm from "@/forms/checkout/CheckoutForm";
import { orderService } from "@/services/api";
import { OrderCommand } from "@/services/api/order/types";
import { CreditCard } from "lucide-react";
import React, { useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const { customer } = useAuth();
  const [paymentForm, setPaymentForm] = useState<OrderCommand>({
    customerId: customer?.id,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [status, setStatus] = useState({
    error: false,
    message: "",
    isSubmitting: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev: OrderCommand) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (paymentForm.customerId === undefined)
        throw new Error("Vous devez être connecté pour passer une commande");
      setStatus((prev) => ({ ...prev, isSubmitting: true }));
      const orderId = await orderService.createOrder(paymentForm, cart);
      console.log("orderId ===", orderId);
      //navigate to page with success and orderId
      setStatus((prev) => ({
        ...prev,
        error: false,
        message: "",
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        error: true,
        message: "Une erreur s'est produite lors de la commande",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800 flex items-center justify-center">
          <CreditCard className="mr-4 text-amber-700" /> Finaliser la Commande
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <CheckoutForm
            handleChange={handleChange}
            paymentForm={paymentForm}
            handleSubmit={handleSubmit}
            isSubmitting={status.isSubmitting}
          />
          <div>
            <OrderSummary status={status} cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
