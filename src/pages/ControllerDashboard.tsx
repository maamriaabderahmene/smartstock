
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FileCheck, FileSearch, Search, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ControllerDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const pendingInspections = [
    {
      id: 'ins-001',
      merchandise: 'Truck Tires',
      quantity: 20,
      operationType: 'Stocking',
      zone: 'B15',
      emplacement: 'E005',
      urgency: 'High'
    },
    {
      id: 'ins-002',
      merchandise: 'Car Batteries',
      quantity: 30,
      operationType: 'Destocking',
      zone: 'A07',
      emplacement: 'E022',
      urgency: 'Medium'
    },
    {
      id: 'ins-003',
      merchandise: 'Engine Oil',
      quantity: 50,
      operationType: 'Stocking',
      zone: 'C12',
      emplacement: 'E014',
      urgency: 'Low'
    }
  ];

  const recentActivity = [
    {
      id: 'act-001',
      description: 'Inspection completed',
      merchandise: 'Laptop Boxes',
      time: '15 minutes ago',
      result: 'Accepted'
    },
    {
      id: 'act-002',
      description: 'New inspection assigned',
      merchandise: 'Truck Tires',
      time: '45 minutes ago',
      result: 'Pending'
    },
    {
      id: 'act-003',
      description: 'Inspection feedback',
      merchandise: 'Clothing Packages',
      time: '2 hours ago',
      result: 'Minor Issues'
    }
  ];

  const handleStartInspection = (inspection) => {
    toast({
      title: "Inspection Started",
      description: `You've started the inspection for ${inspection.merchandise}`,
    });
    navigate('/controller/inspections', { state: { activeInspection: inspection } });
  };

  return (
    <DashboardLayout title="Controller Dashboard" dashboardType="controller">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomCard variant="elevated" className="bg-wms-accent/10">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSearch className="h-5 w-5 text-wms-accent" />
                  <h3 className="text-lg font-semibold">Pending Inspections</h3>
                </div>
                <span className="bg-wms-accent text-white text-sm font-medium px-2.5 py-0.5 rounded-full">{pendingInspections.length}</span>
              </div>
              <p className="text-wms-600 mt-2">Awaiting your review</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-green-50">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Completed Today</h3>
                </div>
                <span className="bg-green-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">5</span>
              </div>
              <p className="text-wms-600 mt-2">Successfully completed inspections</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-yellow-50">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold">Status</h3>
                </div>
                <span className="bg-green-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">Available</span>
              </div>
              <p className="text-wms-600 mt-2">Ready for new inspections</p>
            </div>
          </CustomCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CustomCard variant="elevated" className="lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pending Inspections</h3>
              <div className="space-y-4">
                {pendingInspections.map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-4 bg-wms-50 rounded-md border border-wms-100">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-md ${inspection.operationType === 'Stocking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {inspection.operationType === 'Stocking' ? 'STOCKING' : 'DESTOCKING'}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inspection.urgency === 'High' ? 'bg-red-100 text-red-700' : 
                          inspection.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {inspection.urgency}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium">{inspection.merchandise}</p>
                        <p className="text-sm text-wms-600">Quantity: {inspection.quantity} • Zone: {inspection.zone} • Spot: {inspection.emplacement}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-4"
                      onClick={() => handleStartInspection(inspection)}
                    >
                      Start Inspection
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>

          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Calendar</h3>
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </div>
          </CustomCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      activity.result === 'Accepted' ? 'bg-green-100' : 
                      activity.result === 'Pending' ? 'bg-blue-100' : 
                      'bg-yellow-100'
                    }`}>
                      {activity.result === 'Accepted' ? (
                        <FileCheck className={`h-5 w-5 ${activity.result === 'Accepted' ? 'text-green-600' : 'text-yellow-600'}`} />
                      ) : activity.result === 'Pending' ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <FileSearch className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-wms-600">{activity.merchandise} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>

          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Urgent Inspection Required</p>
                    <p className="text-sm text-wms-600">Truck Tires in Zone B15 • 10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New Inspection Assigned</p>
                    <p className="text-sm text-wms-600">Car Batteries in Zone A07 • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Bell className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Inspection Approved</p>
                    <p className="text-sm text-wms-600">Your inspection has been approved • Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </CustomCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ControllerDashboard;
