import { OrderCommandForm } from "@/pages/client/Checkout";
import Card from "@/wrapper/Card";

interface PersonnalInformationProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommandForm;
  isSubmitting: boolean;
}

export default function PersonnalInformation({
  handleChange,
  paymentForm,
  isSubmitting,
}: PersonnalInformationProps) {
  return (
    <Card variant="primary" className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">
        Informations Personnelles
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            value={paymentForm.firstName}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            value={paymentForm.lastName}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={paymentForm.email}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={paymentForm.phone}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
    </Card>
  );
}
