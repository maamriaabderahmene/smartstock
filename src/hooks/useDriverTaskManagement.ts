
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Task {
  id: number;
  tasktype: string;
  location: string;
  priority: string;
  deadline: string;
  status: string;
  driver_id?: number;
  notes?: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  available: boolean;
  currentTasks: number;
}

export const useDriverTaskManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState({
    drivers: true,
    tasks: true
  });

  const fetchDrivers = async () => {
    try {
      setLoading(prev => ({ ...prev, drivers: true }));

      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .order('driverid', { ascending: true });

      if (error) throw error;

      // Get the current tasks count for each driver
      const driversWithTasksPromises = data.map(async (driver) => {
        const { count } = await supabase
          .from('drivertasks')
          .select('*', { count: 'exact', head: true })
          .eq('driverid', driver.driverid)
          .eq('taskstatus', 'Pending');
          
        return {
          id: driver.driverid.toString(),
          name: driver.drivername,
          rating: 4.5, // This could be calculated from a rating table in the future
          available: driver.availability === 'Available',
          currentTasks: count || 0
        };
      });

      const formattedDrivers: Driver[] = await Promise.all(driversWithTasksPromises);
      setDrivers(formattedDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to load drivers');
    } finally {
      setLoading(prev => ({ ...prev, drivers: false }));
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(prev => ({ ...prev, tasks: true }));
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', 'Pending')
        .order('id', { ascending: true });
        
      if (error) throw error;
      
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  };

  const assignTaskToDriver = async (taskId: number, driverId: string, priority: string, notes: string) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ 
          driver_id: parseInt(driverId),
          priority,
          notes,
          status: "Assigned"
        })
        .eq('id', taskId);

      if (updateError) throw updateError;

      // Also create a record in drivertasks table
      // Fix the type mismatch by ensuring we're using a valid tasktype value
      const { error: driverTaskError } = await supabase
        .from('drivertasks')
        .insert({
          driverid: parseInt(driverId),
          tasktype: 'Stocking', // Changed from 'Delivery' to 'Stocking' which is a valid enum value
          taskstatus: 'Pending',
          notes
        });

      if (driverTaskError) throw driverTaskError;
      
      toast.success('Task assigned successfully');
      
      // Refresh tasks and drivers
      await Promise.all([fetchTasks(), fetchDrivers()]);
      
      return { success: true };
    } catch (error) {
      console.error('Error assigning task:', error);
      toast.error('Failed to assign task');
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchTasks();
  }, []);

  return {
    drivers,
    tasks,
    loading,
    fetchDrivers,
    fetchTasks,
    assignTaskToDriver
  };
};
