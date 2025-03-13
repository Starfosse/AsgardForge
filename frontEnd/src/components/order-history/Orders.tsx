import { formatDate } from "@/lib/formatDate";
import GetStatusBadge from "@/lib/GetStatusBadge";
import { OrderItem, OrderSummary } from "@/services/api";
import { ChevronRight, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface OrdersProps {
  filteredOrders: OrderSummary[];
}

export default function Orders({ filteredOrders }: OrdersProps) {
  const getTotalItems = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };
  return (
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
                      src={item.product.imagePath || "/api/placeholder/64/64"}
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
  );
}
