import BestProducts from "@/components/home/BestProducts";
import NewsLetter from "@/components/home/NewsLetter";
import Why from "@/components/home/Why";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-stone-100 text-stone-900">
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-center"
        style={{ backgroundImage: "url('/homePage.jpg')" }}
      >
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
      <BestProducts />
      <Why />
      <NewsLetter />
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
                <Link to={"contact"} className="hover:text-amber-400">
                  Contact
                </Link>
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
