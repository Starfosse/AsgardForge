import { useCart } from "@/contexts/CartContext";
import CartPreview from "@/modals/CartPreview";
import Cart from "@/pages/client/Cart";
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

      {isCartPreviewVisible && <CartPreview cart={cart} />}
    </div>
  );
}
