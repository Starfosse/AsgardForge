import { Customer } from "@/contexts/AuthContext";
import { Star } from "lucide-react";
import { useState } from "react";

export interface ProductReview {
  id?: number;
  customerId?: number;
  customerName?: string | undefined;
  rating: number;
  review: string;
  created_at?: string;
}

interface ProductReviewFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: ProductReview;
  setFormData: React.Dispatch<React.SetStateAction<ProductReview>>;
  status: {
    error: boolean;
    message: string;
    submitted: boolean;
  };
  customer: Customer | null;
}

export default function ProductReviewForm({
  handleSubmit,
  formData,
  setFormData,
  status,
  customer,
}: ProductReviewFormProps) {
  const [reviewStars, setReviewStars] = useState(0);
  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-stone-800">
          Ecrire un avis :{" "}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4 items-end">
              <label htmlFor="rating" className="text-gray-800 -mt-4">
                Note :
              </label>
              <div
                className="flex space-x-1 "
                onMouseLeave={() => setReviewStars(formData.rating)}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`text-yellow-500 ${
                      i < reviewStars ? "fill-current" : ""
                    } `}
                    onMouseEnter={() => setReviewStars(i + 1)}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                  />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="text-gray-800">
                Commentaire :
              </label>
              <textarea
                name="comment"
                id="comment"
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                className="w-full h-20 border border-gray-300 rounded-md px-4 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`${
                status.submitted ? "bg-gray-400" : "bg-gray-800"
              } text-white px-6 py-2 rounded-md`}
              disabled={status.submitted}
            >
              {customer ? <span>Envoyer</span> : <span>Connectez-vous</span>}
            </button>
          </div>
          {status.error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
