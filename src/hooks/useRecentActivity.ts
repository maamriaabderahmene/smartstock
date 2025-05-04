
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Activity {
  id: number;
  title: string;
  timestamp: Date;
  orderid?: number;
  driverId?: number;
  driverName?: string;
  taskType?: string;
}

export const useRecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      
      // Get last hour timestamp
      const lastHour = new Date();
      lastHour.setHours(lastHour.getHours() - 1);
      const lastHourStr = lastHour.toISOString();
      
      // Get recent order status changes
      const { data: statusData, error: statusError } = await supabase
        .from('orderstatus')
        .select('*')
        .gte('statusdate', lastHourStr)
        .order('statusdate', { ascending: false });
        
      if (statusError) throw statusError;
      
      // Get recent driver task completions
      const { data: taskData, error: taskError } = await supabase
        .from('drivertasks')
        .select(`
          taskid,
          tasktype,
          endtime,
          drivers(driverid, drivername)
        `)
        .eq('taskstatus', 'Completed')
        .gte('endtime', lastHourStr)
        .order('endtime', { ascending: false });
        
      if (taskError) throw taskError;

      // Format order status data
      const orderActivities: Activity[] = (statusData || []).map(status => ({
        id: status.orderstatusid,
        title: `Order ${status.status.toLowerCase()}`,
        timestamp: new Date(status.statusdate),
        orderid: status.orderid
      }));
      
      // Format task data
      const taskActivities: Activity[] = (taskData || []).map((task: any) => ({
        id: task.taskid,
        title: `Task ${task.tasktype.toLowerCase()} completed`,
        timestamp: new Date(task.endtime),
        driverId: task.drivers?.driverid,
        driverName: task.drivers?.drivername,
        taskType: task.tasktype
      }));
      
      // Combine and sort
      const allActivities = [...orderActivities, ...taskActivities].sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      );
      
      setActivities(allActivities);
      
    } catch (error: any) {
      console.error('Error fetching recent activity:', error);
      toast({
        title: "Failed to load recent activity",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
    
    // Refresh activity every 5 minutes
    const intervalId = setInterval(fetchRecentActivity, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const refreshActivity = () => {
    fetchRecentActivity();
  };

  return { activities, loading, refreshActivity };
};
