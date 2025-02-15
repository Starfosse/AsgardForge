import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesDataByCategory {
  month: string;
  weapons: number;
  electronics: number;
  clothing: number;
  books: number;
}

export function getRandomFakeData(range: number) {
  return Math.floor(Math.random() * range);
}

export default function SalesByMonth() {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];

  const fakeData: SalesDataByCategory[] = months.map((month) => ({
    month: month,
    weapons: getRandomFakeData(800),
    electronics: getRandomFakeData(800),
    clothing: getRandomFakeData(800),
    books: getRandomFakeData(800),
  }));

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

  const getTotalSales = () => {
    return fakeData.reduce((acc, curr) => {
      return acc + curr.weapons + curr.electronics + curr.clothing + curr.books;
    }, 0);
  };

  const getTotalSalesGrowthRate = () => {
    return (
      ((getTotalSales() -
        fakeData[0].weapons -
        fakeData[0].electronics -
        fakeData[0].clothing -
        fakeData[0].books) /
        (fakeData[0].weapons +
          fakeData[0].electronics +
          fakeData[0].clothing +
          fakeData[0].books)) *
      100
    ).toFixed(2);
  };
  return (
    <DashBoardAnalytics
      className={
        "col-span-2 divide-x divide-gray-200 flex flex-row space-x-4 whitespace-nowrap"
      }
    >
      <div className="flex-1 flex flex-col min-w-0">
        <h2 className="font-semibold text-white px-4 pb-4">
          Chiffres d'affaires :
        </h2>
        <ResponsiveContainer>
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
      </div>
      <div className="flex flex-col justify-center space-y-4 pl-10 text-gray-500 w-64 overflow-x-auto">
        <h2 className="font-semibold text-white px-4">Aperçu des ventes :</h2>
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
              <h3 className="text-gray-300">Clothing</h3>
              <p>{getTotalSalesByCategory("clothing")}</p>
            </div>
            <span className="flex flex-row items-center">
              {Number(getGrowthRate("clothing")) > 0 ? (
                <ChartNoAxesColumnIncreasing className="text-green-300" />
              ) : (
                <ChartNoAxesColumnDecreasing className="text-red-300" />
              )}
              {getGrowthRate("clothing")} %
            </span>
          </div>
          <div className="px-2 flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-gray-300">Books</h3>
              <p>{getTotalSalesByCategory("books")}</p>
            </div>
            <span className="flex flex-row items-center">
              {Number(getGrowthRate("books")) > 0 ? (
                <ChartNoAxesColumnIncreasing className="text-green-300" />
              ) : (
                <ChartNoAxesColumnDecreasing className="text-red-300" />
              )}
              {getGrowthRate("books")} %
            </span>
          </div>
          <div className=" px-2 flex flex-row justify-between items-end border-t border-gray-200 pt-2">
            <div className="flex flex-col">
              <h3 className="text-gray-300">Ventes totales :</h3>
              <p>{getTotalSales()}</p>
            </div>
            <span className="flex flex-row">
              {Number(getTotalSalesGrowthRate()) > 0 ? (
                <ChartNoAxesColumnIncreasing className="text-green-300" />
              ) : (
                <ChartNoAxesColumnDecreasing className="text-red-300" />
              )}
              {getTotalSalesGrowthRate()} %
            </span>
          </div>
        </div>
      </div>
    </DashBoardAnalytics>
  );
}
