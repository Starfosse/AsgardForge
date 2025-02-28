type status = "pending" | "processing" | "shipped" | "completed" | "cancelled";

interface GetStatusBadgeProps {
  status: status;
}

const GetStatusBadge = ({ status }: GetStatusBadgeProps) => {
  let bgColor = "";
  let textColor = "";
  let label = "";

  switch (status) {
    case "pending":
      bgColor = "bg-amber-100";
      textColor = "text-amber-800";
      label = "En attente";
      break;
    case "processing":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      label = "En préparation";
      break;
    case "shipped":
      bgColor = "bg-indigo-100";
      textColor = "text-indigo-800";
      label = "Expédiée";
      break;
    case "completed":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      label = "Livrée";
      break;
    case "cancelled":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      label = "Annulée";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      label = "Inconnue";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
};

export default GetStatusBadge;
