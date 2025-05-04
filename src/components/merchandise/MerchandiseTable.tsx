
import { ArrowUpDown, Package, Edit, BarChart, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface MerchandiseTableProps {
  merchandise: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewAnalytics: (id: number) => void;
  handleSort: (field: string) => void;
  sortField: string;
}

export const MerchandiseTable = ({ 
  merchandise, 
  onEdit, 
  onDelete, 
  onViewAnalytics, 
  handleSort,
  sortField 
}: MerchandiseTableProps) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Item 
                  <ArrowUpDown size={14} className={`ml-1 ${sortField === 'name' ? 'text-wms-accent' : ''}`} />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('inStock')}>
                <div className="flex items-center">
                  In Stock 
                  <ArrowUpDown size={14} className={`ml-1 ${sortField === 'inStock' ? 'text-wms-accent' : ''}`} />
                </div>
              </TableHead>
              <TableHead>Reserved</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchandise.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                      <Package size={20} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item.inStock}</TableCell>
                <TableCell>{item.reserved}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(item.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onViewAnalytics(item.id)}
                    >
                      <BarChart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
