import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export default function CustomersDistribution() {
  const totalAge = 1200;
  const ageData: DataItem[] = [
    {
      name: "18-27 (33%)",
      value: 400,
      color: "#FF6B6B",
      percentage: (414 / totalAge) * 100,
    },
    {
      name: "27-35 (25%)",
      value: 300,
      color: "#4ECDC4",
      percentage: (392 / totalAge) * 100,
    },
    {
      name: "35-49 (25%)",
      value: 300,
      color: "#45B7D1",
      percentage: (268 / totalAge) * 100,
    },
    {
      name: "49+ (17%)",
      value: 200,
      color: "#EAB308",
      percentage: (126 / totalAge) * 100,
    },
  ];

  const genderLegend = [
    { name: "Femmes", color: "#FF9F9F" },
    { name: "Hommes", color: "#4A90E2" },
  ];

  const genderData: DataItem[] = [
    {
      name: "Femmes (18-27)",
      value: 100,
      color: "#FF9F9F",
      percentage: (127 / 400) * 100,
    },
    {
      name: "Hommes (18-27)",
      value: 300,
      color: "#4A90E2",
      percentage: (273 / 400) * 100,
    },
    {
      name: "Femmes (27-35)",
      value: 50,
      color: "#FF9F9F",
      percentage: (54 / 300) * 100,
    },
    {
      name: "Hommes (27-35)",
      value: 250,
      color: "#4A90E2",
      percentage: (246 / 300) * 100,
    },
    {
      name: "Femmes (35-49)",
      value: 50,
      color: "#FF9F9F",
      percentage: (31 / 300) * 100,
    },
    {
      name: "Hommes (35-49)",
      value: 250,
      color: "#4A90E2",
      percentage: (269 / 300) * 100,
    },
    {
      name: "Femmes (49+)",
      value: 20,
      color: "#FF9F9F",
      percentage: (12 / 200) * 100,
    },
    {
      name: "Hommes (49+)",
      value: 180,
      color: "#4A90E2",
      percentage: (198 / 200) * 100,
    },
  ];

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      payload: DataItem;
    }>;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
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

  const legendPayload = [
    ...ageData.map((item) => ({
      value: item.name,
      type: "square" as const,
      color: item.color,
      id: item.name,
    })),
    ...genderLegend.map((item) => ({
      value: item.name,
      type: "square" as const,
      color: item.color,
      id: item.name,
    })),
  ];

  return (
    <DashBoardAnalytics className="h-[350px] whitespace-nowrap overflow-x-auto">
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
            payload={legendPayload}
          />
        </PieChart>
      </ResponsiveContainer>
    </DashBoardAnalytics>
  );
}
