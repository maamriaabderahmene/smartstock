
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useClientStats = () => {
  const [totalClients, setTotalClients] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchTotalClients = async () => {
    try {
      setLoading(true);
      const { count, error } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      
      setTotalClients(count || 0);
    } catch (error: any) {
      console.error('Error fetching client stats:', error);
      toast({
        title: "Failed to load client data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalClients();
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('clients-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'clients' }, 
          () => fetchTotalClients())
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { totalClients, loading };
};
