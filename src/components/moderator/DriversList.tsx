
import { User, Loader2, Star } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';
import { Driver } from '@/hooks/useDriverTaskManagement';

interface DriversListProps {
  drivers: Driver[];
  loading: boolean;
}

export const DriversList = ({ drivers, loading }: DriversListProps) => {
  return (
    <CustomCard variant="elevated" className="lg:col-span-1">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-wms-accent" />
          Available Drivers
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
          </div>
        ) : drivers.length > 0 ? (
          <div className="space-y-3">
            {drivers.map(driver => (
              <div 
                key={driver.id}
                className={`p-3 rounded-lg border ${driver.available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-wms-600">
                      <span>{driver.currentTasks} active tasks</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {driver.available ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Available</span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">Busy</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <User className="h-12 w-12 text-wms-500/50 mb-2" />
            <p className="text-lg font-medium text-wms-500">No drivers found</p>
            <p className="text-sm text-wms-400">There are no drivers in the system.</p>
          </div>
        )}
      </div>
    </CustomCard>
  );
};
