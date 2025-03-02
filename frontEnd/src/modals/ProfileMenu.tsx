import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
    if (profileMenuTimerRef.current) {
      clearTimeout(profileMenuTimerRef.current);
    }
  });

  return (
    <div
      className="hidden md:inline-flex md:relative md:justify-center"
      onMouseEnter={handleCartMouseEnter}
      onMouseLeave={handleCartMouseLeave}
    >
      <div className="text-lg">Bonjour {customer!.firstName}</div>
      {isProfileMenuOpen && (
        <div className="px-4 py-2 bg-white absolute rounded-sm top-8 flex flex-col z-10 text-stone-300 divide-y divide-stone-300 text-nowrap space-y-2">
          <Link className="hover:text-amber-500 transition duration-300" to="">
            Profil
          </Link>
          <Link
            className="hover:text-amber-500 transition duration-300"
            to="/order/history"
          >
            Mes commandes
          </Link>
          <Link
            className="hover:text-amber-500 transition duration-300"
            to="contact"
          >
            Support
          </Link>
          <button
            className="hover:text-amber-500 transition duration-300 text-left"
            onClick={() => logout()}
          >
            Déconnexion
          </button>
          {/* <Link className="hover:text-amber-500 transition duration-300" to="">
            Liste d'envie
          </Link> */}
        </div>
      )}
    </div>
  );
}
