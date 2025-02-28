import { AlertTriangle, Check, Clock, Package, Truck } from "lucide-react";

type status = "pending" | "processing" | "shipped" | "completed" | "cancelled";

// interface GetStatusBadgeProps {
//   status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
// }

export default function GetOrderStatusInfo(status: status) {
  switch (status) {
    case "pending":
      return {
        label: "En attente",
        description:
          "Votre commande a été reçue et est en attente de traitement",
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        icon: <Clock className="h-5 w-5" />,
      };
    case "processing":
      return {
        label: "En préparation",
        description:
          "Votre commande est en cours de préparation dans notre atelier",
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        icon: <Package className="h-5 w-5" />,
      };
    case "shipped":
      return {
        label: "Expédiée",
        description:
          "Votre commande a été expédiée et est en cours de livraison",
        color: "text-indigo-700",
        bgColor: "bg-indigo-50",
        icon: <Truck className="h-5 w-5" />,
      };
    case "completed":
      return {
        label: "Livrée",
        description: "Votre commande a été livrée avec succès",
        color: "text-green-700",
        bgColor: "bg-green-50",
        icon: <Check className="h-5 w-5" />,
      };
    case "cancelled":
      return {
        label: "Annulée",
        description: "Votre commande a été annulée",
        color: "text-red-700",
        bgColor: "bg-red-50",
        icon: <AlertTriangle className="h-5 w-5" />,
      };
    default:
      return {
        label: "Statut inconnu",
        description: "Le statut de votre commande est inconnu",
        color: "text-gray-700",
        bgColor: "bg-gray-50",
        icon: <Package className="h-5 w-5" />,
      };
  }
}
