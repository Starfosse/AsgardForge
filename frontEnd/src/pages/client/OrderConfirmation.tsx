import { useAuth } from "@/contexts/AuthContext";
import { orderService, OrderSummaryConfirmation } from "@/services/api";
import { Check, Mail, MapPin, Package, Phone, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Interfaces

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { customer } = useAuth();
  const [order, setOrder] = useState<OrderSummaryConfirmation | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrder(Number(orderId));
      setOrder(data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-stone-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-amber-700">
          Chargement de votre commande...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-stone-100 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-stone-800">
            Commande introuvable
          </h1>
          <p className="text-xl mb-8 text-stone-600">
            Nous n'avons pas pu trouver les détails de cette commande.
          </p>
          <Link
            to="/"
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Calculer le total sans promotion pour afficher le montant économisé si applicable
  const calculateSavings = () => {
    let regularTotal = 0;
    let promotionalTotal = 0;

    order.items.forEach((item) => {
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
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* En-tête de confirmation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-stone-800">
            Commande Confirmée
          </h1>
          <p className="text-xl text-stone-600 mb-2">
            Merci pour votre commande, {customer?.firstName}!
          </p>
          <p className="text-stone-600 mb-4">
            Votre commande #{order.id} a été reçue et est en cours de
            traitement.
          </p>
          <div className="flex items-center justify-center mt-6 text-amber-700">
            <Truck className="w-5 h-5 mr-2" />
            <span>
              Un email de confirmation vous a été envoyé à{" "}
              {order.recipientEmail}
            </span>
          </div>
        </div>

        {/* Résumé de la commande */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Détails de la commande */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-amber-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  Détails de la Commande
                </h2>
              </div>

              <div className="p-6">
                <div className="border-b border-stone-200 pb-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-stone-800">
                    Articles
                  </h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-stone-100 py-4 last:border-b-0 last:pb-0"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-stone-200 mr-4">
                        <img
                          src={
                            item.product.imagePath || "/api/placeholder/80/80"
                          }
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-stone-800">
                          {item.product.name}
                        </h4>
                        <p className="text-stone-600">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        {item.promotionPrice &&
                        item.promotionPrice < item.price ? (
                          <>
                            <p className="text-amber-700 font-bold">
                              {item.promotionPrice * item.quantity} €
                            </p>
                            <p className="text-stone-500 line-through text-sm">
                              {item.price * item.quantity} €
                            </p>
                          </>
                        ) : (
                          <p className="text-stone-800 font-bold">
                            {item.price * item.quantity} €
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Informations de livraison */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-stone-800">
                    Informations de Livraison
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-3">
                        <MapPin className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium text-stone-800">
                            Adresse de livraison
                          </p>
                          <p className="text-stone-600">
                            {order.shippingAddress}
                          </p>
                          <p className="text-stone-600">
                            {order.shippingPostalCode} {order.shippingCity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start mb-3">
                        <Mail className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium text-stone-800">Email</p>
                          <p className="text-stone-600">
                            {order.recipientEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
                        <div>
                          <p className="font-medium text-stone-800">
                            Téléphone
                          </p>
                          <p className="text-stone-600">
                            {order.recipientPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-stone-800 px-6 py-4">
                <h2 className="text-2xl font-bold text-amber-300">
                  Récapitulatif
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3 border-b border-stone-200 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Sous-total</span>
                    <span className="text-stone-800 font-medium">
                      {regularTotal} €
                    </span>
                  </div>
                  {hasSavings && (
                    <div className="flex justify-between text-green-600">
                      <span>Économies</span>
                      <span>-{savings} €</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-600">Livraison</span>
                    <span className="text-stone-800 font-medium">Gratuite</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-stone-800">Total</span>
                  <span className="text-amber-700">
                    {order.total.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>

            {/* Statut de la commande */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-stone-800">
                  Statut de la Commande
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">
                        Commande confirmée
                      </p>
                      <p className="text-stone-500 text-sm">
                        Votre commande a été reçue
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <Package className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">
                        En préparation
                      </p>
                      <p className="text-stone-500 text-sm">
                        Nous préparons votre commande
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start opacity-50">
                    <div className="bg-stone-200 p-2 rounded-full mr-3">
                      <Truck className="w-4 h-4 text-stone-600" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">En livraison</p>
                      <p className="text-stone-500 text-sm">À venir</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-8 space-y-4">
              <Link
                to="/"
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 block text-center"
              >
                Continuer les achats
              </Link>
              <button
                className="bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 block w-full"
                onClick={() => window.print()}
              >
                Imprimer la confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
