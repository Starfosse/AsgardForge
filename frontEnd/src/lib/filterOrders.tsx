import { OrderSummary } from "@/services/api";

interface filterOrdersProps {
  orders: OrderSummary[];
  searchTerm: string;
  selectedPeriod: string;
}

export default function filterOrders({
  orders,
  searchTerm,
  selectedPeriod,
}: filterOrdersProps) {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const last3Months = new Date(
    now.getFullYear(),
    now.getMonth() - 3,
    now.getDate()
  );
  const last6Months = new Date(
    now.getFullYear(),
    now.getMonth() - 6,
    now.getDate()
  );
  const filteredOrders = orders
    .filter((order) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const hasMatchingProduct = order.items.some((item) =>
          item.product.name.toLowerCase().includes(searchLower)
        );
        return order.id.toString().includes(searchTerm) || hasMatchingProduct;
      }
      return true;
    })
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      switch (selectedPeriod) {
        case "last-month":
          return orderDate >= lastMonth;
        case "last-3-months":
          return orderDate >= last3Months;
        case "last-6-months":
          return orderDate >= last6Months;
        default:
          return true;
      }
    });

  return filteredOrders;
}
