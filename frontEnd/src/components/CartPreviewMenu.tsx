import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPreviewMenu() {
  const [isCartPreviewVisible, setIsCartPreviewVisible] = useState(false);
  const cartPreviewTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { cart } = useCart();

  const handleCartMouseEnter = () => {
    if (cartPreviewTimerRef.current) {
      clearTimeout(cartPreviewTimerRef.current);
    }
    cartPreviewTimerRef.current = setTimeout(() => {
      setIsCartPreviewVisible(true);
    }, 200);
  };

  const handleCartMouseLeave = () => {
    if (cartPreviewTimerRef.current) {
      clearTimeout(cartPreviewTimerRef.current);
    }
    cartPreviewTimerRef.current = setTimeout(() => {
      setIsCartPreviewVisible(false);
    }, 300);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    return () => {
      if (cartPreviewTimerRef.current) {
        clearTimeout(cartPreviewTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleCartMouseEnter}
      onMouseLeave={handleCartMouseLeave}
    >
      <Link
        to="/cart"
        className="flex items-center space-x-2 hover:text-amber-500 transition duration-300"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>Panier</span>
        <span className="bg-amber-700 text-white text-xs rounded-full px-2 py-1">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </Link>

      {isCartPreviewVisible && (
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
                <p className="text-sm font-medium text-stone-800">
                  {item.name}
                </p>
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
            <span className="font-bold text-amber-700">
              {calculateTotal()} €
            </span>
          </div>
          <Link
            to="/cart"
            className="mt-4 w-full block text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-700"
          >
            Voir le Panier
          </Link>
        </div>
      )}
    </div>
  );
}
