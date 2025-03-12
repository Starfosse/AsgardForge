import { Customer } from "@/contexts/AuthContext";

interface PersonnalInformationProps {
  formData: Customer;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  isSubmitting: boolean;
}

export default function PersonnalInformation({
  formData,
  handleChange,
  isEditing,
  isSubmitting,
}: PersonnalInformationProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-stone-700 mb-2">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={!isEditing || isSubmitting}
            required
          />
        </div>
        <div>
          <label className="block text-stone-700 mb-2">Nom</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={!isEditing || isSubmitting}
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-stone-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={!isEditing || isSubmitting}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-stone-700 mb-2">Téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={!isEditing || isSubmitting}
        />
      </div>
    </>
  );
}
