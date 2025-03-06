import Card from "@/wrapper/Card";
import { Check, Package, Truck } from "lucide-react";

export default function StatusOrder() {
  return (
    <Card variant="secondaryHidden">
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
              <p className="font-medium text-stone-800">Commande confirmée</p>
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
              <p className="font-medium text-stone-800">En préparation</p>
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
    </Card>
  );
}
