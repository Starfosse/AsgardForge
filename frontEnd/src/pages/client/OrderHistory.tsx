import Orders from "@/components/order-history/Orders";
import SearchCommand from "@/components/order-history/SearchCommand";
import { useAuth } from "@/contexts/AuthContext";
import filterOrders from "@/lib/filterOrders";
import { formatDate } from "@/lib/formatDate";
import GetStatusBadge from "@/lib/GetStatusBadge";
import { OrderItem, orderService, OrderSummary } from "@/services/api";
import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Package,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const { customer, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrdersByUserId(customer?.id!);
      console.log("Commandes récupérées:", response);
      setOrders(response);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes:", err);
      setError(
        "Impossible de charger vos commandes. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const filteredOrders = filterOrders({ orders, searchTerm, selectedPeriod });

  const getTotalItems = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-stone-100 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-stone-800">
            Accès Restreint
          </h1>
          <p className="text-xl mb-8 text-stone-600">
            Veuillez vous connecter pour accéder à l'historique de vos
            commandes.
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
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-amber-700 border-r-transparent mb-4"></div>
            <p className="text-stone-600">Chargement de vos commandes...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            <p>{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-2 text-sm font-medium text-red-700 hover:underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
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
        {!loading && !error && filteredOrders.length > 0 && (
          <Orders filteredOrders={filteredOrders} />
        )}
      </div>
    </div>
  );
}
