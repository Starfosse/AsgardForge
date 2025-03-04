import { useAuth } from "@/contexts/AuthContext";
import ProductReviewForm, {
  ProductReview,
} from "@/forms/product-review/ProductReviewForm";

import { ReviewsCustomers } from "@/pages/client/Product";
import { productsService } from "@/services/api";
import { Star } from "lucide-react";
import { useState } from "react";

interface CustomerReviewsProps {
  productId: string | undefined;
  reviewsCustomers: ReviewsCustomers[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewsCustomers[]>>;
}
export default function CustomerReviews({
  productId,
  reviewsCustomers,
  setReviews,
}: CustomerReviewsProps) {
  const { customer } = useAuth();
  const [formData, setFormData] = useState<ProductReview>({
    id: 0,
    customerId: customer?.id,
    rating: 0,
    review: "",
    created_at: "",
  });
  const [status, setStatus] = useState({
    error: false,
    message: "",
    submitted: false,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const listIdCustomer = reviewsCustomers.map((review) => review.customerId);
    if (!customer) {
      setStatus({
        error: true,
        message: "Veuillez vous connecter pour laisser un commentaire",
        submitted: true,
      });
      return;
    }
    if (listIdCustomer.includes(customer.id)) {
      setStatus({
        error: true,
        message: "Vous avez déjà laissé un commentaire",
        submitted: true,
      });
      return;
    }
    if (formData.rating === 0 || formData.review === "") {
      setStatus({
        error: true,
        message: "Veuillez remplir tous les champs",
        submitted: true,
      });
      return;
    }
    try {
      setStatus({ error: false, message: "", submitted: false });
      const reviewData = {
        productId: Number(productId),
        customerId: customer!.id,
        rating: formData.rating,
        review: formData.review,
      };
      productsService.addReview(reviewData);
      setStatus({
        error: false,
        message: "Commentaire envoyé avec succès",
        submitted: true,
      });
      setReviews([
        ...reviewsCustomers,
        {
          id: reviewsCustomers.length + 1,
          customerId: customer?.id,
          customerName: customer?.firstName,
          rating: formData.rating,
          review: formData.review,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setStatus({
        error: true,
        message: "Erreur lors de l'envoi du commentaire",
        submitted: true,
      });
    } finally {
      setFormData({ customerId: customer?.id, rating: 0, review: "" });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <ProductReviewForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        status={status}
        customer={customer}
      />
      <h3 className="text-2xl font-semibold mb-4 text-stone-800">
        Avis clients :
      </h3>
      <div>
        {reviewsCustomers.map((review) => (
          <div key={review.id} className="border-b pb-2 flex flex-col">
            <div className="flex justify-between">
              <span className="text-stone-600">{review.customerName}</span>
              <span className="text-stone-600">
                {new Date(review.created_at!).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="font-semibold text-stone-800 flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-current" />
              ))}
            </div>
            <div className="text-stone-800">{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
