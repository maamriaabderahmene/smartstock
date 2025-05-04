
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Search, Filter, ArrowUpDown, Loader2, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMerchandiseInventory } from '@/hooks/useMerchandiseInventory';
import { toast } from 'sonner';

const Merchandise = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const {
    merchandise,
    loading,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortField,
    sortDirection,
    refreshInventory
  } = useMerchandiseInventory(activeTab);

  // Status badge renderer
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">In Stock</span>;
      case 'Low Stock':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
      case 'Critical':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Critical</span>;
      default:
        return null;
    }
  };

  const handleExport = () => {
    try {
      // Create CSV content
      const headers = ['ID', 'Name', 'Client', 'Quantity', 'Zone', 'Status'];
      const csvContent = [
        headers.join(','),
        ...merchandise.map(item => [
          item.id,
          item.name,
          item.client,
          item.quantity,
          item.zone,
          item.status
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `merchandise_inventory_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success('Inventory data exported successfully');
    } catch (error) {
      console.error('Error exporting inventory data:', error);
      toast.error('Failed to export inventory data');
    }
  };

  const handleFilterSelect = (filter: string) => {
    setActiveTab(filter);
  };

  // Render merchandise table
  const renderMerchandiseTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
        </div>
      );
    }
    
    if (merchandise.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Package className="h-12 w-12 text-wms-500/50 mb-2" />
          <p className="text-lg font-medium text-wms-500">No merchandise found</p>
          <p className="text-sm text-wms-400">
            {searchTerm ? 'No results match your search criteria.' : 'There is no merchandise available.'}
          </p>
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
              <div className="flex items-center">
                Product ID 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'id' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
              <div className="flex items-center">
                Name 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'name' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('client')}>
              <div className="flex items-center">
                Client 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'client' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('quantity')}>
              <div className="flex items-center">
                Quantity 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'quantity' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('zone')}>
              <div className="flex items-center">
                Zone 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'zone' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              <div className="flex items-center">
                Status 
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'status' ? 'text-wms-accent' : ''}`} />
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchandise.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.zone}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <DashboardLayout title="Merchandise Management" dashboardType="moderator">
      <div className="space-y-6">
        <CustomCard variant="elevated">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <Package className="h-6 w-6 mr-2 text-wms-accent" />
                Merchandise Inventory
              </h2>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleExport}
                  disabled={loading || merchandise.length === 0}
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={refreshInventory}
                >
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 px-4">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wms-600" />
                <Input
                  className="pl-10"
                  placeholder="Search merchandise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFilterSelect('all')}>All Items</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('in-stock')}>In Stock</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('low-stock')}>Low Stock</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterSelect('critical')}>Critical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-4">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-4">
                <div className="border rounded-lg">
                  {renderMerchandiseTable()}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default Merchandise;
