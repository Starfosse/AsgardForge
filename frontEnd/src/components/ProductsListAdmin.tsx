import Product from "@/services/api/products/types";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import { productsService } from "@/services/api/products/products.service";
import { useAuth } from "@/contexts/AuthContext";
import JustAdmin from "./JustAdmin";

export default function ProductsListAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const { customer } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsService.getProducts();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (customer?.email !== import.meta.env.VITE_ADMIN_EMAIL) {
      setAllowed(true);
      return;
    }
    productsService.deleteProduct(id).then(() => {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    });
  };

  if (loading) {
    return <LoadingScreen title="liste de produits" />;
  }

  if (allowed) {
    return <JustAdmin allowed={allowed} setAllowed={setAllowed} />;
  }

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mb-8">
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
              "Specifications",
              "Dimensions",
              "Poids",
              "Matériaux",
              "Actions",
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
              <td className="px-6 py-4 text-sm text-gray-400 max-w-40 truncate">
                {product.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                {product.promotion_price &&
                  new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.promotion_price)}
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
                {product.collection}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                {product.alertStock}
              </td>
              <td className="px-6 py-4 text-sm text-gray-400 max-w-40 truncate">
                {product.specifications}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                {product.dimensions}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                {product.weight}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400 max-w-40 truncate">
                {product.material}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button
                  className="text-red-500 hover:text-red-700 flex"
                  onClick={() => handleDelete(product.id ? product.id : 0)}
                >
                  Supprimer
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(product.id ? product.id : 0)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
