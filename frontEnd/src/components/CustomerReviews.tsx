import ProductReviewForm from "@/forms/productReview/productReviewForm";
import { Star } from "lucide-react";

interface ReviewsCustomers {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
}

export default function CustomerReviews() {
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
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <ProductReviewForm />
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
      </div>
    </div>
  );
}
