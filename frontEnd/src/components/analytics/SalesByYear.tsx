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

interface SalesByYearsByMonth {
  month: string;
  "2021": number;
  "2022": number;
  "2023": number;
  "2024": number;
}

export default function SalesByYear() {
  const fakeSalesByYearsByMonth: SalesByYearsByMonth[] = [
    {
      month: "Janvier",
      "2021": 4000,
      "2022": 2400,
      "2023": 2400,
      "2024": 2400,
    },
    {
      month: "Février",
      "2021": 3000,
      "2022": 1398,
      "2023": 2210,
      "2024": 2210,
    },
    {
      month: "Mars",
      "2021": 2000,
      "2022": 9800,
      "2023": 2290,
      "2024": 2290,
    },
    {
      month: "Avril",
      "2021": 2780,
      "2022": 3908,
      "2023": 2000,
      "2024": 2000,
    },
    {
      month: "Mai",
      "2021": 1890,
      "2022": 4800,
      "2023": 2181,
      "2024": 2181,
    },
    {
      month: "Juin",
      "2021": 2390,
      "2022": 3800,
      "2023": 2500,
      "2024": 2500,
    },
    {
      month: "Juillet",
      "2021": 3490,
      "2022": 4300,
      "2023": 2100,
      "2024": 2100,
    },
  ];

  return (
    <DashBoardAnalytics className="col-span-1 space-y-4">
      <ResponsiveContainer width="100%" height="100%">
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
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
