import OrderSummary from "@/components/OrderSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import CheckoutForm from "@/forms/checkout/CheckoutForm";
import { orderService } from "@/services/api";
import { CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface OrderCommandForm {
  customerId: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  total: string;
}

export default function Checkout() {
  const { cart, calculateTotal } = useCart();
  const navigate = useNavigate();
  const { customer } = useAuth();
  const [paymentForm, setPaymentForm] = useState<OrderCommandForm>({
    customerId: customer?.id || undefined,
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
    total: calculateTotal(),
  });
  const [status, setStatus] = useState({
    error: false,
    message: "",
    isSubmitting: false,
  });

  useEffect(() => {
    setPaymentForm((prev) => ({
      ...prev,
      customerId: customer?.id || undefined,
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    }));
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev: OrderCommandForm) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentForm.customerId) {
      setStatus((prev) => ({
        ...prev,
        error: true,
        message: "Vous devez être connecté pour passer une commande",
      }));
      return;
    }
    try {
      setStatus((prev) => ({ ...prev, isSubmitting: true }));
      const orderId = await orderService.createOrder(paymentForm, cart);
      navigate(`/order/confirmation/${orderId}`);
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
            <OrderSummary
              status={status}
              cart={cart}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
