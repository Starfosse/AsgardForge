import { Customer, useAuth } from "@/contexts/AuthContext";
import { Check, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import PersonnalInformation from "./PersonnalInformation";
import DeliveryAdress from "./DeliveryAdress";
import { customerService } from "@/services/api";

export default function ProfileForm() {
  const { customer, updateCustomerData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    success: false,
    message: "",
    isSubmitting: false,
  });
  const [formData, setFormData] = useState<Customer>({
    id: 0,
    googleId: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id || 0,
        googleId: customer.googleId,
        lastName: customer.lastName || "",
        firstName: customer.firstName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        city: customer.city || "",
        postalCode: customer.postalCode || "",
      });
    }
  }, [customer]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus((prev) => ({ ...prev, isSubmitting: true }));
      await customerService.updateProfile(formData);
      updateCustomerData(formData);
      setStatus({
        error: false,
        success: true,
        message: "Votre profil a été mis à jour avec succès",
        isSubmitting: false,
      });
      setIsEditing(false);
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false, message: "" }));
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus({
        error: true,
        success: false,
        message:
          "Une erreur s'est produite lors de la mise à jour de votre profil",
        isSubmitting: false,
      });
    }
  };
  return (
    <div className="bg-stone-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-800 flex items-center justify-center">
          <User className="mr-4 text-amber-700" /> Mon Profil
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {status.error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-700 rounded">
              {status.message}
            </div>
          )}
          {status.success && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 rounded flex items-center">
              <Check className="mr-2" />
              {status.message}
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-stone-800">
              Informations personnelles
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg transition ${
                isEditing
                  ? "bg-stone-200 text-stone-800"
                  : "bg-amber-700 text-white hover:bg-amber-600"
              }`}
            >
              {isEditing ? "Annuler" : "Modifier"}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <PersonnalInformation
              formData={formData}
              handleChange={handleChange}
              isEditing={isEditing}
              isSubmitting={status.isSubmitting}
            />
            <h3 className="text-xl font-semibold text-stone-800 mb-4 mt-8 pb-2 border-b border-stone-200">
              Adresse de livraison
            </h3>
            <DeliveryAdress
              formData={formData}
              handleChange={handleChange}
              isEditing={isEditing}
              isSubmitting={status.isSubmitting}
            />
            {isEditing && (
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="flex items-center bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition"
                  disabled={status.isSubmitting}
                >
                  <Save className="mr-2" />
                  {status.isSubmitting
                    ? "Enregistrement..."
                    : "Enregistrer les modifications"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
