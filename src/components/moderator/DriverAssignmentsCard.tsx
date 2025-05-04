
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Truck, Loader2 } from 'lucide-react';
import { useAvailableDrivers } from '@/hooks/useAvailableDrivers';
import { useNavigate } from 'react-router-dom';

export const DriverAssignmentsCard = () => {
  const { drivers, loading } = useAvailableDrivers();
  const navigate = useNavigate();
  
  // Only show up to 3 drivers on the dashboard
  const displayedDrivers = drivers.slice(0, 3);
  const hasMoreDrivers = drivers.length > 3;

  return (
    <CustomCard variant="elevated" className="col-span-2">
      <div className="flex justify-between items-center m-4">
        <h3 className="text-lg font-semibold">Driver Assignments</h3>
        {hasMoreDrivers && (
          <button 
            className="text-sm text-wms-accent hover:underline"
            onClick={() => navigate('/moderator/drivers')}
          >
            View all ({drivers.length})
          </button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
        </div>
      ) : displayedDrivers.length > 0 ? (
        <div className="space-y-4 p-4">
          {displayedDrivers.map((driver) => (
            <div key={driver.driverid} className="flex items-center justify-between p-4 bg-wms-50 rounded-md">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-wms-accent/10 rounded-md">
                  <Truck className="h-5 w-5 text-wms-accent" />
                </div>
                <div>
                  <p className="font-medium">{driver.drivername}</p>
                  <p className="text-sm text-wms-600">{driver.pendingTasks} pending tasks</p>
                </div>
              </div>
              <button 
                className="text-sm text-wms-accent hover:underline"
                onClick={() => navigate('/moderator/drivers')}
              >
                Assign Task
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <Truck className="h-12 w-12 text-wms-500/50 mb-2" />
          <p className="text-lg font-medium text-wms-500">No drivers available</p>
          <p className="text-sm text-wms-400">There are no drivers available.</p>
        </div>
      )}
    </CustomCard>
  );
};
