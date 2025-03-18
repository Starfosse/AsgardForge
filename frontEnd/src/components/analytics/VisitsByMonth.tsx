import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface VisitsByMonth {
  month: string;
  visits: number;
}

export default function VisitsByMonth() {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];
  const fakeData: VisitsByMonth[] = months.map((month) => ({
    month: month,
    visits: Math.floor(Math.random() * 10000),
  }));

  return (
    <DashBoardAnalytics className="h-[300px] col-span-1 overflow-x-auto whitespace-nowrap">
      <h2 className="font-semibold text-white px-4 pb-4">Visites par mois</h2>
      <ResponsiveContainer width="100%">
        <LineChart data={fakeData} className="p-2">
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="natural"
            dataKey="visits"
            stroke="#B2B4BA"
            strokeWidth={3}
            dot={{ fill: "#5A8DEE", r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
