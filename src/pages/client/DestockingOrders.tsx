
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Plus, Truck } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const DestockingOrders = () => {
  const orders = [
    {
      id: 'DS001',
      product: 'Product A',
      destination: 'City Center Warehouse',
      buyer: 'ABC Company',
      limitDate: '2025-05-15',
      status: 'In Transit'
    }
  ];

  return (
    <DashboardLayout title="Destocking Orders" dashboardType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Destocking Orders</h2>
          <Button>
            <Plus className="mr-2" />
            New Destocking Order
          </Button>
        </div>

        <CustomCard variant="elevated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Limit Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.limitDate}</TableCell>
                  <TableCell>
                    <span className="text-blue-600">{order.status}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default DestockingOrders;
