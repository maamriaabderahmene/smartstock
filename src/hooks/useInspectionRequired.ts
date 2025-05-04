
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface InspectionItem {
  id: number;
  name: string;
  type: 'zone' | 'merchandise';
  lastInspected: Date | null;
  daysOverdue: number;
}

export const useInspectionRequired = () => {
  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [validatedToday, setValidatedToday] = useState<number>(0);
  const { toast } = useToast();

  const fetchInspectionItems = async () => {
    try {
      setLoading(true);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneWeekAgoStr = oneWeekAgo.toISOString();
      
      // Get zones that need inspection
      const { data: zoneData, error: zoneError } = await supabase
        .from('inspections')
        .select(`
          inspectionid,
          inspectiondate,
          zones!inner(
            zoneid,
            zonename
          )
        `)
        .lt('inspectiondate', oneWeekAgoStr)
        .order('inspectiondate', { ascending: true });

      if (zoneError) throw zoneError;

      // Get merchandise that needs inspection
      const { data: merchData, error: merchError } = await supabase
        .from('inspections')
        .select(`
          inspectionid,
          inspectiondate,
          merchandise!inner(
            merchandiseid,
            merchandisename
          )
        `)
        .lt('inspectiondate', oneWeekAgoStr)
        .order('inspectiondate', { ascending: true });

      if (merchError) throw merchError;

      // Count today's inspections
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString();
      
      const { count: todayCount, error: countError } = await supabase
        .from('inspections')
        .select('*', { count: 'exact', head: true })
        .gte('inspectiondate', todayStr);

      if (countError) throw countError;
      
      setValidatedToday(todayCount || 0);

      // Format data for display
      const currentDate = new Date();
      
      const zoneItems: InspectionItem[] = (zoneData || []).map((item: any) => {
        const lastInspected = new Date(item.inspectiondate);
        const daysOverdue = Math.floor((currentDate.getTime() - lastInspected.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
          id: item.zones.zoneid,
          name: item.zones.zonename,
          type: 'zone',
          lastInspected: lastInspected,
          daysOverdue
        };
      });

      const merchItems: InspectionItem[] = (merchData || []).map((item: any) => {
        const lastInspected = new Date(item.inspectiondate);
        const daysOverdue = Math.floor((currentDate.getTime() - lastInspected.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
          id: item.merchandise.merchandiseid,
          name: item.merchandise.merchandisename,
          type: 'merchandise',
          lastInspected: lastInspected,
          daysOverdue
        };
      });

      setInspectionItems([...zoneItems, ...merchItems]);
      
    } catch (error: any) {
      console.error('Error fetching inspection data:', error);
      toast({
        title: "Failed to load inspection data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspectionItems();
    
    // Set up daily refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimeout = setTimeout(() => {
      fetchInspectionItems();
      // Reset for next day
      setDailyRefresh();
    }, timeUntilMidnight);
    
    // Helper function to set up the next day's refresh
    const setDailyRefresh = () => {
      const nextRefresh = setTimeout(() => {
        fetchInspectionItems();
        setDailyRefresh();
      }, 24 * 60 * 60 * 1000); // 24 hours
      
      return () => clearTimeout(nextRefresh);
    };
    
    return () => clearTimeout(midnightTimeout);
  }, []);

  const refreshInspections = () => {
    fetchInspectionItems();
  };

  return { inspectionItems, validatedToday, loading, refreshInspections };
};
