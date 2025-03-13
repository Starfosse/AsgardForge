import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPreviewMenuMobile() {
  const { cart } = useCart();
  return (
    <>
      {cart.length > 0 && (
        <Link
          to="/cart"
          className="border-t border-stone-700 p-4 hover:bg-stone-800 w-full flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <span>Panier</span>
          </div>
          <span className="bg-amber-700 text-white text-xs rounded-full px-2 py-1">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </Link>
      )}{" "}
    </>
  );
}
