import CustomerReviews from "@/components/CustomerReviews";
import LoadingScreen from "@/components/LoadingScreen";
import Gallery from "@/components/product/Gallery";
import Presentation from "@/components/product/Presentaton";
import Specifications from "@/components/product/Specifications";
import { productsService, wishlistService } from "@/services/api";
import Product from "@/services/api/products/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface ReviewsCustomers {
  id: number;
  customerId?: number;
  customerName?: string;
  rating: number;
  review: string;
  created_at: string;
}

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ReviewsCustomers[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const response = await productsService.getProduct(parseInt(productId));
        setProduct(response);
      } catch (e) {
        console.error(e);
      }
    };
    const fetchWishlist = async () => {
      if (!productId) return;
      try {
        const res = await wishlistService.isWishlisted(productId);
        if (res === true) setIsWishlisted(true);
        else setIsWishlisted(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      if (!productId) return;
      try {
        setLoadingReviews(true);
        const reviews = await productsService.getReviews(parseInt(productId));
        setReviews(reviews);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchProduct();
    fetchWishlist();
    fetchReviews();
  }, [productId]);

  if (loading) {
    return <LoadingScreen title="produit" />;
  }

  return (
    <div className="bg-stone-100 py-12 flex-grow">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
        {product && product.images && (
          <Gallery
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
        {product && (
          <div>
            <Presentation
              product={product}
              isWishlisted={isWishlisted}
              setIsWishlisted={setIsWishlisted}
              reviews={reviews}
            />
            <Specifications product={product} />
            <CustomerReviews
              loadingReviews={loadingReviews}
              productId={productId}
              reviewsCustomers={reviews}
              setReviews={setReviews}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
