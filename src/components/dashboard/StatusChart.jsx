import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const StatusChart = ({ stats }) => {
  const data = [
    {
      name: "Approved",
      value: stats.approved,
      color: "hsl(142, 71%, 45%)",
    },
    {
      name: "Pending",
      value: stats.pendingReview,
      color: "hsl(38, 92%, 50%)",
    },
    {
      name: "Rejected",
      value: stats.rejected,
      color: "hsl(0, 84%, 60%)",
    },
    {
      name: "Processing",
      value:
        stats.totalApplicants -
        stats.approved -
        stats.pendingReview -
        stats.rejected,
      color: "hsl(221, 83%, 53%)",
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                strokeWidth={0}
              />
            ))}
          </Pie>

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-card p-3 shadow-lg">
                    <p className="text-sm font-medium">
                      {payload[0].name}
                    </p>
                    <p className="text-lg font-bold">
                      {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-muted-foreground">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
