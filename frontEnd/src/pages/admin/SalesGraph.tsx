import {
  ArrowDown01,
  ArrowDown10Icon,
  ArrowUp01Icon,
  ArrowUp10Icon,
  ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasing,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesDataByCategory {
  month: string;
  weapons: number;
  electronics: number;
  clothing: number;
  books: number;
}

export default function SalesGraph() {
  const fakeData: SalesDataByCategory[] = [
    {
      month: "Février",
      weapons: 3000,
      electronics: 1398,
      clothing: 2210,
      books: 2210,
    },
    {
      month: "Mars",
      weapons: 2000,
      electronics: 9800,
      clothing: 2290,
      books: 2290,
    },
    {
      month: "Avril",
      weapons: 2780,
      electronics: 3908,
      clothing: 2000,
      books: 2000,
    },
    {
      month: "Mai",
      weapons: 1890,
      electronics: 4800,
      clothing: 2181,
      books: 2181,
    },
    {
      month: "Juin",
      weapons: 2390,
      electronics: 3800,
      clothing: 2500,
      books: 2500,
    },
    {
      month: "Juillet",
      weapons: 3490,
      electronics: 4300,
      clothing: 2100,
      books: 2100,
    },
  ];

  const getTotalSalesByCategory = (category: string) => {
    return fakeData.reduce((acc, curr) => acc + curr[category], 0);
  };

  const getGrowthRate = (category: string) => {
    return (
      ((fakeData[fakeData.length - 1][category] - fakeData[0][category]) /
        fakeData[0][category]) *
      100
    ).toFixed(2);
  };

  return (
    <div className="w-full h-[300px] divide-x divide-gray-200 flex flex-row space-x-4 ">
      <ResponsiveContainer className="flex-1">
        <LineChart
          data={fakeData}
          margin={{
            top: 5,
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
          <Line dataKey="weapons" stroke="#8884d8" strokeWidth={2} />
          <Line dataKey="electronics" stroke="#82ca9d" strokeWidth={2} />
          <Line dataKey="clothing" stroke="#ffc658" strokeWidth={2} />
          <Line dataKey="books" stroke="#ff8042" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex flex-col justify-center space-y-4 pl-10 text-gray-500 w-64">
        <h2 className="font-semibold text-white px-4">Sales Overview</h2>
        <div className="flex flex-col space-y-2 ">
          <div className="px-2 flex flex-row justify-between items-center border-t border-gray-200 pt-2 ">
            <div className="flex flex-col ">
              <h3 className="text-gray-300">Weapons</h3>
              <p>{getTotalSalesByCategory("weapons")}</p>
            </div>
            <span className="flex flex-row items-center">
              {Number(getGrowthRate("weapons")) > 0 ? (
                <ChartNoAxesColumnIncreasing className="text-green-300" />
              ) : (
                <ChartNoAxesColumnDecreasing className="text-red-300" />
              )}
              {getGrowthRate("weapons")} %
            </span>
          </div>
          <div className="px-2 flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-gray-300">Ipod</h3>
              <p>2000</p>
            </div>
            <span>200</span>
          </div>
          <div className="px-2 flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-gray-300">Ipod</h3>
              <p>2000</p>
            </div>
            <span>200</span>
          </div>
          <div className=" px-2 flex flex-row justify-between items-center border-t border-gray-200 pt-2">
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">Total Sales</h3>
              <p>2000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//par catégorie ou par produit de catégorie
