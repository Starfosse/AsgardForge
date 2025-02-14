import CustomersActionsRecently from "@/components/analytics/CustomersActionsRecently";
import LastReviews from "@/components/analytics/LastReviews";
import RepartitionByGenderAndByAge from "@/components/analytics/RepartitionByGenderAndByAge";
import SalesByMonth from "@/components/analytics/SalesByMonth";
import SalesByYear from "@/components/analytics/SalesByYear";
import VisitsByMonth from "@/components/analytics/VisitsByMonth";

export default function Analytics() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <SalesByMonth />
        <SalesByYear />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <VisitsByMonth />
        <LastReviews />
        <CustomersActionsRecently />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <RepartitionByGenderAndByAge />
      </div>
    </div>
  );
}
//par catégorie ou par produit de catégorie
//revenu total en barre au fur et à mesure des années
