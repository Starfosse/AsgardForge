import { OrderHistoryDetails } from "@/services/api";
import { AlertTriangle, FileText, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionsProps {
  order: OrderHistoryDetails;
}

export default function Actions({ order }: ActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-stone-800">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={() => window.print()}
          className="flex items-center w-full justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          <FileText className="h-4 w-4 mr-2" />
          Imprimer la facture
        </button>

        <Link
          to="/"
          className="flex items-center w-full justify-center bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Continuer les achats
        </Link>

        {order.status === "pending" && (
          <button className="flex items-center w-full justify-center bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition duration-300">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Annuler la commande
          </button>
        )}
      </div>
    </div>
  );
}
