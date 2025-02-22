import { productsService } from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../admin/ProductsList";
import { ProductWithImages } from "./Product";

const Collection = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [productsCategory, setProductsCategory] = useState<ProductWithImages[]>(
    []
  );
  const [priceRange, setPriceRange] = useState([0, 500]);
  const { id } = useParams<{ id: string }>();

  const fetchCategory = async () => {
    if (!id) return;
    const products = await productsService.getProductsByCategory(parseInt(id));
    setProductsCategory(products);
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const filteredProducts = productsCategory.filter(
    (product) =>
      Number(product.price) >= priceRange[0] &&
      Number(product.price) <= priceRange[1]
  );
  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800">
          {category ? category.name : "Tous les produits"}
        </h1>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {/* Filtre par prix */}
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

        {/* Grille de Produits */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                // src={product.images[0].image_path} //rattacher les images aux products
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-stone-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-700">
                    {product.price} €
                  </span>
                  <Link
                    to={`/${id}/${product.id}`}
                    className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
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
};

export default Collection;
