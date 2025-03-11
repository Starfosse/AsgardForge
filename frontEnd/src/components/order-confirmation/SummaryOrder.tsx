import { OrderSummaryConfirmation } from "@/services/api";
import Card from "@/wrapper/Card";

interface SummaryProps {
  order: OrderSummaryConfirmation | null;
}

export default function SummaryOrder({ order }: SummaryProps) {
  const calculateSavings = () => {
    let regularTotal = 0;
    let promotionalTotal = 0;

    order?.items.forEach((item) => {
      const regularPrice = item.price * item.quantity;
      regularTotal += regularPrice;

      const promoPrice =
        item.promotionPrice > 0
          ? item.promotionPrice * item.quantity
          : regularPrice;
      promotionalTotal += promoPrice;
    });

    return {
      regularTotal: regularTotal.toFixed(2),
      savings: (regularTotal - promotionalTotal).toFixed(2),
    };
  };

  const { regularTotal, savings } = calculateSavings();
  const hasSavings = parseFloat(savings) > 0;

  return (
    <Card variant="secondaryHidden">
      <div className="bg-stone-800 px-6 py-4">
        <h2 className="text-2xl font-bold text-amber-300">Récapitulatif</h2>
      </div>
      <div className="p-6">
        <div className="space-y-3 border-b border-stone-200 pb-6 mb-6">
          {hasSavings && (
            <div className="flex justify-between">
              <span className="text-stone-600">Sous-total sans promotions</span>
              <span className="text-gray-500 line-through">
                {regularTotal} €
              </span>
            </div>
          )}
          {hasSavings && (
            <div className="flex justify-between text-red-600">
              <span>Économies</span>
              <span>-{savings} €</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-stone-600">Sous-total</span>
            <span
              className={
                hasSavings
                  ? "text-red-600 font-medium"
                  : "text-stone-800 font-medium"
              }
            >
              {order?.total.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Livraison</span>
            <span className="text-stone-800 font-medium">Gratuite</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-stone-800">Total</span>
          <span className={hasSavings ? "text-red-600" : "text-amber-700"}>
            {order?.total.toFixed(2)} €
          </span>
        </div>
      </div>
    </Card>
  );
}
