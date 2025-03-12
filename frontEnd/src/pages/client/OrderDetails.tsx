import ErrorAuthentificaiton from "@/components/ErrorAuthentification";
import LoadingScreen from "@/components/LoadingScreen";
import Actions from "@/components/order-details/Actions";
import CustomerData from "@/components/order-details/CustomerData";
import ItemsOrdered from "@/components/order-details/ItemsOrdered";
import OrderCost from "@/components/order-details/OrderCost";
import OrderStatus from "@/components/order-details/OrderStatus";
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      try {
        setLoading(true);
        const data = await orderService.getOrder(Number(orderId));
        setOrder(data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails de la commande:",
          err
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <ErrorAuthentificaiton
        title="détail de commande"
        description="commande en détail et suivre son statut"
      />
    );
  }

  if (loading) {
    return <LoadingScreen title="commande" />;
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
        {order && (
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
