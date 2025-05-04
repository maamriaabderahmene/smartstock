
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Package, Clock, CheckCircle } from 'lucide-react';

const AssignedTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Warehouse Stocking',
      location: 'Zone A, Shelf 3',
      deadline: '2 hours',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Package Delivery',
      location: 'Zone B, Dock 2',
      deadline: '3 hours',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Inventory Check',
      location: 'Zone C, Aisle 5',
      deadline: '4 hours',
      status: 'Pending'
    }
  ];

  return (
    <DashboardLayout title="Assigned Tasks" dashboardType="driver">
      <div className="space-y-6">
        {tasks.map((task) => (
          <CustomCard key={task.id} variant="elevated">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-wms-accent/10 rounded-md">
                  <Package className="h-5 w-5 text-wms-accent" />
                </div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-wms-600">{task.location}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {task.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-wms-600">
              <Clock className="h-4 w-4 mr-2" />
              Due in {task.deadline}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center px-4 py-2 bg-wms-accent text-white rounded-md hover:bg-wms-accent/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Task
              </button>
            </div>
          </CustomCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AssignedTasks;
