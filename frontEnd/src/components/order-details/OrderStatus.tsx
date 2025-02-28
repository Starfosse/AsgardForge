import { formatDate } from "@/lib/formatDate";
import GetOrderStatusInfo from "@/lib/GetOrderStatusInfo";
import { OrderHistoryDetails } from "@/services/api";

interface OrderStatusProps {
  order: OrderHistoryDetails;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const orderSteps = [
    { key: "pending", label: "Commande reçue" },
    { key: "processing", label: "En préparation" },
    { key: "shipped", label: "Expédiée" },
    { key: "delivered", label: "Livrée" },
  ];

  const getCurrentStep = () => {
    if (!order) return -1;
    if (order.status === "cancelled") return -1;

    return orderSteps.findIndex((step) => step.key === order.status);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {order.status === "cancelled" ? (
        <div className={`p-6 ${GetOrderStatusInfo(order.status).bgColor}`}>
          <div className="flex items-start">
            <div className={`mr-4 ${GetOrderStatusInfo(order.status).color}`}>
              {GetOrderStatusInfo(order.status).icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1 text-stone-800">
                Commande annulée
              </h2>
              <p className="text-stone-600">
                Cette commande a été annulée. Si vous avez des questions,
                n'hésitez pas à contacter notre service client.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={`p-6 ${GetOrderStatusInfo(order.status).bgColor}`}>
            <div className="flex items-start">
              <div className={`mr-4 ${GetOrderStatusInfo(order.status).color}`}>
                {GetOrderStatusInfo(order.status).icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1 text-stone-800">
                  {GetOrderStatusInfo(order.status).label}
                </h2>
                <p className="text-stone-600">
                  {GetOrderStatusInfo(order.status).description}
                </p>
                {order.estimatedDeliveryDate &&
                  order.status !== "completed" && (
                    <p className="mt-2 text-stone-700 font-medium">
                      Livraison estimée le{" "}
                      {formatDate(order.estimatedDeliveryDate)}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-stone-100">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-stone-200">
                {getCurrentStep() >= 0 && (
                  <div
                    style={{
                      width: `${
                        ((getCurrentStep() + 1) * 100) / orderSteps.length
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-600"
                  ></div>
                )}
              </div>
              <div className="flex justify-between">
                {orderSteps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`text-xs flex flex-col items-center ${
                      index <= getCurrentStep()
                        ? "text-amber-700 font-medium"
                        : "text-stone-500"
                    }`}
                  >
                    <div
                      className={`rounded-full h-4 w-4 mb-1 ${
                        index <= getCurrentStep()
                          ? "bg-amber-600"
                          : "bg-stone-300"
                      }`}
                    />
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
