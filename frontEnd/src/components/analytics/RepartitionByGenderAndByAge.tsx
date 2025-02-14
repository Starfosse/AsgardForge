import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function RepartitionByGenderAndByAge() {
  const data01 = [
    { name: "18-27", value: 400 },
    { name: "27-35", value: 300 },
    { name: "35-49", value: 300 },
    { name: "49+", value: 200 },
  ];
  const data02 = [
    { name: "18-27 | Femmes", value: 100 },
    { name: "18-27 | Hommes", value: 300 },
    { name: "27-35 | Femmes", value: 50 },
    { name: "27-35 | Hommes", value: 250 },
    { name: "35-49 | Femmes", value: 100 },
    { name: "35-49 | Hommes", value: 250 },
    { name: "49+ | Femmes", value: 20 },
    { name: "49+ | Hommes", value: 180 },
  ];
  return (
    <DashBoardAnalytics className="h-[350px] col-span-1">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          />
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
