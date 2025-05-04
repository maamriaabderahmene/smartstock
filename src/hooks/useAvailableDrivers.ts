
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Driver {
  driverid: number;
  drivername: string;
  availability: string;
  contactinfo?: string;
  email?: string;
  licensenumber?: string;
  vehicleinfo?: string;
  pendingTasks: number;
}

export const useAvailableDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAvailableDrivers = async () => {
    try {
      setLoading(true);
      // Get available drivers
      const { data: availableDrivers, error: driversError } = await supabase
        .from('drivers')
        .select('*')
        .eq('availability', 'Available');

      if (driversError) throw driversError;

      // For each driver, fetch their pending tasks
      const driversWithTaskCount = await Promise.all(
        availableDrivers.map(async (driver) => {
          const { count, error: tasksError } = await supabase
            .from('drivertasks')
            .select('*', { count: 'exact', head: true })
            .eq('driverid', driver.driverid)
            .eq('taskstatus', 'Pending');

          if (tasksError) {
            console.error('Error fetching driver tasks:', tasksError);
            return {
              ...driver,
              pendingTasks: 0
            };
          }

          return {
            ...driver,
            pendingTasks: count || 0
          };
        })
      );

      setDrivers(driversWithTaskCount);
    } catch (error: any) {
      console.error('Error fetching available drivers:', error);
      toast({
        title: "Failed to load available drivers",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  const refreshDrivers = () => {
    fetchAvailableDrivers();
  };

  return { drivers, loading, refreshDrivers };
};
