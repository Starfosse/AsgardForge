import JustAdmin from "@/components/JustAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Product from "@/services/api/products/types";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, substractFromCart } = useCart();
  const { isAuthenticated, login, customer } = useAuth();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  const navigateTo = (url: string) => {
    if (customer?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
      setAllowed(true);
      return;
    }
    navigate(url);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const effectivePrice = item.promotion_price || item.price;
        return total + effectivePrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateSubtotalWithoutPromotions = () => {
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
    const subtotalWithPromotions = parseFloat(calculateTotal());
    const savings = subtotalWithoutPromotions - subtotalWithPromotions;
    return savings > 0 ? savings.toFixed(2) : "0.00";
  };

  const hasSavings = (): boolean => {
    return parseFloat(calculateSavings()) > 0;
  };

  if (allowed) {
    return <JustAdmin allowed={allowed} setAllowed={setAllowed} />;
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800 flex items-center justify-center">
          <ShoppingBag className="mr-4 text-amber-700" /> Votre Panier
        </h1>
        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-2xl text-stone-600 mb-4">
              Votre panier est vide
            </p>
            <a
              href="/produits"
              className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
            >
              Découvrir nos Produits
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-grow p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    {item.promotion_price ? (
                      <div className="flex flex-col mb-4">
                        <span className="text-gray-500 line-through">
                          {item.price.toFixed(2)} € / unité
                        </span>
                        <span className="text-red-600 font-bold">
                          {item.promotion_price.toFixed(2)} € / unité
                        </span>
                      </div>
                    ) : (
                      <p className="text-amber-700 font-bold mb-4">
                        {item.price.toFixed(2)} € / unité
                      </p>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => substractFromCart(item.id, 1)}
                          className="p-2 hover:bg-stone-100"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item as any as Product, 1)}
                          className="p-2 hover:bg-stone-100"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          substractFromCart(item.id, item.quantity)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 text-right">
                    {item.promotion_price ? (
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500 line-through">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                        <span className="font-bold text-xl text-red-600">
                          {(item.promotion_price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-xl text-stone-800">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-12">
                <h3 className="text-2xl font-bold mb-6 text-stone-800">
                  Récapitulatif
                </h3>
                <div className="space-y-4 mb-6">
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
                    <span
                      className={
                        hasSavings() ? "font-semibold text-red-600" : ""
                      }
                    >
                      {calculateTotal()} €
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
                      {calculateTotal()} €
                    </span>
                  </div>
                </div>
                {isAuthenticated ? (
                  <button
                    onClick={() => navigateTo("/checkout")}
                    className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition"
                  >
                    Passer la Commande
                  </button>
                ) : (
                  <button
                    onClick={login}
                    className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition"
                  >
                    Se connecter pour Commander
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
