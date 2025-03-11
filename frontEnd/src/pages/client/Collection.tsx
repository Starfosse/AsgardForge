import LoadingScreen from "@/components/LoadingScreen";
import { collectionsService } from "@/services/api/collection/collections.service";
import Product from "@/services/api/products/types";
import Card from "@/wrapper/Card";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CollectionPage() {
  const [productsCollection, setProductsCollection] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { collectionName } = useParams<{ collectionName: string }>();

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const products = await collectionsService.getProductsByCollection(
        parseInt(id)
      );
      setProductsCollection(products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = productsCollection.filter((product) => {
    const effectivePrice = product.promotion_price || Number(product.price);
    return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
  });

  if (loading) {
    return <LoadingScreen title="collection" />;
  }

  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800">
          {collectionName}
        </h1>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-4">
            <span>Prix:</span>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-48"
            />
            <span>{priceRange[1]} €</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              variant="secondaryHidden"
              key={product.id}
              className="hover:scale-105 transition duration-300"
            >
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-stone-600 mb-4">{product.description}</p>
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
                    to={`/${collectionName}/${id}/${product.name}/${product.id}`}
                    className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-stone-600 py-12">
            Aucun produit ne correspond à vos critères.
          </div>
        )}
      </div>
    </div>
  );
}
