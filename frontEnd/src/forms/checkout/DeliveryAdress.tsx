import { OrderCommand } from "@/pages/client/Checkout";

interface DeliveryAdressProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommand;
  isSubmitting: boolean;
}

export default function DeliveryAdress({
  handleChange,
  paymentForm,
  isSubmitting,
}: DeliveryAdressProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">
        Adresse de Livraison
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            value={paymentForm.address}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              name="city"
              value={paymentForm.city}
              onChange={handleChange}
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Code Postal
            </label>
            <input
              type="text"
              name="zipCode"
              value={paymentForm.zipCode}
              onChange={handleChange}
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
