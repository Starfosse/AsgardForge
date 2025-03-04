import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, MessageCircle, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const { customer, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCartMouseEnter = () => {
    if (profileMenuTimerRef.current) {
      clearTimeout(profileMenuTimerRef.current);
    }
    profileMenuTimerRef.current = setTimeout(() => {
      setIsProfileMenuOpen(true);
    }, 200);
  };

  const handleCartMouseLeave = () => {
    if (profileMenuTimerRef.current) {
      clearTimeout(profileMenuTimerRef.current);
    }
    profileMenuTimerRef.current = setTimeout(() => {
      setIsProfileMenuOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (profileMenuTimerRef.current) {
        clearTimeout(profileMenuTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="hidden md:inline-flex md:relative md:justify-center items-center"
      onMouseEnter={handleCartMouseEnter}
      onMouseLeave={handleCartMouseLeave}
    >
      <div className="flex items-center space-x-2 hover:text-amber-500 cursor-pointer transition duration-300">
        <User className="h-5 w-5" />
        <span className="font-medium">Bonjour {customer?.firstName}</span>
      </div>

      {isProfileMenuOpen && (
        <div className="absolute top-full mt-1 right-0 w-48 bg-stone-800 shadow-lg rounded-md overflow-hidden z-20 border border-stone-700">
          <div className="py-2 px-4 bg-stone-900 text-amber-300 font-semibold border-b border-stone-700">
            Mon compte
          </div>

          <div className="py-1">
            <Link
              className="flex items-center px-4 py-2 text-amber-300 hover:bg-stone-700 transition duration-300"
              to="/profile"
            >
              <User className="h-4 w-4 mr-3" />
              <span>Mon profil</span>
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-amber-300 hover:bg-stone-700 transition duration-300"
              to="/order/history"
            >
              <ShoppingBag className="h-4 w-4 mr-3" />
              <span>Mes commandes</span>
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-amber-300 hover:bg-stone-700 transition duration-300"
              to="/contact"
            >
              <MessageCircle className="h-4 w-4 mr-3" />
              <span>Support</span>
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-amber-300 hover:bg-stone-700 transition duration-300"
              to="/profile/wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Liste d'envie</span>
            </Link>
          </div>
          <div className="border-t border-stone-700">
            <button
              className="flex items-center w-full text-left px-4 py-2 text-amber-300 hover:bg-stone-700 transition duration-300"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
