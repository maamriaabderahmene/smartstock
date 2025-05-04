
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Data types for charts
export interface ChartDataItem {
  name: string;
  orders: number;
  deliveries: number;
  returns?: number;
}

export interface DriverPerformance {
  name: string;
  tasks: number;
  completed: number;
  rating: number;
}

// Main hook
export const usePerformanceStats = (timeRange: 'week' | 'month' | 'quarter' | 'year' = 'week') => {
  const [loading, setLoading] = useState(true);
  const [ordersCount, setOrdersCount] = useState(0);
  const [deliveriesCount, setDeliveriesCount] = useState(0);
  const [avgCompletionTime, setAvgCompletionTime] = useState(0);
  const [weeklyData, setWeeklyData] = useState<ChartDataItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartDataItem[]>([]);
  const [driverPerformance, setDriverPerformance] = useState<DriverPerformance[]>([]);
  const { toast } = useToast();

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      
      let timeFilter: Date;
      const now = new Date();
      
      // Calculate the time range
      switch (timeRange) {
        case 'week':
          timeFilter = new Date(now);
          timeFilter.setDate(now.getDate() - 7);
          break;
        case 'month':
          timeFilter = new Date(now);
          timeFilter.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          timeFilter = new Date(now);
          timeFilter.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          timeFilter = new Date(now);
          timeFilter.setFullYear(now.getFullYear() - 1);
          break;
        default:
          timeFilter = new Date(now);
          timeFilter.setDate(now.getDate() - 7);
      }
      
      const timeFilterStr = timeFilter.toISOString();
      
      // Fetch total orders in time period
      const { count: orderCount, error: orderError } = await supabase
        .from('clientorders')
        .select('*', { count: 'exact', head: true })
        .gte('orderdate', timeFilterStr);
        
      if (orderError) throw orderError;
      
      setOrdersCount(orderCount || 0);
      
      // Fetch completed deliveries
      const { count: deliveryCount, error: deliveryError } = await supabase
        .from('drivertasks')
        .select('*', { count: 'exact', head: true })
        .eq('taskstatus', 'Completed')
        .gte('endtime', timeFilterStr);
        
      if (deliveryError) throw deliveryError;
      
      setDeliveriesCount(deliveryCount || 0);
      
      // Calculate average completion time
      const { data: taskTimeData, error: taskTimeError } = await supabase
        .from('drivertasks')
        .select('starttime, endtime')
        .eq('taskstatus', 'Completed')
        .gte('endtime', timeFilterStr);
        
      if (taskTimeError) throw taskTimeError;
      
      if (taskTimeData && taskTimeData.length > 0) {
        let totalHours = 0;
        const completedTasks = taskTimeData.filter(task => task.starttime && task.endtime);
        
        completedTasks.forEach(task => {
          const startTime = new Date(task.starttime);
          const endTime = new Date(task.endtime);
          const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
          totalHours += hours;
        });
        
        setAvgCompletionTime(completedTasks.length > 0 ? 
          parseFloat((totalHours / completedTasks.length).toFixed(1)) : 0);
      }
      
      // Generate weekly data (last 7 days)
      const weeklyChartData: ChartDataItem[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toISOString().split('T')[0];
        
        // Count orders for this day
        const { count: dayOrderCount } = await supabase
          .from('clientorders')
          .select('*', { count: 'exact', head: true })
          .like('orderdate', `${dateStr}%`);
          
        // Count deliveries for this day
        const { count: dayDeliveryCount } = await supabase
          .from('drivertasks')
          .select('*', { count: 'exact', head: true })
          .eq('taskstatus', 'Completed')
          .like('endtime', `${dateStr}%`);
        
        weeklyChartData.push({
          name: dayName,
          orders: dayOrderCount || 0,
          deliveries: dayDeliveryCount || 0
        });
      }
      
      setWeeklyData(weeklyChartData);
      
      // Generate monthly data (last 6 months)
      const monthlyChartData: ChartDataItem[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
        
        // Count orders for this month
        const { count: monthOrderCount } = await supabase
          .from('clientorders')
          .select('*', { count: 'exact', head: true })
          .gte('orderdate', monthStart)
          .lt('orderdate', monthEnd);
          
        // Count deliveries for this month
        const { count: monthDeliveryCount } = await supabase
          .from('drivertasks')
          .select('*', { count: 'exact', head: true })
          .eq('taskstatus', 'Completed')
          .gte('endtime', monthStart)
          .lt('endtime', monthEnd);
          
        // Calculate returns (placeholder - replace with actual logic)
        const returns = Math.round(monthOrderCount * 0.1) || 0;
        
        monthlyChartData.push({
          name: monthName,
          orders: monthOrderCount || 0,
          deliveries: monthDeliveryCount || 0,
          returns
        });
      }
      
      setMonthlyData(monthlyChartData);
      
      // Fetch driver performance data
      const { data: drivers, error: driversError } = await supabase
        .from('drivers')
        .select('driverid, drivername')
        .limit(10);
        
      if (driversError) throw driversError;
      
      if (drivers) {
        const driverStats: DriverPerformance[] = await Promise.all(
          drivers.map(async (driver) => {
            // Get assigned tasks count
            const { count: assignedCount } = await supabase
              .from('drivertasks')
              .select('*', { count: 'exact', head: true })
              .eq('driverid', driver.driverid)
              .gte('starttime', timeFilterStr);
              
            // Get completed tasks count
            const { count: completedCount } = await supabase
              .from('drivertasks')
              .select('*', { count: 'exact', head: true })
              .eq('driverid', driver.driverid)
              .eq('taskstatus', 'Completed')
              .gte('endtime', timeFilterStr);
              
            // Calculate rating (completed tasks / total tasks * 5)
            const taskRatio = assignedCount > 0 ? completedCount / assignedCount : 0;
            const rating = parseFloat((taskRatio * 5).toFixed(1));
            
            return {
              name: driver.drivername,
              tasks: assignedCount || 0,
              completed: completedCount || 0,
              rating: rating
            };
          })
        );
        
        setDriverPerformance(driverStats);
      }
      
    } catch (error: any) {
      console.error('Error fetching performance data:', error);
      toast({
        title: "Failed to load performance data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, [timeRange]);

  const refreshStats = () => {
    fetchPerformanceData();
  };

  return {
    loading,
    ordersCount,
    deliveriesCount,
    avgCompletionTime,
    weeklyData,
    monthlyData,
    driverPerformance,
    refreshStats
  };
};
