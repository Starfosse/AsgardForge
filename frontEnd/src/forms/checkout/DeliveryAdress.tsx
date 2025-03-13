import { OrderCommandForm } from "@/pages/client/Checkout";
import Card from "@/wrapper/Card";

interface DeliveryAdressProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommandForm;
  isSubmitting: boolean;
}

export default function DeliveryAdress({
  handleChange,
  paymentForm,
  isSubmitting,
}: DeliveryAdressProps) {
  return (
    <Card variant="primary" className="p-6">
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
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              maxLength={5}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
