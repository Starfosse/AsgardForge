import LoadingScreen from "@/components/LoadingScreen";
import StatusOrder from "@/components/order-confirmation/StatusOrder";
import SummaryItems from "@/components/order-confirmation/SummaryItems";
import SummaryOrder from "@/components/order-confirmation/SummaryOrder";
import SummaryRecipient from "@/components/order-confirmation/SummaryRecipient";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, OrderSummaryConfirmation } from "@/services/api";
import { Check, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { customer } = useAuth();
  const [order, setOrder] = useState<OrderSummaryConfirmation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrder(Number(orderId));
      setOrder(data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen title="commande" />;
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-stone-800">
            Commande Confirmée
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            Merci pour votre commande, {customer?.firstName}!
          </p>
          <p className="text-stone-600 mb-4">
            Votre commande #{order?.id} a été reçue et est en cours de
            traitement.
          </p>
          <div className="flex items-center justify-center mt-6 text-amber-700">
            <Truck className="w-5 h-5 mr-2" />
            <span>
              Un email de confirmation vous a été envoyé à{" "}
              {order?.recipientEmail}
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-amber-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  Détails de la Commande
                </h2>
              </div>
              <div className="p-6">
                <SummaryItems items={order?.items} />
                <SummaryRecipient order={order} />
              </div>
            </div>
          </div>
          <div>
            <SummaryOrder order={order} />
            <StatusOrder />
            <div className="mt-8 space-y-4">
              <Link
                to="/"
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 block text-center"
              >
                Continuer les achats
              </Link>
              <button
                className="bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 block w-full"
                onClick={() => window.print()}
              >
                Imprimer la confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
