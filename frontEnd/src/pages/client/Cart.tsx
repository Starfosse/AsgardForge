import React, { useState } from "react";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hache de Guerre d'Odin",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "Amulette de Protection",
      price: 99.99,
      quantity: 2,
      image: "/api/placeholder/400/300",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800 flex items-center justify-center">
          <ShoppingBag className="mr-4 text-amber-700" /> Votre Panier
        </h1>

        {cartItems.length === 0 ? (
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
            {/* Liste des Produits */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
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
                    <p className="text-amber-700 font-bold mb-4">
                      {item.price} € / unité
                    </p>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-stone-100"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-stone-100"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 text-right">
                    <span className="font-bold text-xl text-stone-800">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Récapitulatif de Commande */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-12">
                <h3 className="text-2xl font-bold mb-6 text-stone-800">
                  Récapitulatif
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{calculateTotal()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <hr className="border-stone-300" />
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>{calculateTotal()} €</span>
                  </div>
                </div>

                <button className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition">
                  Passer la Commande
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
