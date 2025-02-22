import { Category } from "@/pages/admin/ProductsList";
import { productsService } from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CartPreviewMenu from "./CartPreviewMenu";
import CartPreviewMenuMobile from "./CartPreviewMenuMobile";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isAuthenticated, user, login, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await productsService.getCategories();
    setCategories(response);
  };

  return (
    <nav className="bg-stone-900 text-amber-300 shadow-lg border-b-4 border-amber-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-runic tracking-wider">
              AsgardForge
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button
                  className="flex items-center space-x-2 hover:text-amber-500 transition duration-300"
                  onClick={() => navigate(`/${category.id}`)}
                >
                  <span>{category.name}</span>
                </button>
              </div>
            ))}

            {/* Cart Button with Hover Preview */}
            <CartPreviewMenu />
          </div>
          {isAuthenticated ? (
            <div className="hidden md:flex md:flex-col items-center ">
              <div className="text-sm">Bonjour {user?.firstName}</div>
              <button className="hover:text-amber-500" onClick={logout}>
                Se déconnecter
              </button>
            </div>
          ) : (
            <button
              className="hidden md:flex hover:text-amber-500"
              onClick={login}
            >
              Se connecter
            </button>
          )}
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-300 hover:text-amber-500 focus:outline-none"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-900">
          {isAuthenticated ? (
            <div className="border-t border-stone-700 p-4 hover:bg-stone-800 w-full flex items-center justify-between space-x-4">
              <div>Bonjour {user?.firstName}</div>
              <button className="hover:text-amber-500" onClick={logout}>
                Se déconnecter
              </button>
            </div>
          ) : (
            <button
              className="border-t border-stone-700 p-4 hover:bg-stone-800 w-full flex items-center "
              onClick={login}
            >
              Se connecter
            </button>
          )}
          <CartPreviewMenuMobile />
          {categories.map((category) => (
            <div key={category.name} className="border-t border-stone-700">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-800"
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.name ? null : category.name
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  {/* {category.icon} */}
                  <span>{category.name}</span>
                </div>
                <span>{activeCategory === category.name ? "▲" : "▼"}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Menu;
