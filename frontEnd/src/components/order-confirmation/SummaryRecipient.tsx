import { OrderSummaryConfirmation } from "@/services/api";
import { Mail, MapPin, Phone } from "lucide-react";

interface SummaryRecipientProps {
  order: OrderSummaryConfirmation | null;
}

export default function SummaryRecipient({ order }: SummaryRecipientProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-stone-800">
        Informations de Livraison
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-start mb-3">
            <MapPin className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
            <div>
              <p className="font-medium text-stone-800">Adresse de livraison</p>
              <p className="text-stone-600">{order?.shippingAddress}</p>
              <p className="text-stone-600">
                {order?.shippingPostalCode} {order?.shippingCity}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-start mb-3">
            <Mail className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
            <div>
              <p className="font-medium text-stone-800">Email</p>
              <p className="text-stone-600">{order?.recipientEmail}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-amber-700 mt-0.5 mr-2" />
            <div>
              <p className="font-medium text-stone-800">Téléphone</p>
              <p className="text-stone-600">{order?.recipientPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
