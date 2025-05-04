
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { StatsCards } from '@/components/performance/StatsCards';
import { WeeklyTasksChart } from '@/components/performance/WeeklyTasksChart';

const Performance = () => {
  const performanceData = [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 15 },
    { day: 'Wed', tasks: 10 },
    { day: 'Thu', tasks: 18 },
    { day: 'Fri', tasks: 14 },
    { day: 'Sat', tasks: 8 },
    { day: 'Sun', tasks: 6 }
  ];

  const stats = [
    { title: 'Tasks Completed', value: '83', icon: CheckCircle },
    { title: 'Average Time', value: '45m', icon: Clock },
    { title: 'Efficiency Rate', value: '94%', icon: TrendingUp }
  ];

  return (
    <DashboardLayout title="Performance Analytics" dashboardType="driver">
      <div className="space-y-6">
        <StatsCards stats={stats} />
        <WeeklyTasksChart data={performanceData} />
      </div>
    </DashboardLayout>
  );
};

export default Performance;
