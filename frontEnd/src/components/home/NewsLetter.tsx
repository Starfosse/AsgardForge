export default function NewsLetter() {
  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl mb-6 font-bold text-stone-800">
          Rejoignez la Communauté Viking
        </h2>
        <p className="text-xl mb-8 text-stone-600 max-w-2xl mx-auto">
          Recevez nos dernières créations, offres exclusives et inspirations
          nordiques.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-grow px-4 py-3 rounded-l-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-stone-800 text-white px-6 py-3 rounded-r-lg hover:bg-stone-700">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
