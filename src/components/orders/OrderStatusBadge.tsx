
import React from 'react';
import { StatusBadge } from '@/components/ui/status-badge';

type OrderStatus = 'pending' | 'validated' | 'cancelled' | 'completed' | 'processing';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusType = () => {
    switch (status) {
      case 'validated':
      case 'completed':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDisplayText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return <StatusBadge status={getDisplayText()} type={getStatusType()} />;
};
