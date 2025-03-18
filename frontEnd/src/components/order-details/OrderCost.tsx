import { formatDate } from "@/lib/formatDate";
import { OrderHistoryDetails } from "@/services/api";
import { Calendar, CreditCard } from "lucide-react";

interface OrderCostProps {
  order: OrderHistoryDetails;
}

export default function OrderCost({ order }: OrderCostProps) {
  const calculateSavings = () => {
    if (!order) return { regularTotal: "0.00", savings: "0.00" };
    let regularTotal = 0;
    let promotionalTotal = 0;
    order.items.forEach((item) => {
      const regularPrice = item.price * item.quantity;
      regularTotal += regularPrice;
      const promoPrice =
        item.promotionPrice > 0
          ? item.promotionPrice * item.quantity
          : regularPrice;
      promotionalTotal += promoPrice;
    });
    return {
      regularTotal: regularTotal,
      savings: regularTotal - promotionalTotal,
    };
  };

  const { regularTotal, savings } = calculateSavings();
  const hasSavings = Number(savings) > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-stone-800 px-6 py-4">
        <h2 className="text-xl font-semibold text-amber-300">Récapitulatif</h2>
      </div>
      <div className="p-6">
        <div className="space-y-3 border-b border-stone-200 pb-6 mb-6">
          <div className="flex items-center text-sm text-stone-500 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Commandé le {formatDate(order.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Sous-total</span>
            <span className="text-stone-800 font-medium">{regularTotal} €</span>
          </div>
          {hasSavings && (
            <div className="flex justify-between text-green-600">
              <span>Économies</span>
              <span>-{savings} €</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-stone-600">Livraison</span>
            <span className="text-stone-800 font-medium">Gratuite</span>
          </div>
          {order.paymentMethod && (
            <div className="pt-4 mt-4 border-t border-stone-100">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 text-stone-500 mr-2" />
                <span className="text-stone-600">
                  Paiement: {order.paymentMethod}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-stone-800">Total</span>
          <span className="text-amber-700">{order.total} €</span>
        </div>
      </div>
    </div>
  );
}
