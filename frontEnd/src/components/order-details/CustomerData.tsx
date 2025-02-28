import { OrderHistoryDetails } from "@/services/api";
import { Mail, MapPin, Phone, Truck, User } from "lucide-react";

interface CustomerDataProps {
  order: OrderHistoryDetails;
}

export default function CustomerData({ order }: CustomerDataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <User className="h-5 w-5 text-amber-700 mr-2" />
          <h3 className="text-lg font-semibold text-stone-800">
            Informations client
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-stone-600">
            <span className="font-medium text-stone-700 block">Nom:</span>
            {order.recipientFirstName} {order.recipientLastName}
          </p>
          <div className="flex items-start">
            <Mail className="h-4 w-4 text-stone-500 mt-1 mr-2" />
            <p className="text-stone-600">{order.recipientEmail}</p>
          </div>
          <div className="flex items-start">
            <Phone className="h-4 w-4 text-stone-500 mt-1 mr-2" />
            <p className="text-stone-600">{order.recipientPhone}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-amber-700 mr-2" />
          <h3 className="text-lg font-semibold text-stone-800">
            Adresse de livraison
          </h3>
        </div>
        <div className="space-y-3">
          <p className="text-stone-600">
            {order.shippingAddress}
            <br />
            {order.shippingPostalCode} {order.shippingCity}
          </p>

          {order.trackingNumber && (
            <div className="mt-4 pt-4 border-t border-stone-100">
              <div className="flex items-start">
                <Truck className="h-4 w-4 text-stone-500 mt-1 mr-2" />
                <div>
                  <p className="text-stone-700 font-medium">Numéro de suivi:</p>
                  <p className="text-stone-600">{order.trackingNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
