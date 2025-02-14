import CustomersActionsRecently from "@/components/analytics/CustomersActionsRecently";
import LastReviews from "@/components/analytics/LastReviews";
import RepartitionByGenderAndByAge from "@/components/analytics/RepartitionByGenderAndByAge";
import SalesByCountry from "@/components/analytics/SalesByCountry";
import SalesByMonth from "@/components/analytics/SalesByMonth";
import SalesByYear from "@/components/analytics/SalesByYear";
import VisitsByMonth from "@/components/analytics/VisitsByMonth";
import WeekDayRushHour from "@/components/analytics/WeekdayRushHour";

export default function Dashboard() {
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
      <div className="grid grid-cols-7 gap-3">
        <div className="col-span-2 flex flex-col gap-4">
          <RepartitionByGenderAndByAge />
          <SalesByCountry />
        </div>
        <WeekDayRushHour />
      </div>
    </div>
  );
}
