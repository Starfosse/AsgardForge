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
          <Link
            to="/collections"
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
          >
            Découvrir nos Collections
          </Link>
        </div>
      </div>
      <BestProducts />
      <Why />
      <NewsLetter />
    </div>
  );
};

export default Home;
