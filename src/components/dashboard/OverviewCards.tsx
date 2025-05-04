import React from 'react';
import { motion } from 'framer-motion';
import { CustomCard } from '@/components/ui/custom-card';
import { Package, Truck, Users, AlertCircle, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { useMerchandiseStats } from '@/hooks/useMerchandiseStats';
import { useDriverStats } from '@/hooks/useDriverStats';
import { useClientStats } from '@/hooks/useClientStats';
import { usePendingTasks } from '@/hooks/usePendingTasks';

interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  delay?: number;
  loading?: boolean;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue, 
  delay = 0,
  loading = false 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={14} className="text-green-500" />;
      case 'down':
        return <ArrowDown size={14} className="text-red-500" />;
      case 'neutral':
      default:
        return <ArrowRight size={14} className="text-wms-500" />;
    }
  };
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'neutral':
      default:
        return 'text-wms-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <CustomCard variant="elevated" className="h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-wms-500 text-sm font-medium mb-1">{title}</p>
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-1"></div>
            ) : (
              <h3 className="text-2xl font-bold text-wms-900 mb-1">{value}</h3>
            )}
            <p className="text-wms-600 text-xs">{description}</p>
            
            {trend && trendValue && (
              <div className="flex items-center mt-3">
                <span className={`flex items-center text-xs font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="ml-1">{trendValue}</span>
                </span>
                <span className="ml-2 text-xs text-wms-500">vs last period</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-lg bg-wms-accent/10 text-wms-accent">
            {icon}
          </div>
        </div>
      </CustomCard>
    </motion.div>
  );
};

interface OverviewCardsProps {
  dashboardType: 'admin' | 'moderator' | 'driver' | 'client';
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ dashboardType }) => {
  // Use custom hooks to fetch real data
  const { totalMerchandise, loading: merchandiseLoading } = useMerchandiseStats();
  const { activeDrivers, loading: driversLoading } = useDriverStats();
  const { totalClients, loading: clientsLoading } = useClientStats();
  const { pendingTasks, loading: tasksLoading } = usePendingTasks();

  const adminCards = [
    {
      title: 'Total Merchandise',
      value: totalMerchandise.toString(),
      description: 'Items in warehouse',
      icon: <Package size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 0,
      loading: merchandiseLoading
    },
    {
      title: 'Active Drivers',
      value: activeDrivers.toString(),
      description: 'Currently available',
      icon: <Truck size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 1,
      loading: driversLoading
    },
    {
      title: 'Total Clients',
      value: totalClients.toString(),
      description: 'Registered accounts',
      icon: <Users size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 2,
      loading: clientsLoading
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.toString(),
      description: 'Require attention',
      icon: <AlertCircle size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 3,
      loading: tasksLoading
    }
  ];

  const moderatorCards = [
    {
      title: 'Pending Orders',
      value: '...',
      description: 'Needs validation',
      icon: <Package size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 0
    },
    {
      title: 'Available Drivers',
      value: '...',
      description: 'Ready for assignment',
      icon: <Truck size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 1
    },
    {
      title: 'Inspections Required',
      value: '...',
      description: 'Pending controller assignment',
      icon: <AlertCircle size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 2
    },
    {
      title: 'Validated Today',
      value: '...',
      description: 'Orders processed',
      icon: <Package size={20} />,
      trend: 'neutral' as const,
      trendValue: '',
      delay: 3
    }
  ];

  const driverCards = [
    {
      title: 'Assigned Tasks',
      value: '5',
      description: 'Current workload',
      icon: <Package size={20} />,
      trend: 'neutral' as const,
      trendValue: '0%',
      delay: 0
    },
    {
      title: 'Completed Today',
      value: '12',
      description: 'Tasks finished',
      icon: <Truck size={20} />,
      trend: 'up' as const,
      trendValue: '25%',
      delay: 1
    },
    {
      title: 'Average Rating',
      value: '4.8',
      description: 'Out of 5.0',
      icon: <Users size={20} />,
      trend: 'up' as const,
      trendValue: '0.2',
      delay: 2
    },
    {
      title: 'Efficiency Score',
      value: '92%',
      description: 'Performance metric',
      icon: <AlertCircle size={20} />,
      trend: 'up' as const,
      trendValue: '3%',
      delay: 3
    }
  ];

  const clientCards = [
    {
      title: 'Active Products',
      value: '28',
      description: 'Currently in storage',
      icon: <Package size={20} />,
      trend: 'up' as const,
      trendValue: '3',
      delay: 0
    },
    {
      title: 'Pending Orders',
      value: '3',
      description: 'Awaiting processing',
      icon: <Truck size={20} />,
      trend: 'neutral' as const,
      trendValue: '0',
      delay: 1
    },
    {
      title: 'In Transit',
      value: '7',
      description: 'Being delivered',
      icon: <AlertCircle size={20} />,
      trend: 'up' as const,
      trendValue: '2',
      delay: 2
    },
    {
      title: 'Storage Usage',
      value: '72%',
      description: 'Of allocated space',
      icon: <Package size={20} />,
      trend: 'up' as const,
      trendValue: '5%',
      delay: 3
    }
  ];

  const getCards = () => {
    switch (dashboardType) {
      case 'admin': 
        return adminCards;
      case 'moderator': 
        return moderatorCards;
      case 'driver': 
        return driverCards;
      case 'client': 
        return clientCards;
      default: 
        return adminCards;
    }
  };

  const cards = getCards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  );
};

export default OverviewCards;
