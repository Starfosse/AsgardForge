import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRandomFakeData } from "./SalesByMonth";

interface SalesByYearsByMonth {
  month: string;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
}

export default function SalesByYear() {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];
  const fakeSalesByYearsByMonth: SalesByYearsByMonth[] = months.map(
    (month) => ({
      month: month,
      "2021": getRandomFakeData(1000),
      "2022": getRandomFakeData(1000),
      "2023": getRandomFakeData(1000),
      "2024": getRandomFakeData(1000),
    })
  );

  return (
    <DashBoardAnalytics className="col-span-1 space-y-4 overflow-x-auto">
      <ResponsiveContainer width="100%" height="100%">
        <>
          <h2 className="font-semibold text-white px-4 pb-4 whitespace-nowrap">
            Comparaison du chiffre d'affaire :
          </h2>
          <BarChart
            width={500}
            height={300}
            data={fakeSalesByYearsByMonth}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="2022" stackId="a" fill="#8884d8" name="Ventes 2022" />
            <Bar dataKey="2023" stackId="a" fill="#82ca9d" name="Ventes 2023" />
          </BarChart>
        </>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
