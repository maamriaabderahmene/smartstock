
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Order } from '@/components/orders/OrdersTable';
import type { ClientOrder } from '@/types/database';

export const useOrderManagement = (selectedTab: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      const query = supabase
        .from('clientorders')
        .select(`
          orderid,
          clientid,
          ordertype,
          orderdate,
          status,
          clients:clientid (clientname)
        `);

      // Apply filters based on selected tab
      if (selectedTab !== 'all') {
        // Convert tab name to proper case to match database enum values
        // This fixes the TS2345 error by ensuring we use a valid status value
        let statusFilter: 'Pending' | 'Validated' | 'Cancelled' = 'Pending';
        
        if (selectedTab === 'pending') {
          statusFilter = 'Pending';
        } else if (selectedTab === 'validated') {
          statusFilter = 'Validated';
        } else if (selectedTab === 'cancelled') {
          statusFilter = 'Cancelled';
        }
        
        query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        const formattedOrders: Order[] = data.map((order: any) => ({
          id: `ORD-${order.orderid.toString().padStart(3, '0')}`,
          client: order.clients?.clientname || 'Unknown Client',
          type: order.ordertype || 'Unknown',
          items: Math.floor(Math.random() * 15) + 1, // This should be replaced with actual items count
          status: order.status.toLowerCase(),
          date: new Date(order.orderdate).toISOString().split('T')[0],
          orderId: order.orderid,
          clientId: order.clientid
        }));
        
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: 'Validated' | 'Cancelled') => {
    try {
      const { error } = await supabase
        .from('clientorders')
        .update({ status: newStatus })
        .eq('orderid', orderId);
        
      if (error) throw error;
      
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('client-orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clientorders'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [selectedTab]);

  return {
    orders,
    loading,
    updateOrderStatus
  };
};
