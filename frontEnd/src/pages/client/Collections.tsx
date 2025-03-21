import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collectionsService } from "@/services/api/collection/collections.service";
import Collection from "@/services/api/collection/types";
import Card from "@/wrapper/Card";
import LoadingScreen from "@/components/LoadingScreen";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await collectionsService.getCollections();
      setCollections(response);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  // Images de remplacement pour chaque collection
  const getCollectionImage = (collectionName: string) => {
    const images = {
      Armes: "/weapons.jpg",
      Boucliers: "/armor.jpg",
      Casques: "/jewelry.jpg",
    };

    // @ts-ignore
    return images[collectionName] || images["default"];
  };

  if (loading) {
    return <LoadingScreen title="commande" />;
  }

  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-800 text-center">
          Nos Collections
        </h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-stone-600">
          Explorez notre gamme d'articles vikings authentiques, forgés dans la
          tradition des guerriers nordiques.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              variant="secondary"
              className="hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/${collection.name}/${collection.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={getCollectionImage(collection.name)}
                  alt={collection.name}
                  className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-amber-700">
                  {collection.name}
                </h2>
                <p className="text-stone-600 mb-4 line-clamp-3">
                  {collection.description}
                </p>
                <Link
                  to={`/${collection.name}/${collection.id}`}
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 inline-block"
                >
                  Découvrir les produits
                </Link>
              </div>
            </Card>
          ))}
        </div>
        {collections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-stone-600">
              Aucune collection disponible pour le moment.
            </p>
            <Link
              to="/"
              className="mt-4 bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 inline-block"
            >
              Retour à l'accueil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
