import { CartItem } from "@/contexts/CartContext";
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
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-12">
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
              <span className="font-semibold">
                {(item.price * item.quantity).toFixed(2)} €
              </span>
            </div>
          ))}

          <hr className="border-stone-300" />

          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{total} €</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>Gratuite</span>
          </div>
          <hr className="border-stone-300" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{total} €</span>
          </div>
        </div>

        <button
          type="submit"
          form="checkoutForm"
          className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold"
        >
          Confirmer la Commande
        </button>
      </div>
      {status.error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {status.message}
        </div>
      )}
    </div>
  );
}
