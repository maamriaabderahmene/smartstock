
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Calendar, RefreshCcw, Filter, Package, Zap, Clock } from 'lucide-react';
import { useRecentActivity } from '@/hooks/useRecentActivity';

const ActivityLog: React.FC = () => {
  const { activities, loading, refreshActivity } = useRecentActivity();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = filterType === 'all' 
    ? activities 
    : activities.filter(activity => {
        switch (filterType) {
          case 'orders':
            return activity.title.toLowerCase().includes('order');
          case 'tasks':
            return activity.title.toLowerCase().includes('task');
          case 'inspections':
            return activity.title.toLowerCase().includes('inspect');
          default:
            return true;
        }
      });

  const getActivityIcon = (activity: any) => {
    if (activity.title.toLowerCase().includes('task')) {
      return <Zap size={18} className="text-green-500" />;
    } else if (activity.title.toLowerCase().includes('inspection')) {
      return <Clock size={18} className="text-wms-accent" />;
    } else {
      return <Package size={18} className="text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout title="Activity Log" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Recent Activity Log</h2>
          
          <div className="flex items-center gap-2">
            <CustomButton 
              variant="outline" 
              size="sm" 
              onClick={refreshActivity}
              className="flex items-center gap-2"
            >
              <RefreshCcw size={14} />
              Refresh
            </CustomButton>
            
            <select 
              className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-wms-accent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="orders">Orders</option>
              <option value="tasks">Tasks</option>
              <option value="inspections">Inspections</option>
            </select>
            
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 text-sm">
              <Calendar size={14} className="mr-2 text-gray-500" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <CustomCard className="overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-6">Today's Activity</h3>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wms-accent"></div>
              </div>
            ) : filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start p-3 rounded-md border border-gray-100 hover:bg-gray-50">
                    <div className="p-2 rounded-full bg-gray-100 mr-3">
                      {getActivityIcon(activity)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit'
                          })}
                        </p>
                        {activity.driverName && (
                          <p className="text-xs text-gray-500 ml-2">
                            • Driver: {activity.driverName}
                          </p>
                        )}
                        {activity.orderid && (
                          <p className="text-xs text-gray-500 ml-2">
                            • Order: #{activity.orderid}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No activities found</p>
              </div>
            )}
          </div>
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default ActivityLog;
