
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface PerformanceData {
  name: string;
  warehouse: number;
  shipping: number;
  inventory: number;
}

// Define custom type for metric types to avoid type comparison errors
type MetricType = 'warehouse_efficiency' | 'shipping_efficiency' | 'inventory_accuracy';

export const usePerformanceData = (timeRange: string = 'Last 12 Months') => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchPerformanceData = async () => {
    try {
      setLoading(true);
      
      // Determine the time range based on the selected filter
      const monthsToFetch = timeRange === 'Last 3 Months' ? 3 : 
                           timeRange === 'Last 6 Months' ? 6 : 12;
      
      // Fetch performance metrics from the database
      const { data, error } = await supabase
        .from('performancemetrics')
        .select('metrictype, metricvalue, metricdate')
        .gte('metricdate', new Date(new Date().setMonth(new Date().getMonth() - monthsToFetch)).toISOString())
        .order('metricdate', { ascending: true });

      if (error) throw error;

      // Process the data to create chart-compatible format
      const processedData: Record<string, PerformanceData> = {};
      
      // Initialize with months
      for (let i = 0; i < monthsToFetch; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - (monthsToFetch - 1 - i));
        const monthName = date.toLocaleString('default', { month: 'short' });
        
        processedData[monthName] = {
          name: monthName,
          warehouse: 0,
          shipping: 0,
          inventory: 0
        };
      }
      
      // Fill with actual data
      if (data) {
        data.forEach(metric => {
          const date = new Date(metric.metricdate);
          const monthName = date.toLocaleString('default', { month: 'short' });
          
          if (processedData[monthName]) {
            // Use type assertion to avoid type comparison errors
            const metricType = metric.metrictype as MetricType;
            
            if (metricType === 'warehouse_efficiency') {
              processedData[monthName].warehouse = Math.round(metric.metricvalue);
            } else if (metricType === 'shipping_efficiency') {
              processedData[monthName].shipping = Math.round(metric.metricvalue);
            } else if (metricType === 'inventory_accuracy') {
              processedData[monthName].inventory = Math.round(metric.metricvalue);
            }
          }
        });
      }
      
      setPerformanceData(Object.values(processedData));
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

  return { performanceData, loading };
};
