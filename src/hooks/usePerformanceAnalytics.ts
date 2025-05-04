
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type PerformanceData = {
  name: string;
  orders: number;
  deliveries: number;
  returns: number;
};

export type DriverPerformance = {
  name: string;
  tasks: number;
  completed: number;
  rating: number;
};

export const usePerformanceAnalytics = (timeRange: 'week' | 'month' | 'quarter' | 'year' = 'week') => {
  const [loading, setLoading] = useState(true);
  const [ordersCount, setOrdersCount] = useState(0);
  const [deliveriesCount, setDeliveriesCount] = useState(0);
  const [avgCompletionTime, setAvgCompletionTime] = useState(0);
  const [weeklyData, setWeeklyData] = useState<PerformanceData[]>([]);
  const [monthlyData, setMonthlyData] = useState<PerformanceData[]>([]);
  const [driverPerformance, setDriverPerformance] = useState<DriverPerformance[]>([]);

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders count from clientorders
      const { count: ordersCount, error: ordersError } = await supabase
        .from('clientorders')
        .select('*', { count: 'exact', head: true })
        .gte('orderdate', getStartDate(timeRange));
        
      if (ordersError) throw ordersError;
      
      setOrdersCount(ordersCount || 0);
      
      // Fetch completed deliveries count
      const { count: deliveriesCount, error: deliveriesError } = await supabase
        .from('clientorders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Validated')
        .gte('orderdate', getStartDate(timeRange));
        
      if (deliveriesError) throw deliveriesError;
      
      setDeliveriesCount(deliveriesCount || 0);
      
      // Set average completion time (mock data for now)
      setAvgCompletionTime(parseFloat((Math.random() * 2 + 3).toFixed(1)));
      
      // Fetch driver performance
      const { data: drivers, error: driversError } = await supabase
        .from('drivers')
        .select('driverid, drivername');
        
      if (driversError) throw driversError;
      
      if (drivers && drivers.length > 0) {
        const driverPerformancePromises = drivers.map(async (driver) => {
          // Fetch driver's tasks
          const { count: tasksCount } = await supabase
            .from('drivertasks')
            .select('taskid', { count: 'exact', head: true })
            .eq('driverid', driver.driverid);
            
          // Fetch driver's completed tasks
          const { count: completedCount } = await supabase
            .from('drivertasks')
            .select('taskid', { count: 'exact', head: true })
            .eq('driverid', driver.driverid)
            .eq('taskstatus', 'Completed');
            
          return {
            name: driver.drivername.split(' ')[0] + ' ' + (driver.drivername.split(' ')[1]?.[0] || '') + '.',
            tasks: tasksCount || 0,
            completed: completedCount || 0,
            rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1))
          };
        });
        
        const driverPerformanceData = await Promise.all(driverPerformancePromises);
        setDriverPerformance(driverPerformanceData.filter(d => d.tasks > 0));
      }
      
      // Generate weekly data (mock data for now)
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weeklyDataArray: PerformanceData[] = weekDays.map(day => {
        const orders = Math.floor(Math.random() * 20) + 5;
        const deliveries = Math.floor(orders * 0.8);
        return {
          name: day,
          orders,
          deliveries,
          returns: Math.floor(Math.random() * 3)
        };
      });
      setWeeklyData(weeklyDataArray);
      
      // Generate monthly data (mock data for now)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const monthlyDataArray: PerformanceData[] = months.map(month => {
        const orders = Math.floor(Math.random() * 50) + 100;
        const deliveries = Math.floor(orders * 0.85);
        return {
          name: month,
          orders,
          deliveries,
          returns: Math.floor(Math.random() * 15)
        };
      });
      setMonthlyData(monthlyDataArray);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      toast.error('Failed to load performance data');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to get start date based on time range
  const getStartDate = (range: string): string => {
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }
    
    return startDate.toISOString();
  };

  // Initial data fetch
  useEffect(() => {
    fetchPerformanceData();
  }, [timeRange]);

  return {
    loading,
    ordersCount,
    deliveriesCount,
    avgCompletionTime,
    weeklyData,
    monthlyData,
    driverPerformance,
    fetchPerformanceData
  };
};
