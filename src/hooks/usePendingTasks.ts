
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const usePendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchPendingTasks = async () => {
    try {
      setLoading(true);
      const { count, error } = await supabase
        .from('drivertasks')
        .select('*', { count: 'exact', head: true })
        .eq('taskstatus', 'Pending');

      if (error) throw error;
      
      setPendingTasks(count || 0);
    } catch (error: any) {
      console.error('Error fetching pending tasks:', error);
      toast({
        title: "Failed to load task data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTasks();
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'drivertasks' }, 
          () => fetchPendingTasks())
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { pendingTasks, loading };
};
