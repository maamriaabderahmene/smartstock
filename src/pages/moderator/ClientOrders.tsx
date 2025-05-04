
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Filter, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ClientOrders = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const { orders, loading, updateOrderStatus } = useOrderManagement(selectedTab);

  useEffect(() => {
    if (!loading && orders) {
      // Apply search filter if search term exists
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        setFilteredOrders(orders.filter(order => 
          (order.id?.toString() || '').includes(term) || 
          (order.client?.toLowerCase() || '').includes(term) ||
          (order.type?.toLowerCase() || '').includes(term) ||
          (order.items?.toString() || '').includes(term) ||
          (order.status?.toLowerCase() || '').includes(term)
        ));
      } else {
        setFilteredOrders(orders);
      }
    }
  }, [orders, searchTerm, loading]);

  const handleOrderAction = async (order: any, action: 'approve' | 'reject') => {
    const statusMap = {
      'approve': 'Validated' as const,
      'reject': 'Cancelled' as const
    };
    
    if (order.orderId) {
      await updateOrderStatus(order.orderId, statusMap[action]);
      toast.success(`Order ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    }
  };

  const handleExport = async () => {
    try {
      // Create CSV content
      const headers = ['Order ID', 'Client', 'Type', 'Items', 'Status', 'Date'];
      const csvContent = [
        headers.join(','),
        ...filteredOrders.map(order => [
          order.id,
          order.client,
          order.type,
          order.items,
          order.status,
          order.date
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `orders_${selectedTab}_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success('Orders exported successfully');
    } catch (error) {
      console.error('Error exporting orders:', error);
      toast.error('Failed to export orders');
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedTab(filter);
  };

  return (
    <DashboardLayout title="Client Orders" dashboardType="moderator">
      <div className="space-y-6">
        <CustomCard variant="elevated">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-2xl font-semibold">Order Management</h2>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleExport}
                  disabled={loading || filteredOrders.length === 0}
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 px-4">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wms-600" />
                <Input
                  className="pl-10"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFilterSelect('pending')}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('validated')}>Approved</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('cancelled')}>Rejected</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('all')}>All Orders</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs defaultValue="pending" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="validated">Approved</TabsTrigger>
                <TabsTrigger value="cancelled">Rejected</TabsTrigger>
                <TabsTrigger value="all">All Orders</TabsTrigger>
              </TabsList>
              <TabsContent value={selectedTab} className="mt-4">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
                  </div>
                ) : (
                  <OrdersTable
                    orders={filteredOrders}
                    onApprove={(order) => handleOrderAction(order, 'approve')}
                    onReject={(order) => handleOrderAction(order, 'reject')}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default ClientOrders;
