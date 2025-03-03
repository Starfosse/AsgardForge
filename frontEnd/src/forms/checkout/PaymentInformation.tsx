import { OrderCommand } from "./CheckoutForm";

interface PaymentInformationProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommand;
  isSubmitting: boolean;
}

export default function PaymentInformation({
  handleChange,
  paymentForm,
  isSubmitting,
}: PaymentInformationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">Paiement</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Titulaire de la Carte
          </label>
          <input
            type="text"
            name="cardHolder"
            value={paymentForm.cardHolder}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Numéro de Carte
          </label>
          <input
            type="text"
            name="cardNumber"
            value={paymentForm.cardNumber}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            maxLength={16}
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
              value={paymentForm.expirationDate}
              onChange={handleChange}
              placeholder="MM/AA"
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentForm.cvv}
              onChange={handleChange}
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
              maxLength={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
