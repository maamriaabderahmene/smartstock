
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';

const OrderStatus = () => {
  const orders = [
    {
      id: 'ST001',
      type: 'Stocking',
      product: 'Product A',
      status: 'Stocké',
      lastUpdate: '2025-04-27 14:30'
    },
    {
      id: 'DS001',
      type: 'Destocking',
      product: 'Product B',
      status: 'En Cours de Distribution',
      lastUpdate: '2025-04-27 15:45'
    }
  ];

  return (
    <DashboardLayout title="Order Status" dashboardType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Status Tracking</h2>
          <Button variant="outline">
            <Search className="mr-2" />
            Track Order
          </Button>
        </div>

        <CustomCard variant="elevated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>
                    <span className={
                      order.status === 'Stocké' ? 'text-green-600' :
                      order.status === 'En Cours de Distribution' ? 'text-blue-600' :
                      'text-gray-600'
                    }>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.lastUpdate}</TableCell>
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

export default OrderStatus;
