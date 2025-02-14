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
  const fakeData: VisitsByMonth[] = [
    {
      month: "Février",
      visits: 3000,
    },
    {
      month: "Mars",
      visits: 2000,
    },
    {
      month: "Avril",
      visits: 2780,
    },
    {
      month: "Mai",
      visits: 1890,
    },
    {
      month: "Juin",
      visits: 2390,
    },
    {
      month: "Juillet",
      visits: 3490,
    },
  ];
  return (
    <DashBoardAnalytics className="h-[300px] col-span-1">
      <h2 className="font-semibold text-white px-4 pb-4">Visits by Month</h2>
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
