import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { getRandomFakeData } from "./SalesByMonth";

interface SalesByCountryData {
  country: string;
  sales: number;
}
export default function SalesByCountry() {
  const fakeData: SalesByCountryData[] = [
    {
      country: "France",
      sales: getRandomFakeData(10000),
    },
    {
      country: "Allemagne",
      sales: getRandomFakeData(10000),
    },
    {
      country: "Italie",
      sales: getRandomFakeData(10000),
    },
    {
      country: "Espagne",
      sales: getRandomFakeData(10000),
    },
    {
      country: "Pays-Bas",
      sales: getRandomFakeData(10000),
    },
  ];
  return (
    <DashBoardAnalytics className="h-[300px] flex flex-col space-y-4 whitespace-nowrap overflow-x-auto">
      <h2 className="font-semibold text-white">Ventes par pays :</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={fakeData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="country" />
          <PolarRadiusAxis />
          <Radar
            name="Ventes"
            dataKey="sales"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
