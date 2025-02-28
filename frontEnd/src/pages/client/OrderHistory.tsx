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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Rechercher par n° de commande ou produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-stone-500" />
              <select
                className="border border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 px-4"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="all">Toutes les périodes</option>
                <option value="last-month">Dernier mois</option>
                <option value="last-3-months">3 derniers mois</option>
                <option value="last-6-months">6 derniers mois</option>
              </select>
            </div>
          </div>
        </div>
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
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                <div className="border-b border-stone-200 bg-stone-50 p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-stone-800">
                        Commande #{order.id}
                      </h3>
                      <span className="mx-2">•</span>
                      <GetStatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center mt-1 text-sm text-stone-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                    <div className="text-right">
                      <div className="text-stone-500 text-sm">Total</div>
                      <div className="font-bold text-amber-700">
                        {order.total.toFixed(2)} €
                      </div>
                    </div>
                    <Link
                      to={`/order/history/${order.id}`}
                      className="flex items-center space-x-1 text-amber-700 hover:text-amber-600 font-medium"
                    >
                      <span>Détails</span>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm text-stone-500 mb-3">
                    {getTotalItems(order.items)} article
                    {getTotalItems(order.items) > 1 ? "s" : ""}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-stone-200">
                          <img
                            src={
                              item.product.imagePath || "/api/placeholder/64/64"
                            }
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-stone-500">
                            Qté: {item.quantity} × {item.price.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}

                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center">
                        <Link
                          to={`/order/history/${order.id}`}
                          className="text-sm text-amber-700 hover:text-amber-600 flex items-center"
                        >
                          <span>+{order.items.length - 3} autres articles</span>
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {order.createdAt === "delivered" && (
                  <div className="bg-stone-50 p-4 border-t border-stone-200">
                    <button className="text-amber-700 hover:text-amber-600 text-sm font-medium">
                      Acheter à nouveau
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
