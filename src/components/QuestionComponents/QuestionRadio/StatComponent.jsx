import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { STAT_CHART_COLORS } from "@/constant";

function format(n) {
  return (n * 100).toFixed(2);
}

const StatComponent = ({ stat = [] }) => {
  // count 求和
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((i) => (s += i.count));
    return s;
  }, [stat]);

  return (
    <div style={{ width: "300px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={50} // 饼图的直径
            fill="#8884d8"
            label={(i) => `${i.name}: ${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_CHART_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
