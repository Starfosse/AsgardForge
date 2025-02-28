import { OrderHistoryDetails } from "@/services/api";
import { Link } from "react-router-dom";

interface ItemsOrderedProps {
  order: OrderHistoryDetails;
}

export default function ItemsOrdered({ order }: ItemsOrderedProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-200">
        <h2 className="text-xl font-semibold text-stone-800">
          Articles commandés
        </h2>
      </div>
      <div className="divide-y divide-stone-200">
        {order.items.map((item, index) => (
          <div key={index} className="p-6 flex items-start">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-stone-200 mr-4">
              <img
                src={item.product.imagePath || "/api/placeholder/80/80"}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-medium text-stone-800">
                  {item.product.name}
                </h3>
                <div className="text-right">
                  {item.promotionPrice && item.promotionPrice < item.price ? (
                    <>
                      <p className="text-amber-700 font-bold">
                        {(item.promotionPrice * item.quantity).toFixed(2)} €
                      </p>
                      <p className="text-stone-500 line-through text-sm">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>
                    </>
                  ) : (
                    <p className="text-stone-800 font-bold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  )}
                </div>
              </div>
              <p className="text-stone-600 mt-1">Quantité: {item.quantity}</p>
              <div className="mt-3">
                {order.status === "completed" && (
                  <Link
                    to={`/produit/${item.product.id}`}
                    className="text-amber-700 hover:text-amber-600 text-sm font-medium"
                  >
                    Acheter à nouveau
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
