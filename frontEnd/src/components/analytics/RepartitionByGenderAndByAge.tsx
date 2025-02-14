import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

export default function CustomersDistribution() {
  const totalAge = 1200;
  const ageData = [
    {
      name: "18-27 (33%)",
      value: 400,
      color: "#FF6B6B",
      percentage: (400 / totalAge) * 100,
    },
    {
      name: "27-35 (25%)",
      value: 300,
      color: "#4ECDC4",
      percentage: (300 / totalAge) * 100,
    },
    {
      name: "35-49 (25%)",
      value: 300,
      color: "#45B7D1",
      percentage: (300 / totalAge) * 100,
    },
    {
      name: "49+ (17%)",
      value: 200,
      color: "#EAB308",
      percentage: (200 / totalAge) * 100,
    },
  ];

  const genderLegend = [
    { name: "Femmes", color: "#FF9F9F" },
    { name: "Hommes", color: "#4A90E2" },
  ];

  const genderData = [
    {
      name: "Femmes (18-27)",
      value: 100,
      color: "#FF9F9F",
      percentage: (100 / 400) * 100,
    },
    {
      name: "Hommes (18-27)",
      value: 300,
      color: "#4A90E2",
      percentage: (300 / 400) * 100,
    },
    {
      name: "Femmes (27-35)",
      value: 50,
      color: "#FF9F9F",
      percentage: (50 / 300) * 100,
    },
    {
      name: "Hommes (27-35)",
      value: 250,
      color: "#4A90E2",
      percentage: (250 / 300) * 100,
    },
    {
      name: "Femmes (35-49)",
      value: 50,
      color: "#FF9F9F",
      percentage: (50 / 300) * 100,
    },
    {
      name: "Hommes (35-49)",
      value: 250,
      color: "#4A90E2",
      percentage: (250 / 300) * 100,
    },
    {
      name: "Femmes (49+)",
      value: 20,
      color: "#FF9F9F",
      percentage: (20 / 200) * 100,
    },
    {
      name: "Hommes (49+)",
      value: 180,
      color: "#4A90E2",
      percentage: (180 / 200) * 100,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
          <p className="text-white">{`${payload[0].name}: ${
            payload[0].value
          } (${payload[0].payload.percentage.toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-gray-300">{value}</span>;
  };

  return (
    <DashBoardAnalytics className="h-[350px]">
      <h2 className="text-white font-semibold">
        Répartition des clients par âge et sexe :
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ageData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
          >
            {ageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Pie
            data={genderData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={renderColorfulLegendText}
            layout="vertical"
            align="right"
            verticalAlign="middle"
            payload={[
              ...ageData.map((item) => ({
                value: item.name,
                type: "square",
                color: item.color,
              })),
              ...genderLegend.map((item) => ({
                value: item.name,
                type: "square",
                color: item.color,
              })),
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
