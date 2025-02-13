import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, CreditCard } from "lucide-react";

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez ici la logique pour traiter la commande
    console.log("Commande soumise:", formData);
  };

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800 flex items-center justify-center">
          <CreditCard className="mr-4 text-amber-700" /> Finaliser la Commande
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulaire de paiement */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-stone-800">
                  Informations Personnelles
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Adresse de livraison */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-stone-800">
                  Adresse de Livraison
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Code Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations de paiement */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-stone-800">
                  Paiement
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Titulaire de la Carte
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Numéro de Carte
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                      maxLength={16}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Date d'Expiration
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Récapitulatif de la commande */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-12">
              <h2 className="text-2xl font-bold mb-6 text-stone-800 flex items-center">
                <ShoppingBag className="mr-2 text-amber-700" />
                Récapitulatif
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
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

              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold"
              >
                Confirmer la Commande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
