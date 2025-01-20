import ProductsList from "@/components/ProductsList";
import ProductForm from "@/forms/product/ProductForm";

export default function DashBoardProduct() {
  return (
    <div className="w-full bg-[#272E48] rounded-sm p-8">
      <ProductsList />
      {/* <ProductForm /> */}
    </div>
  );
}
