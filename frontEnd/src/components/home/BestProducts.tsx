import { productsService } from "@/services/api";
import Product, { ProductsFeatured } from "@/services/api/products/types";
import Card from "@/wrapper/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [productsFeatured, setProductsFeatured] = useState<ProductsFeatured[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProductsFeatured();
  }, []);
  console.log(productsFeatured);
  const fetchProductsFeatured = async () => {
    try {
      setIsLoading(true);
      const response = await productsService.getFeaturedProducts();
      setProductsFeatured(response);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-4xl text-center mb-12 font-bold text-stone-800">
        Produits Phares
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <p>Chargement des produits...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {productsFeatured.map((product) => (
            <Card
              key={product.id || product.name}
              variant="secondaryHidden"
              className="hover:scale-105 transition duration-300"
            >
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  {product.promotion_price ? (
                    <div className="flex flex-col">
                      <span className="text-lg line-through text-gray-500">
                        {product.price} €
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        {product.promotion_price} €
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-amber-700">
                      {product.price} €
                    </span>
                  )}
                  <Link
                    to={`/${product.collectionName}/${product.collectionId}/${product.name}/${product.id}`}
                    className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Voir le Produit
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
