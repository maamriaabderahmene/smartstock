
import { Package } from 'lucide-react';
import { DataCard } from '@/components/ui/data-card';

interface MerchandiseStatsProps {
  totalItems: string;
  inStock: string;
  reserved: string;
  totalValue: string;
}

export const MerchandiseStats = ({
  totalItems,
  inStock,
  reserved,
  totalValue,
}: MerchandiseStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DataCard
        title="Total Items"
        value={totalItems}
        trend={{
          value: "↑ 12% from last month",
          positive: true
        }}
        icon={<Package size={16} />}
      />
      <DataCard
        title="In Stock"
        value={inStock}
        icon={<Package size={16} />}
      />
      <DataCard
        title="Reserved"
        value={reserved}
        icon={<Package size={16} />}
      />
      <DataCard
        title="Total Value"
        value={totalValue}
        trend={{
          value: "↑ 8% from last quarter",
          positive: true
        }}
        icon={<Package size={16} />}
      />
    </div>
  );
};
