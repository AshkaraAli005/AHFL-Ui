import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '../../components/ui/skeleton';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Users, FileText } from 'lucide-react';

const DailyTrendsChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    dateLabel: format(parseISO(item.date), 'dd/MM/yy'),
  }));

  const commonAxisProps = {
    tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 },
    axisLine: { stroke: 'hsl(var(--border))' },
  };

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
    },
    labelStyle: { color: 'hsl(var(--foreground))' },
  };

  return (
    <Tabs defaultValue="applicants" className="space-y-4">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="applicants" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Applicants
        </TabsTrigger>
        <TabsTrigger value="files" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Files
        </TabsTrigger>
      </TabsList>

      {/* Applicants Tab */}
      <TabsContent value="applicants" className="mt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="dateLabel" {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              <Tooltip {...tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar
                dataKey="applicantsReceived"
                name="Received"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="applicantsPickedUp"
                name="Picked Up"
                fill="hsl(var(--status-approved))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      {/* Files Tab */}
      <TabsContent value="files" className="mt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="dateLabel" {...commonAxisProps} />
              <YAxis {...commonAxisProps} />
              <Tooltip {...tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar
                dataKey="filesReceived"
                name="Received"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="filesPickedUp"
                name="Picked Up"
                fill="hsl(var(--status-approved))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="filesReturned"
                name="Returned to AHFL"
                fill="hsl(var(--accent))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DailyTrendsChart;

