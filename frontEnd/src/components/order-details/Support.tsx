export default function Support() {
  return (
    <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
      <h3 className="text-lg font-semibold mb-2 text-stone-800">
        Besoin d'aide ?
      </h3>
      <p className="text-stone-600 mb-4">
        Si vous avez des questions concernant votre commande, n'hésitez pas à
        contacter notre service client.
      </p>
      <a
        href="mailto:contact@asgardforge.com"
        className="text-amber-700 hover:text-amber-600 font-medium"
      >
        Contacter le service client
      </a>
    </div>
  );
}
