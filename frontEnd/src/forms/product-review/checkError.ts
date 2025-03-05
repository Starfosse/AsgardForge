import { ReviewsCustomers } from "@/pages/client/Product";
import { ProductReview } from "./ProductReviewForm";
import { Customer } from "@/contexts/AuthContext";

interface checkErrorProps {
  customer: Customer | null;
  formData: ProductReview;
  reviewsCustomers: ReviewsCustomers[];
  setStatus: React.Dispatch<
    React.SetStateAction<{
      error: boolean;
      message: string;
      submitted: boolean;
    }>
  >;
}

export default function checkError({
  customer,
  formData,
  reviewsCustomers,
  setStatus,
}: checkErrorProps) {
  const listIdCustomer = reviewsCustomers.map((review) => review.customerId);
  if (!customer) {
    setStatus({
      error: true,
      message: "Veuillez vous connecter pour laisser un commentaire",
      submitted: true,
    });
    return true;
  }
  if (listIdCustomer.includes(customer.id)) {
    setStatus({
      error: true,
      message: "Vous avez déjà laissé un commentaire",
      submitted: true,
    });
    return true;
  }
  if (formData.rating === 0 || formData.review === "") {
    setStatus({
      error: true,
      message: "Veuillez remplir tous les champs",
      submitted: false,
    });
    return true;
  }
  return false;
}
