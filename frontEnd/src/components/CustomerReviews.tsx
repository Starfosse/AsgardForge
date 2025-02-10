import { useAuth } from "@/contexts/AuthContext";
import ProductReviewForm, {
  ProductReview,
} from "@/forms/productReview/productReviewForm";
import { ReviewsCustomers } from "@/pages/client/Product";
import { productsService } from "@/services/api";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

// interface ReviewsCustomers {
//   id: number;
//   customerId?: number;
//   customerName?: string;
//   rating: number;
//   comment: string;
// }

interface CustomerReviewsProps {
  reviewsCustomers: ReviewsCustomers[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewsCustomers[]>>;
}
export default function CustomerReviews({
  reviewsCustomers,
  setReviews,
}: CustomerReviewsProps) {
  const fakeReviews: ReviewsCustomers[] = [
    {
      id: 1,
      customerName: "Jean Dupont",
      rating: 4,
      comment: "Super produit, je recommande !",
    },
    {
      id: 2,
      customerName: "Marie Durand",
      rating: 5,
      comment: "Excellent produit, je suis ravie !",
    },
    {
      id: 3,
      customerName: "Paul Martin",
      rating: 3,
      comment: "Produit correct, mais livraison un peu longue.",
    },
  ];

  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductReview>({
    id: 0,
    customerId: user?.id,
    rating: 0,
    comment: "",
  });
  const [status, setStatus] = useState({
    error: false,
    message: "",
    submitted: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const listIdCustomer = reviewsCustomers.map((review) => review.customerId);
    if (listIdCustomer.includes(user?.id)) {
      setStatus({
        error: true,
        message: "Vous avez déjà laissé un commentaire",
        submitted: true,
      });
      return;
    }
    try {
      setStatus({ error: false, message: "", submitted: false });
      const formDataToSend = new FormData();
      formDataToSend.append("customerId", String(user?.id));
      formDataToSend.append("rating", String(formData.rating));
      formDataToSend.append("comment", formData.comment);
      const response = productsService.addReview(formDataToSend);
      setStatus({
        error: false,
        message: "Commentaire envoyé avec succès",
        submitted: true,
      });
      setReviews([
        ...reviewsCustomers,
        {
          id: reviewsCustomers.length + 1,
          customerId: user?.id,
          customerName: user?.firstName,
          rating: formData.rating,
          comment: formData.comment,
        },
      ]);
    } catch (error) {
      setStatus({
        error: true,
        message: "Erreur lors de l'envoi du commentaire", //refuse si déjà un comm
        submitted: true,
      });
    } finally {
      setFormData({ customerId: user?.id, rating: 0, comment: "" });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <ProductReviewForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        status={status}
        user={user}
      />
      <h3 className="text-2xl font-semibold mb-4 text-stone-800">
        Avis clients :
      </h3>
      <div>
        {fakeReviews.map((review) => (
          <div key={review.id} className="border-b pb-2">
            <span className="text-stone-600">{review.customerName}</span>
            <div className="font-semibold text-stone-800 flex">
              {/* {review.rating} / 5 */}
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-current" />
              ))}
            </div>
            <div className="text-stone-800">{review.comment}</div>
          </div>
        ))}
        {/* {
            reviewsCustomers.map((review) => (
              <div key={review.id} className="border-b pb-2">
                <span className="text-stone-600">{review.customerName}</span>
                <div className="font-semibold text-stone-800 flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <div className="text-stone-800">{review.comment}</div>
              </div>
        } */}
      </div>
    </div>
  );
}
