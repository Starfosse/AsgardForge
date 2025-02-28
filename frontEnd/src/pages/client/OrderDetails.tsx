import Actions from "@/components/order-details/Actions";
import CustomerData from "@/components/order-details/CustomerData";
import OrderCost from "@/components/order-details/OrderCost";
import {
  default as ItemsOrdered,
  default as OrderStatus,
} from "@/components/order-details/OrderStatus";
import Support from "@/components/order-details/Support";
import { useAuth } from "@/contexts/AuthContext";
import { OrderHistoryDetails, orderService } from "@/services/api";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderHistoryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, customer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchOrderDetails();
  }, [orderId, isAuthenticated]);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrder(Number(orderId));
      if (data.recipientEmail !== customer?.email) {
        setError("Vous n'êtes pas autorisé à consulter cette commande");
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des détails de la commande:",
        err
      );
      setError(
        "Impossible de charger les détails de cette commande. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-stone-100 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-stone-800">
            Accès Restreint
          </h1>
          <p className="text-xl mb-8 text-stone-600">
            Veuillez vous connecter pour accéder aux détails de votre commande.
          </p>
          <button
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
            onClick={() => {
              /* Rediriger vers la page de connexion */
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate("/mes-commandes")}
            className="flex items-center text-amber-700 hover:text-amber-600 mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Retour à mes commandes</span>
          </button>

          <h1 className="text-3xl font-bold text-stone-800">
            Détails de la commande #{orderId}
          </h1>
        </div>
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-amber-700 border-r-transparent mb-4"></div>
            <p className="text-stone-600">
              Chargement des détails de la commande...
            </p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            <p>{error}</p>
            <button
              onClick={fetchOrderDetails}
              className="mt-2 text-sm font-medium text-red-700 hover:underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <OrderStatus order={order} />
              <ItemsOrdered order={order} />
              <CustomerData order={order} />
            </div>
            <div className="space-y-6">
              <OrderCost order={order} />
              <Actions order={order} />
              <Support />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
