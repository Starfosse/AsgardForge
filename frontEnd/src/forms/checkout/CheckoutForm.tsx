import { OrderCommandForm } from "@/pages/client/Checkout";
import DeliveryAdress from "./DeliveryAdress";
import PaymentInformation from "./PaymentInformation";
import PersonnalInformation from "./PersonnalInformation";

interface CheckoutFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommandForm;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({
  handleChange,
  paymentForm,
  handleSubmit,
  isSubmitting,
}: CheckoutFormProps) {
  return (
    <div className="md:col-span-2">
      <form id="checkoutForm" onSubmit={handleSubmit} className="space-y-6">
        <PersonnalInformation
          handleChange={handleChange}
          paymentForm={paymentForm}
          isSubmitting={isSubmitting}
        />
        <DeliveryAdress
          handleChange={handleChange}
          paymentForm={paymentForm}
          isSubmitting={isSubmitting}
        />
        <PaymentInformation />
      </form>
    </div>
  );
}
