type OrderStatus = "en attente" | "livré" | "annulé" | "expédié";

interface Order {
  id: number;
  date: string;
  customerFullName: string;
  adresse: string;
  total: number;
  status: OrderStatus;
}

export default function OrdersList() {
  const fakeOrders: Order[] = [
    {
      id: 1,
      date: "2021-09-01",
      customerFullName: "John Doe",
      adresse: "123 rue de la paix",
      total: 123,
      status: "en attente",
    },
    {
      id: 2,
      date: "2021-09-02",
      customerFullName: "Jane Doe",
      adresse: "123 rue de la paix",
      total: 123,
      status: "livré",
    },
    {
      id: 3,
      date: "2021-09-03",
      customerFullName: "John Doe",
      adresse: "123 rue de la paix",
      total: 123,
      status: "annulé",
    },
    {
      id: 4,
      date: "2021-09-04",
      customerFullName: "Jane Doe",
      adresse: "123 rue de la paix",
      total: 123,
      status: "expédié",
    },
  ];

  const getBackground = (status: OrderStatus) => {
    switch (status) {
      case "en attente":
        return "bg-yellow-500";
      case "livré":
        return "bg-green-500";
      case "annulé":
        return "bg-red-500";
      case "expédié":
        return "bg-blue-500";
    }
  };

  return (
    <div className="relative rounded-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#272E48]">
          <tr>
            {["Id", "Date", "Client", "Adresse", "Total", "Statut"].map(
              (item, index) => (
                <th
                  key={index}
                  className="text-left px-8 py-4 text-sm font-semibold text-white uppercase"
                >
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {fakeOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-[#0d101b] transition-colors duration-200"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {order.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {order.date}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {order.customerFullName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {order.adresse}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                {order.total}
              </td>
              <td
                className={`${getBackground(
                  order.status
                )} whitespace-nowrap px-6 text-sm font-medium text-white`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
