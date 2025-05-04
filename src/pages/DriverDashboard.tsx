
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import { CustomCard } from '@/components/ui/custom-card';
import { Package, MapPin, Clock } from 'lucide-react';

const DriverDashboard = () => {
  return (
    <DashboardLayout title="Driver Dashboard" dashboardType="driver">
      <div className="space-y-6">
        <OverviewCards dashboardType="driver" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomCard variant="elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Tasks</h3>
              <span className="text-sm text-wms-600">3 tasks pending</span>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((task) => (
                <div key={task} className="border border-wms-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-wms-accent/10 rounded-md">
                        <Package className="h-5 w-5 text-wms-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">Task #{task.toString().padStart(4, '0')}</h4>
                        <p className="text-sm text-wms-600">Stocking Operation</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Pending
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-wms-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      Zone A12, Rack 3
                    </div>
                    <div className="flex items-center text-sm text-wms-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Due in 2 hours
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full py-2 px-4 bg-wms-accent text-white rounded-md hover:bg-wms-accent-dark transition-colors">
                      Start Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CustomCard>

          <div className="space-y-6">
            <CustomCard variant="elevated">
              <h3 className="text-lg font-semibold mb-4">Task Scanner</h3>
              <div className="aspect-video bg-wms-50 rounded-lg flex items-center justify-center">
                <p className="text-wms-600">Scan Clark Code to start task</p>
              </div>
            </CustomCard>

            <CustomCard variant="elevated">
              <h3 className="text-lg font-semibold mb-4">Today's Route</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((stop) => (
                  <div key={stop} className="flex items-center space-x-3 p-3 bg-wms-50 rounded-md">
                    <div className="flex-shrink-0 w-8 h-8 bg-wms-accent/10 rounded-full flex items-center justify-center text-wms-accent font-medium">
                      {stop}
                    </div>
                    <div>
                      <p className="font-medium">Zone {String.fromCharCode(64 + stop)}</p>
                      <p className="text-sm text-wms-600">2 tasks scheduled</p>
                    </div>
                  </div>
                ))}
              </div>
            </CustomCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
