
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { ClientOrder, Client } from '@/types/database';

export interface OrderWithClient extends ClientOrder {
  client: Client;
}

export const usePendingOrders = () => {
  const [orders, setOrders] = useState<OrderWithClient[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      // Get pending orders
      const { data: pendingOrders, error: ordersError } = await supabase
        .from('clientorders')
        .select('*')
        .eq('status', 'Pending');

      if (ordersError) throw ordersError;

      // Get client details for each order
      const ordersWithClientDetails = await Promise.all(
        pendingOrders.map(async (order) => {
          const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('*')
            .eq('clientid', order.clientid)
            .single();

          if (clientError && clientError.code !== 'PGRST116') {
            console.error('Error fetching client:', clientError);
            return {
              ...order,
              client: { clientname: 'Unknown Client' } as Client
            } as OrderWithClient;
          }

          return {
            ...order,
            client: clientData
          } as OrderWithClient;
        })
      );

      setOrders(ordersWithClientDetails);
    } catch (error: any) {
      console.error('Error fetching pending orders:', error);
      toast({
        title: "Failed to load pending orders",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const refreshOrders = () => {
    fetchPendingOrders();
  };

  return { orders, loading, refreshOrders };
};
