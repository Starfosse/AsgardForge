import { useAuth } from "@/contexts/AuthContext";
import { productsService } from "@/services/api";
import { apiClient } from "@/services/api/client";
import { Star } from "lucide-react";
import { useState } from "react";

interface ProductReview {
  customerId: number | undefined;
  rating: number;
  comment: string;
}

export default function ProductReviewForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductReview>({
    customerId: user?.id,
    rating: 0,
    comment: "",
  });
  const [status, setStatus] = useState({
    error: false,
    message: "",
    submitted: false,
  });
  const [reviewStars, setReviewStars] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setStatus({ error: false, message: "", submitted: false });
      const response = productsService.addReview(formData);
      setStatus({
        error: false,
        message: "Commentaire envoyé avec succès",
        submitted: true,
      });
    } catch (error) {
      setStatus({
        error: true,
        message: "Erreur lors de l'envoi du commentaire",
        submitted: true,
      });
    } finally {
      setFormData({ customerId: user?.id, rating: 0, comment: "" });
    }
  };
  const isFormValid = formData.rating === 0 && formData.comment === "" && !user;
  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-4 text-stone-800">
          Ecrire un avis :{" "}
        </h3>
        <form>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4 items-center justify-center">
              <label htmlFor="rating" className="text-gray-800 -mt-4">
                Note :
              </label>

              <div
                className="flex space-x-1"
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
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full h-10 border border-gray-300 rounded-md px-4 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`${
                !isFormValid ? "bg-gray-400" : "bg-gray-800"
              } text-white px-6 py-2 rounded-md`}
              disabled={!isFormValid || status.submitted}
            >
              {user ? <span>Envoyer</span> : <span>Connectez-vous</span>}
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
