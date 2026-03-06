import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({
  data = [],
  dataKey = "value",
  nameKey = "name",
  color = "#3b82f6",
  horizontal = false,
}) => {
  return (
    <div className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{
            top: 10,
            right: 20,
            left: horizontal ? 30 : 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {horizontal ? (
            <>
              <XAxis
                type="number"
                allowDecimals={false}
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey={nameKey}
                width={100}
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={nameKey}
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
            </>
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />

          <Bar dataKey={dataKey} fill={color} radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
