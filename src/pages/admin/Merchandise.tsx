
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MerchandiseTable } from '@/components/merchandise/MerchandiseTable';
import { MerchandiseSearch } from '@/components/merchandise/MerchandiseSearch';
import { MerchandiseStats } from '@/components/merchandise/MerchandiseStats';

const categories = ['All', 'Electronics', 'Furniture', 'Accessories', 'Health'];

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState<'name' | 'inStock' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const handleSort = (field: 'name' | 'inStock') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddItem = () => {
    toast({
      title: "Add New Item",
      description: "Item creation functionality coming soon",
    });
  };

  const handleEditItem = (id: number) => {
    toast({
      title: "Edit Item",
      description: `Editing item with ID: ${id}`,
    });
  };

  const handleDeleteItem = (id: number) => {
    toast({
      title: "Delete Item",
      description: `Deleting item with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleViewAnalytics = (id: number) => {
    toast({
      title: "View Analytics",
      description: `Viewing analytics for item with ID: ${id}`,
    });
  };

  return (
    <DashboardLayout title="Merchandise Management" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Merchandise Management</h2>
          
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={handleAddItem}
          >
            <Plus size={16} />
            Add New Item
          </Button>
        </div>

        <MerchandiseStats
          totalItems="1,445"
          inStock="1,245"
          reserved="200"
          totalValue="$2.4M"
        />
        
        <MerchandiseSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
        
        <MerchandiseTable
          merchandise={merchandise}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onViewAnalytics={handleViewAnalytics}
          handleSort={handleSort}
          sortField={sortField}
        />
      </div>
    </DashboardLayout>
  );
};

export default Merchandise;
