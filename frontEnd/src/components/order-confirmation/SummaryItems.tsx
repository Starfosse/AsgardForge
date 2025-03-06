import { OrderItem, OrderSummaryConfirmation } from "@/services/api";

interface SummaryItemsProps {
  items: OrderItem[] | undefined;
}

export default function SummaryItems({ items }: SummaryItemsProps) {
  return (
    <div className="border-b border-stone-200 pb-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-stone-800">Articles</h3>
      {items?.map((item, index) => (
        <div
          key={index}
          className="flex items-center border-b border-stone-100 py-4 last:border-b-0 last:pb-0"
        >
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-stone-200 mr-4">
            <img
              src={item.product.imagePath || "/api/placeholder/80/80"}
              alt={item.product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-stone-800">{item.product.name}</h4>
            <p className="text-stone-600">Quantité: {item.quantity}</p>
          </div>
          <div className="text-right">
            {item.promotionPrice && item.promotionPrice < item.price ? (
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
  );
}
