import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";

interface ErrorAuthentificationProps {
  title: string;
  description: string;
}

export default function ErrorAuthentificaiton({
  title,
  description,
}: ErrorAuthentificationProps) {
  const { login } = useAuth();
  return (
    <div className="bg-stone-100 flex-grow py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-stone-800">
            Connectez-vous pour voir votre {title}
          </h1>
          <p className="text-stone-600 mb-8">
            Vous devez être connecté pour accéder à votre {description}.
          </p>
          <button
            onClick={login}
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
