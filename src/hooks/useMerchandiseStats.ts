
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useMerchandiseStats = () => {
  const [totalMerchandise, setTotalMerchandise] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchTotalMerchandise = async () => {
    try {
      setLoading(true);
      const { count, error } = await supabase
        .from('merchandise')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      
      setTotalMerchandise(count || 0);
    } catch (error: any) {
      console.error('Error fetching merchandise stats:', error);
      toast({
        title: "Failed to load merchandise data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalMerchandise();
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('merchandise-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'merchandise' }, 
          () => fetchTotalMerchandise())
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { totalMerchandise, loading };
};
