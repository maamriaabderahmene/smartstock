
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Check, X } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';

export interface Order {
  id: string;
  client: string;
  type: string;
  items: number;
  status: string;
  date: string;
  orderId?: number;
  clientId?: number;
}

interface OrdersTableProps {
  orders: Order[];
  onApprove: (order: Order) => void;
  onReject: (order: Order) => void;
}

export const OrdersTable = ({ orders, onApprove, onReject }: OrdersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.client}</TableCell>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell><OrderStatusBadge status={order.status as any} /></TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4" />
                </Button>
                {order.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0 text-green-600"
                      onClick={() => onApprove(order)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onReject(order)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
