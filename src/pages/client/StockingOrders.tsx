
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const StockingOrders = () => {
  const orders = [
    {
      id: 'ST001',
      product: 'Product A',
      quantity: 50,
      status: 'In Stocking Process',
      date: '2025-04-27',
    }
  ];

  return (
    <DashboardLayout title="Stocking Orders" dashboardType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Stocking Orders</h2>
          <Button>
            <Plus className="mr-2" />
            New Stocking Order
          </Button>
        </div>

        <CustomCard variant="elevated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <span className="text-blue-600">{order.status}</span>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
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

export default StockingOrders;
