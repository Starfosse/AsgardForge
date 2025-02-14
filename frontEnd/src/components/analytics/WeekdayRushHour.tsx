import React from "react";
import DashBoardAnalytics from "@/wrapper/DashBoardAnalytics";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

interface WeekDayRushHourData {
  day: string;
  hours: {
    hour: number;
    customers: number;
  }[];
}

const WeekDayRushHour = () => {
  const fakeData: WeekDayRushHourData[] = [
    {
      day: "Lundi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Mardi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Mercredi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Jeudi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Vendredi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Samedi",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
    {
      day: "Dimanche",
      hours: Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        customers: Math.floor(Math.random() * 10),
      })),
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
          <p className="text-white">
            {`${payload[0].payload.hour}h: ${payload[0].value} clients`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashBoardAnalytics className="h-[665px] col-span-5 flex flex-col space-y-4">
      <h2 className="font-semibold text-white">Heures d'affluence :</h2>
      <div className="flex-1 flex flex-col space-y-2">
        {fakeData.map((dayData) => (
          <div key={dayData.day} className="h-16 flex items-center">
            <span className="text-gray-300 w-20">{dayData.day}</span>
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 10,
                    right: 10,
                    bottom: 0,
                    left: 0,
                  }}
                >
                  <XAxis
                    type="number"
                    dataKey="hour"
                    domain={[8, 19]}
                    tick={{ fontSize: 10, fill: "#9CA3AF" }}
                    ticks={[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
                  />
                  <YAxis type="number" dataKey="customers" hide />
                  <ZAxis type="number" range={[50, 400]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter data={dayData.hours} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </DashBoardAnalytics>
  );
};

export default WeekDayRushHour;
