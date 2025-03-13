import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyWishlist() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <Heart className="w-16 h-16 text-stone-400 mx-auto mb-6" />
      <h2 className="text-2xl font-semibold mb-4 text-stone-800">
        Votre liste de souhaits est vide
      </h2>
      <p className="text-stone-600 mb-8">
        Naviguez dans notre catalogue et ajoutez vos articles préférés à votre
        liste de souhaits.
      </p>
      <Link
        to="/"
        className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
      >
        Découvrir nos produits
      </Link>
    </div>
  );
}
