import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ProcessingStatusChart = ({ stats }) => {
  const data = [
    { name: 'QC Done', value: stats.qcDone, color: 'hsl(var(--status-approved))' },
    { name: 'QC Pending', value: stats.qcPending, color: 'hsl(var(--status-pending))' },
    { name: 'Queued', value: stats.queued, color: 'hsl(var(--status-processing))' },
  ];

  const total = stats.qcDone + stats.qcPending + stats.queued;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              value.toLocaleString(),
              'Applicants',
            ]}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: 'hsl(var(--foreground))' }}>
                {value}: {entry.payload.value.toLocaleString()}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Total: {total.toLocaleString()} applicants picked up
      </p>
    </div>
  );
};

export default ProcessingStatusChart;
