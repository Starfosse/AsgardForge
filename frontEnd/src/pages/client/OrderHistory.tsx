import ErrorAuthentificaiton from "@/components/ErrorAuthentification";
import LoadingScreen from "@/components/LoadingScreen";
import Orders from "@/components/order-history/Orders";
import SearchCommand from "@/components/order-history/SearchCommand";
import { useAuth } from "@/contexts/AuthContext";
import filterOrders from "@/lib/filterOrders";
import { orderService, OrderSummary } from "@/services/api";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const { customer, isAuthenticated } = useAuth();
  const filteredOrders = filterOrders({ orders, searchTerm, selectedPeriod });

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrdersByUserId(customer!.id);
      setOrders(response);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <ErrorAuthentificaiton
        title="liste de commandes"
        description="liste de commandes et accèder aux details de ces dernières"
      />
    );
  }

  if (loading) {
    return <LoadingScreen title="commandes" />;
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-stone-800">
            Mes Commandes
          </h1>
          <p className="text-stone-600">
            Consultez l'historique de toutes vos commandes et suivez leur statut
          </p>
        </div>
        <SearchCommand
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="w-16 h-16 text-stone-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-stone-800">
              {searchTerm
                ? "Aucune commande ne correspond à votre recherche"
                : "Aucune commande trouvée"}
            </h2>
            <p className="text-stone-600 mb-6">
              {searchTerm
                ? "Essayez de modifier vos critères de recherche"
                : "Vous n'avez pas encore passé de commande sur notre boutique"}
            </p>
            <Link
              to="/"
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-block"
            >
              Découvrir nos produits
            </Link>
          </div>
        )}
        {filteredOrders.length > 0 && (
          <Orders filteredOrders={filteredOrders} />
        )}
      </div>
    </div>
  );
}
