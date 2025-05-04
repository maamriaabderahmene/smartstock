
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Package, Loader2 } from 'lucide-react';
import { usePendingOrders } from '@/hooks/usePendingOrders';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const PendingOrdersCard = () => {
  const { orders, loading } = usePendingOrders();
  const navigate = useNavigate();
  
  // Only show up to 3 orders on the dashboard
  const displayedOrders = orders.slice(0, 3);
  const hasMoreOrders = orders.length > 3;

  return (
    <CustomCard variant="elevated" className="col-span-2">
      <div className="flex justify-between items-center m-4">
        <h3 className="text-lg font-semibold">Pending Orders</h3>
        {hasMoreOrders && (
          <button 
            className="text-sm text-wms-accent hover:underline"
            onClick={() => navigate('/moderator/orders')}
          >
            View all ({orders.length})
          </button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
        </div>
      ) : displayedOrders.length > 0 ? (
        <div className="space-y-4 p-4">
          {displayedOrders.map((order) => (
            <div key={order.orderid} className="flex items-center justify-between p-4 bg-wms-50 rounded-md">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-wms-accent/10 rounded-md">
                  <Package className="h-5 w-5 text-wms-accent" />
                </div>
                <div>
                  <p className="font-medium">Order #{order.orderid.toString().padStart(4, '0')}</p>
                  <p className="text-sm text-wms-600">
                    {order.client?.clientname || 'Unknown Client'} • 
                    {order.orderdate && format(new Date(order.orderdate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <button 
                className="text-sm text-wms-accent hover:underline"
                onClick={() => navigate('/moderator/orders')}
              >
                Review
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <Package className="h-12 w-12 text-wms-500/50 mb-2" />
          <p className="text-lg font-medium text-wms-500">No pending orders</p>
          <p className="text-sm text-wms-400">All orders have been processed.</p>
        </div>
      )}
    </CustomCard>
  );
};
