import { Link } from "react-router-dom";

export default function Footer() {
  return (
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
          <h4 className="text-xl font-semibold mb-4 text-amber-300">Contact</h4>
          <p className="text-stone-400">
            Email: contact@asgardforge.com
            <br />
            Téléphone: +33 1 23 45 67 89
          </p>
        </div>
      </div>
    </footer>
  );
}
