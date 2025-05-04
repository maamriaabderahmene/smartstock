
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { History as HistoryIcon, Package, Calendar } from 'lucide-react';

const History = () => {
  const completedTasks = [
    {
      id: 1,
      title: 'Warehouse Stocking',
      date: '2025-04-26',
      time: '14:30',
      location: 'Zone A'
    },
    {
      id: 2,
      title: 'Package Delivery',
      date: '2025-04-25',
      time: '11:15',
      location: 'Zone B'
    },
    {
      id: 3,
      title: 'Inventory Check',
      date: '2025-04-24',
      time: '09:45',
      location: 'Zone C'
    }
  ];

  return (
    <DashboardLayout title="Task History" dashboardType="driver">
      <div className="space-y-6">
        <div className="grid gap-6">
          {completedTasks.map((task) => (
            <CustomCard key={task.id} variant="elevated">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-md">
                  <HistoryIcon className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{task.title}</h3>
                    <span className="text-sm text-wms-600">{task.location}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-wms-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {task.date} at {task.time}
                  </div>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;
