import React, { useState } from "react";
import { Axe, Shield, Filter } from "lucide-react";

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = [
    {
      name: "Haches",
      icon: <Axe className="w-6 h-6 text-amber-700" />,
      products: [
        {
          id: 1,
          name: "Hache de Guerre d'Odin",
          price: 249.99,
          image: "/api/placeholder/400/300",
          description:
            "Hache authentique inspirée des légendaires guerriers nordiques.",
        },
        {
          id: 2,
          name: "Hache de Forgeron",
          price: 199.99,
          image: "/api/placeholder/400/300",
          description:
            "Outil traditionnel des forgerons vikings, parfait pour les artisans.",
        },
      ],
    },
    {
      name: "Boucliers",
      icon: <Shield className="w-6 h-6 text-gray-600" />,
      products: [
        {
          id: 3,
          name: "Bouclier du Clan Bjorn",
          price: 349.99,
          image: "/api/placeholder/400/300",
          description:
            "Bouclier robuste représentant les traditions du clan Bjorn.",
        },
        {
          id: 4,
          name: "Bouclier de Protection Légère",
          price: 279.99,
          image: "/api/placeholder/400/300",
          description: "Bouclier compact, idéal pour les combats rapprochés.",
        },
      ],
    },
  ];

  const filteredProducts = categories.flatMap((category) =>
    category.products.filter(
      (product) =>
        (selectedCategory ? category.name === selectedCategory : true) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
  );

  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800">
          Nos Produits Vikings
        </h1>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {/* Filtres par catégorie */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  )
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${
                  selectedCategory === category.name
                    ? "bg-amber-700 text-white"
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

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
                src={product.image}
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
                  <a
                    href={`/produits/${product.id}`}
                    className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Détails
                  </a>
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

export default Collections;
