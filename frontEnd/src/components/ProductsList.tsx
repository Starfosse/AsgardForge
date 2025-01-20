import { productsService } from "@/services/api";
import Product from "@/services/api/products/types";
import { useEffect, useState } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsService.getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-400 mb-6">
        Liste des Produits
      </h1>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#272E48]">
            <tr>
              {[
                "Nom",
                "Description",
                "Prix",
                "Prix en promotion",
                "Stock",
                "Categorie",
                "Alerte de Stock",
                "Details",
                "Specifications",
                "Dimensions",
                "Poids",
                "Matériaux",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-bold text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#272E48]">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-[#0d101b] transition-colors duration-200"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                  {product.promotionPrice &&
                    new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(product.promotionPrice)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      product.stock > product.alertStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.alertStock}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {product.specifications}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.dimensions}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.weight}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                  {product.material}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
