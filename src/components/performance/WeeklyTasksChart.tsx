
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomCard } from '@/components/ui/custom-card';

interface WeeklyTasksChartProps {
  data: Array<{
    day: string;
    tasks: number;
  }>;
}

export const WeeklyTasksChart = ({ data }: WeeklyTasksChartProps) => {
  return (
    <CustomCard variant="elevated" className="h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Weekly Task Completion</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CustomCard>
  );
};
