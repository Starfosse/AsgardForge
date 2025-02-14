import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface SalesByCountryData {
  country: string;
  sales: number;
}
export default function SalesByCountry() {
  const fakeData: SalesByCountryData[] = [
    {
      country: "France",
      sales: Math.floor(Math.random() * 1000),
    },
    {
      country: "Allemagne",
      sales: Math.floor(Math.random() * 1000),
    },
    {
      country: "Italie",
      sales: Math.floor(Math.random() * 1000),
    },
    {
      country: "Espagne",
      sales: Math.floor(Math.random() * 1000),
    },
    {
      country: "Pays-Bas",
      sales: Math.floor(Math.random() * 1000),
    },
  ];
  return (
    <DashBoardAnalytics className="h-[300px] flex flex-col space-y-4">
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
