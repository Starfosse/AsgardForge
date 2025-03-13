import { Flame, Hammer, Shield } from "lucide-react";

export default function Why() {
  const features = [
    {
      icon: <Hammer className="w-12 h-12 text-amber-700" />,
      title: "Forgé avec Passion",
      description:
        "Chaque pièce est créée avec le plus grand soin, comme le feraient nos ancêtres vikings.",
    },
    {
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      title: "Qualité Supérieure",
      description:
        "Nos artisans utilisent les techniques traditionnelles pour garantir une durabilité exceptionnelle.",
    },
    {
      icon: <Flame className="w-12 h-12 text-red-700" />,
      title: "Esprit Viking",
      description:
        "Chaque produit raconte une histoire et transporte l'âme des guerriers nordiques.",
    },
  ];
  return (
    <section className="bg-stone-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 font-bold text-amber-300">
          Pourquoi AsgardForge ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-stone-700 rounded-lg hover:bg-stone-600 transition duration-300"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl mb-4 font-semibold text-amber-400">
                {feature.title}
              </h3>
              <p className="text-stone-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
