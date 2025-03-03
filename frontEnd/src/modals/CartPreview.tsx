import { CartItem } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface CartPreviewProps {
  cart: CartItem[];
}

export default function CartPreview({ cart }: CartPreviewProps) {
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-stone-200 p-4 z-50">
      <h3 className="text-lg font-semibold mb-4 text-stone-800">
        Aperçu du Panier
      </h3>
      {cart.map((item) => (
        <div key={item.name} className="flex items-center mb-3 last:mb-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover mr-4 rounded"
          />
          <div className="flex-grow">
            <p className="text-sm font-medium text-stone-800">{item.name}</p>
            <p className="text-sm text-stone-600">
              {item.quantity} x{" "}
              {item.promotionPrice
                ? item.promotionPrice.toFixed(2)
                : item.price.toFixed(2)}{" "}
              €
            </p>
          </div>
        </div>
      ))}
      <div className="mt-4 pt-2 border-t border-stone-200 flex justify-between">
        <span className="font-semibold text-stone-800">Total</span>
        <span className="font-bold text-amber-700">{calculateTotal()} €</span>
      </div>
      <Link
        to="/cart"
        className="mt-4 w-full block text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-700"
      >
        Voir le Panier
      </Link>
    </div>
  );
}
