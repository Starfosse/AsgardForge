import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getRandomFakeData } from "./SalesByMonth";

interface CustomerActionData {
  point: number;
  "Ajouter au panier"?: number;
  "Passage en caisse"?: number;
  Acheter?: number;
}

const CustomersActionsRecently = () => {
  const actionData: CustomerActionData[] = [
    {
      point: 0,
    },
    {
      point: 1,
      "Ajouter au panier": 0,
    },
    {
      point: 2,
      "Ajouter au panier": getRandomFakeData(15),
    },
    {
      point: 3,
      "Ajouter au panier": 0,
    },
    {
      point: 4,
      "Passage en caisse": 0,
    },
    {
      point: 5,
      "Passage en caisse": getRandomFakeData(10),
    },
    {
      point: 6,
      "Passage en caisse": 0,
    },
    {
      point: 7,
      Acheter: 0,
    },
    {
      point: 8,
      Acheter: getRandomFakeData(5),
    },
    {
      point: 9,
      Acheter: 0,
    },
    {
      point: 10,
    },
  ];
  return (
    <DashBoardAnalytics className="h-[300px] col-span-1 flex flex-col space-y-4 overflow-x-auto whitespace-nowrap">
      <h2 className="font-semibold text-white">
        Actions récentes des clients (10mn)
      </h2>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={actionData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="point" hide />
            <YAxis />
            <Legend />
            <Area
              type="basis"
              dataKey="Ajouter au panier"
              stroke="#8884d8"
              fill="#8884d8"
              strokeWidth={2}
              dot={false}
              name="Ajouter au panier"
              fillOpacity={0.2}
            />
            <Area
              type="basis"
              dataKey="Passage en caisse"
              stroke="#82ca9d"
              fill="#82ca9d"
              strokeWidth={2}
              dot={false}
              name="Passage en caisse"
              fillOpacity={0.2}
            />
            <Area
              type="basis"
              dataKey="Acheter"
              stroke="#ffc658"
              fill="#ffc658"
              strokeWidth={2}
              dot={false}
              name="Acheter"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashBoardAnalytics>
  );
};

export default CustomersActionsRecently;
