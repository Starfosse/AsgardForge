import React, { useState, useRef, useEffect } from "react";
import { Axe, Shield, Hammer, Flame, ShoppingCart } from "lucide-react";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isCartPreviewVisible, setIsCartPreviewVisible] = useState(false);
  const cartPreviewTimerRef = useRef(null);

  // Placeholder cart items (in a real app, this would come from state management)
  const cartItems = [
    {
      name: "Hache de Guerre d'Odin",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
    },
    {
      name: "Bouclier du Clan Bjorn",
      price: 349.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
    },
  ];

  const categories = [
    {
      name: "Armes",
      icon: <Axe className="w-6 h-6 text-amber-800" />,
      subcategories: ["Haches", "Épées", "Boucliers", "Lances"],
    },
    {
      name: "Armures",
      icon: <Shield className="w-6 h-6 text-gray-600" />,
      subcategories: ["Casques", "Cottes de mailles", "Protections"],
    },
    {
      name: "Outils",
      icon: <Hammer className="w-6 h-6 text-bronze-700" />,
      subcategories: ["Forgeron", "Navigation", "Survie"],
    },
    {
      name: "Rituels",
      icon: <Flame className="w-6 h-6 text-red-700" />,
      subcategories: ["Rituels sacrés", "Amulettes", "Herbes mystiques"],
    },
  ];

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCartMouseEnter = () => {
    // Clear any existing timer
    if (cartPreviewTimerRef.current) {
      clearTimeout(cartPreviewTimerRef.current);
    }

    // Set a new timer to show preview
    cartPreviewTimerRef.current = setTimeout(() => {
      setIsCartPreviewVisible(true);
    }, 200); // Short delay to improve user experience
  };

  const handleCartMouseLeave = () => {
    // Clear the timer if user moves away quickly
    if (cartPreviewTimerRef.current) {
      clearTimeout(cartPreviewTimerRef.current);
    }

    // Hide preview after a short delay
    cartPreviewTimerRef.current = setTimeout(() => {
      setIsCartPreviewVisible(false);
    }, 300); // Slightly longer delay to allow mouse movement
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (cartPreviewTimerRef.current) {
        clearTimeout(cartPreviewTimerRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-stone-900 text-amber-300 shadow-lg border-b-4 border-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-runic tracking-wider">
              AsgardForge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center space-x-2 hover:text-amber-500 transition duration-300">
                  {category.icon}
                  <span>{category.name}</span>
                </button>

                {activeCategory === category.name && (
                  <div className="absolute z-20 left-0 mt-2 w-48 bg-stone-800 rounded-lg shadow-xl border border-amber-700 py-2">
                    {category.subcategories.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-stone-700 hover:text-amber-400"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Cart Button with Hover Preview */}
            <div
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <a
                href="/panier"
                className="flex items-center space-x-2 hover:text-amber-500 transition duration-300"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Panier</span>
                <span className="bg-amber-700 text-white text-xs rounded-full px-2 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </a>

              {isCartPreviewVisible && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-stone-200 p-4 z-50"
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                >
                  <h3 className="text-lg font-semibold mb-4 text-stone-800">
                    Aperçu du Panier
                  </h3>
                  {cartItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center mb-3 last:mb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4 rounded"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-stone-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-stone-600">
                          {item.quantity} x {item.price.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-2 border-t border-stone-200 flex justify-between">
                    <span className="font-semibold text-stone-800">Total</span>
                    <span className="font-bold text-amber-700">
                      {calculateTotal()} €
                    </span>
                  </div>
                  <a
                    href="/panier"
                    className="mt-4 w-full block text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-700"
                  >
                    Voir le Panier
                  </a>
                </div>
              )}
            </div>
          </div>

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
                  {category.icon}
                  <span>{category.name}</span>
                </div>
                <span>{activeCategory === category.name ? "▲" : "▼"}</span>
              </button>

              {activeCategory === category.name && (
                <div className="bg-stone-800 py-2">
                  {category.subcategories.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-2 text-amber-200 hover:bg-stone-700 hover:text-amber-400"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Menu;
