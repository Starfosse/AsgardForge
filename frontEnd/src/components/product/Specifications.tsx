import Product from "@/services/api/products/types";
import Card from "@/wrapper/Card";

interface SpecificationsProps {
  product: Product;
}

export default function Specifications({ product }: SpecificationsProps) {
  return (
    <Card variant="primary" className="p-6">
      <h3 className="text-2xl font-semibold mb-4 text-stone-800">
        Spécifications
      </h3>
      {
        <div className="grid grid-cols-2 gap-4">
          <div className="border-b pb-2">
            <span className="text-stone-600">Dimensions</span>
            <div className="font-semibold text-stone-800">
              {product?.dimensions}
            </div>
          </div>
          <div className="border-b pb-2">
            <span className="text-stone-600">Poids</span>
            <div className="font-semibold text-stone-800">
              {product?.weight} kg
            </div>
          </div>
          <div className="border-b pb-2">
            <span className="text-stone-600">Matériaux</span>
            <div className="font-semibold text-stone-800">
              {product?.material}
            </div>
          </div>
          <div className="border-b pb-2">
            <span className="text-stone-600">Spécifications</span>
            <div className="font-semibold text-stone-800">
              {product?.specifications}
            </div>
          </div>
        </div>
      }
    </Card>
  );
}
