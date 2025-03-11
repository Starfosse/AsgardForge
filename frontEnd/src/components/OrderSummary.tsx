import { CartItem } from "@/contexts/CartContext";
import Card from "@/wrapper/Card";
import { ShoppingBag } from "lucide-react";

interface OrderSummaryProps {
  status: { error: boolean; message: string; isSubmitting: boolean };
  cart: CartItem[];
  total: string;
}

export default function OrderSummary({
  status,
  cart,
  total,
}: OrderSummaryProps) {
  const calculateSubtotalWithoutPromotions = (): string => {
    return cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateSavings = (): string => {
    const subtotalWithoutPromotions = parseFloat(
      calculateSubtotalWithoutPromotions()
    );
    const subtotalWithPromotions = parseFloat(total);
    const savings = subtotalWithoutPromotions - subtotalWithPromotions;
    return savings > 0 ? savings.toFixed(2) : "0.00";
  };

  const hasSavings = (): boolean => {
    return parseFloat(calculateSavings()) > 0;
  };

  return (
    <div>
      <Card variant="primary" className="p-6 sticky top-12">
        <h2 className="text-2xl font-bold mb-6 text-stone-800 flex items-center">
          <ShoppingBag className="mr-2 text-amber-700" />
          Récapitulatif
        </h2>
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-3">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-stone-600">
                    Quantité: {item.quantity}
                  </p>
                </div>
              </div>
              {item.promotion_price ? (
                <div className="text-right">
                  <span className="text-sm line-through text-gray-500 block">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                  <span className="font-semibold text-red-600">
                    {(item.promotion_price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ) : (
                <span className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
              )}
            </div>
          ))}
          <hr className="border-stone-300" />
          {hasSavings() && (
            <div className="flex justify-between">
              <span>Sous-total sans promotions</span>
              <span className="line-through text-gray-500">
                {calculateSubtotalWithoutPromotions()} €
              </span>
            </div>
          )}
          {hasSavings() && (
            <div className="flex justify-between text-red-600">
              <span>Économies</span>
              <span>-{calculateSavings()} €</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span className={hasSavings() ? "font-semibold text-red-600" : ""}>
              {total} €
            </span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>Gratuite</span>
          </div>
          <hr className="border-stone-300" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span className={hasSavings() ? "text-red-600" : ""}>
              {total} €
            </span>
          </div>
        </div>
        <button
          type="submit"
          form="checkoutForm"
          className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold"
        >
          Confirmer la Commande
        </button>
      </Card>
      {status.error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {status.message}
        </div>
      )}
    </div>
  );
}
