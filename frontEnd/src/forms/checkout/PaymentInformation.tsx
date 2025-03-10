import Card from "@/wrapper/Card";

export default function PaymentInformation() {
  return (
    <Card variant="primary" className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">Paiement</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Titulaire de la Carte
          </label>
          <input
            type="text"
            name="cardHolder"
            value="John Doe"
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            disabled={true}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Numéro de Carte
          </label>
          <input
            type="text"
            name="cardNumber"
            value="1234 5678 1234 5678"
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            maxLength={16}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Date d'Expiration
            </label>
            <input
              type="text"
              name="expirationDate"
              value="12/23"
              placeholder="MM/AA"
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value="123"
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              maxLength={3}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
