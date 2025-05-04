
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useDriverStats = () => {
  const [activeDrivers, setActiveDrivers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchActiveDrivers = async () => {
    try {
      setLoading(true);
      const { count, error } = await supabase
        .from('drivers')
        .select('*', { count: 'exact', head: true })
        .eq('availability', 'Available');

      if (error) throw error;
      
      setActiveDrivers(count || 0);
    } catch (error: any) {
      console.error('Error fetching active drivers:', error);
      toast({
        title: "Failed to load driver data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveDrivers();
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('drivers-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'drivers' }, 
          () => fetchActiveDrivers())
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { activeDrivers, loading };
};
