
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';

const ClientProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Product A',
      quantity: 100,
      volume: '2m³',
      weight: '150kg',
      size: '100x50x30cm',
      temperature: '20°C',
      humidity: '45%'
    }
  ];

  return (
    <DashboardLayout title="My Products" dashboardType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Product Inventory</h2>
          <Button>
            <Plus className="mr-2" />
            Add New Product
          </Button>
        </div>

        <CustomCard variant="elevated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Humidity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.volume}</TableCell>
                  <TableCell>{product.weight}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.temperature}</TableCell>
                  <TableCell>{product.humidity}</TableCell>
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

export default ClientProducts;
