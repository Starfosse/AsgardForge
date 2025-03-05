interface DiscountPriceProps {
  price: number;
  promotionPrice: number;
}

export default function DiscountPrice({
  price,
  promotionPrice,
}: DiscountPriceProps) {
  const calculateDiscount = (price: number, promoPrice: number | null) => {
    if (!promoPrice || promoPrice >= price) return null;
    return Math.round(((price - promoPrice) / price) * 100);
  };

  return (
    <div>
      <span className="text-2xl font-bold text-amber-700">
        {promotionPrice} €
      </span>
      <span className="ml-2 text-stone-500 line-through">{price} €</span>
      <span className="ml-2 bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
        -{calculateDiscount(price, promotionPrice)}%
      </span>
    </div>
  );
}
