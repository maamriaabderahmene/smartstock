
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';

interface StatsCardsProps {
  stats: Array<{
    title: string;
    value: string;
    icon: typeof CheckCircle | typeof Clock | typeof TrendingUp;
  }>;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {stats.map((stat) => (
        <CustomCard key={stat.title} variant="elevated">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-wms-accent/10 rounded-md">
              <stat.icon className="h-5 w-5 text-wms-accent" />
            </div>
            <div>
              <p className="text-sm text-wms-600">{stat.title}</p>
              <h3 className="text-2xl font-semibold">{stat.value}</h3>
            </div>
          </div>
        </CustomCard>
      ))}
    </div>
  );
};
