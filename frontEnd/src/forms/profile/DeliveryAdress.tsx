import { Customer } from "@/contexts/AuthContext";

interface DeliveryAdressProps {
  formData: Customer;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  isSubmitting: boolean;
}

export default function DeliveryAdress({
  formData,
  handleChange,
  isEditing,
  isSubmitting,
}: DeliveryAdressProps) {
  return (
    <>
      <div className="mb-6">
        <label className="block text-stone-700 mb-2">Adresse</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={!isEditing || isSubmitting}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-stone-700 mb-2">Ville</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={!isEditing || isSubmitting}
          />
        </div>
        <div>
          <label className="block text-stone-700 mb-2">Code postal</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={!isEditing || isSubmitting}
          />
        </div>
      </div>
    </>
  );
}
