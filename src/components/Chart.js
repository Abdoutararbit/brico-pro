import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const Chart = ({ professional }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (professional && professional.managedProjects) {
      const statusCounts = {};

      professional.managedProjects.forEach((project) => {
        statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
      });

      const chartDataValues = Object.entries(statusCounts).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

      setChartData(chartDataValues);
    }
  }, [professional]);

  const COLORS = {
    accepted: "#00CC00",
    canceled: "#FF0000",
    rejected: "#FF5733",
    pending: "#007BFF",
  };

  return (
    <div>
      <p>Répartition du statut des projets gérés</p>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          label={({ name, value }) => `${name} (${value})`}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || "#a9a9a9"}
            />
          ))}
        </Pie>
        <Label value="Managed Projects" position="centerBottom" />
      </PieChart>
    </div>
  );
};

export default Chart;
