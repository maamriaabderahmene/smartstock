
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, FileText, Clock } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';

const ClientDashboard = () => {
  return (
    <DashboardLayout title="Client Dashboard" dashboardType="client">
      <div className="space-y-6">
        <OverviewCards dashboardType="client" />
        
        <div className="grid gap-6 md:grid-cols-2">
          <CustomCard variant="elevated">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Stocking Orders</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#ST001</TableCell>
                    <TableCell>Product A</TableCell>
                    <TableCell>
                      <span className="text-green-600">Stocked</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CustomCard>

          <CustomCard variant="elevated">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Destocking Orders</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#DS001</TableCell>
                    <TableCell>City Center</TableCell>
                    <TableCell>
                      <span className="text-blue-600">In Transit</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CustomCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
