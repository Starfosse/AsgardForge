import { useAuth } from "@/contexts/AuthContext";
import checkError from "@/forms/product-review/checkError";
import ProductReviewForm, {
  ProductReview,
} from "@/forms/product-review/ProductReviewForm";
import { formatDate } from "@/lib/formatDate";

import { ReviewsCustomers } from "@/pages/client/Product";
import { productsService } from "@/services/api";
import Card from "@/wrapper/Card";
import { Star } from "lucide-react";
import { useState } from "react";

interface CustomerReviewsProps {
  loadingReviews: boolean;
  productId: string | undefined;
  reviewsCustomers: ReviewsCustomers[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewsCustomers[]>>;
}
export default function CustomerReviews({
  loadingReviews,
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
    if (checkError({ customer, formData, reviewsCustomers, setStatus })) {
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
      console.error("Error sending review:", error);
      setStatus({
        error: true,
        message: "Erreur lors de l'envoi du commentaire",
        submitted: false,
      });
    } finally {
      setFormData({ customerId: customer?.id, rating: 0, review: "" });
    }
  };

  return (
    <Card variant="primary" className="p-6 mt-6">
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
        {loadingReviews && (
          <div className="text-stone-800">Chargement des avis...</div>
        )}
        {!loadingReviews &&
          reviewsCustomers.map((review) => (
            <div key={review.id} className="border-b pb-2 flex flex-col">
              <div className="flex justify-between">
                <span className="text-stone-600">{review.customerName}</span>
                <span className="text-stone-600">
                  {formatDate(review.created_at)}
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
    </Card>
  );
}
