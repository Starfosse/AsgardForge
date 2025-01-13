import { Flame, Hammer, Shield } from "lucide-react";

const Home = () => {
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

  const features = [
    {
      icon: <Hammer className="w-12 h-12 text-amber-700" />,
      title: "Forgé avec Passion",
      description:
        "Chaque pièce est créée avec le plus grand soin, comme le feraient nos ancêtres vikings.",
    },
    {
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      title: "Qualité Supérieure",
      description:
        "Nos artisans utilisent les techniques traditionnelles pour garantir une durabilité exceptionnelle.",
    },
    {
      icon: <Flame className="w-12 h-12 text-red-700" />,
      title: "Esprit Viking",
      description:
        "Chaque produit raconte une histoire et transporte l'âme des guerriers nordiques.",
    },
  ];

  return (
    <div className="bg-stone-100 text-stone-900">
      {/* Hero Section */}
      <div className="relative bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-300">
            AsgardForge
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Équipez-vous comme un véritable guerrier nordique. Authenticité,
            qualité et tradition.
          </p>
          <a
            href="#collections"
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
          >
            Découvrir nos Collections
          </a>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 font-bold text-stone-800">
          Produits Phares
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300"
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
                  <a
                    href={`/produits/${product.id}`}
                    className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Voir le Produit
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-stone-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 font-bold text-amber-300">
            Pourquoi AsgardForge ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 bg-stone-700 rounded-lg hover:bg-stone-600 transition duration-300"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl mb-4 font-semibold text-amber-400">
                  {feature.title}
                </h3>
                <p className="text-stone-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6 font-bold text-stone-800">
            Rejoignez la Communauté Viking
          </h2>
          <p className="text-xl mb-8 text-stone-600 max-w-2xl mx-auto">
            Recevez nos dernières créations, offres exclusives et inspirations
            nordiques.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-4 py-3 rounded-l-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-stone-800 text-white px-6 py-3 rounded-r-lg hover:bg-stone-700">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-amber-300">
              AsgardForge
            </h3>
            <p className="text-stone-400">
              Votre destination ultime pour des équipements vikings authentiques
              et de haute qualité.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-amber-300">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-amber-300">
              Contact
            </h4>
            <p className="text-stone-400">
              Email: contact@asgardforge.com
              <br />
              Téléphone: +33 1 23 45 67 89
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
