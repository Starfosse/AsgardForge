import Card from "@/wrapper/Card";

export default function () {
  const featuredProducts = [
    {
      name: "Hache de Guerre d'Odin",
      price: 249.99,
      image: "/api/placeholder/400/300",
    },
    {
      name: "Bouclier du Clan Bjorn",
      price: 349.99,
      image: "/api/placeholder/400/300",
    },
    {
      name: "Amulette de Protection",
      price: 99.99,
      image: "/api/placeholder/400/300",
    },
  ];
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-4xl text-center mb-12 font-bold text-stone-800">
        Produits Phares
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <Card
            key={product.name}
            variant="secondaryHidden"
            className="hover:scale-105 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-amber-700">
                  {product.price} €
                </span>
                {/* <Link
                            to={`/produits/${product.id}`}
                            className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                          >
                            Voir le Produit
                          </Link> */}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
