import DeliveryAdress from "./DeliveryAdress";
import PersonnalInformation from "./PersonnalInformation";
import PaymentInformation from "./PaymentInformation";
import { OrderCommand } from "@/services/api";

interface CheckoutFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: OrderCommand;
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
        <PaymentInformation
          handleChange={handleChange}
          paymentForm={paymentForm}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
