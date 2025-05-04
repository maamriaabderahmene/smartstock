
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface MerchandiseItem {
  id: number;
  name: string;
  client: string;
  quantity: number;
  zone: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  categoryId?: number;
  categoryName?: string;
}

export const useMerchandiseInventory = (filterOption: string = 'all') => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [filteredMerchandise, setFilteredMerchandise] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const fetchMerchandise = async () => {
    try {
      setLoading(true);
      
      // Get merchandise items with category names
      const { data, error } = await supabase
        .from('merchandise')
        .select(`
          merchandiseid, 
          merchandisename,
          quantity,
          categoryid,
          merchandisecategories(categoryname)
        `);
        
      if (error) throw error;
      
      // Get zone information for each merchandise item
      const itemsWithDetails = await Promise.all(data.map(async (item: any) => {
        // Find zone for this merchandise
        const { data: zoneData, error: zoneError } = await supabase
          .from('stockingorders')
          .select(`
            zones:zoneid(
              zoneid, 
              zonename
            )
          `)
          .eq('merchandiseid', item.merchandiseid)
          .order('stockdate', { ascending: false })
          .limit(1);
          
        if (zoneError) {
          console.error('Error fetching zone for merchandise:', zoneError);
        }
        
        // Find client for this merchandise
        const { data: clientData, error: clientError } = await supabase
          .from('clientorders')
          .select(`
            clients:clientid(
              clientid, 
              clientname
            )
          `)
          .eq('orderid', item.merchandiseid)
          .limit(1);
          
        if (clientError) {
          console.error('Error fetching client for merchandise:', clientError);
        }
        
        // Determine stock status
        let status: 'In Stock' | 'Low Stock' | 'Critical' = 'In Stock';
        if (item.quantity <= 5) {
          status = 'Critical';
        } else if (item.quantity <= 20) {
          status = 'Low Stock';
        }
        
        return {
          id: item.merchandiseid,
          name: item.merchandisename,
          client: clientData?.[0]?.clients?.clientname || 'Unknown Client',
          quantity: item.quantity,
          zone: zoneData?.[0]?.zones?.zonename || 'Unassigned',
          status,
          categoryId: item.categoryid,
          categoryName: item.merchandisecategories?.categoryname
        };
      }));
      
      setMerchandise(itemsWithDetails);
      
    } catch (error: any) {
      console.error('Error fetching merchandise inventory:', error);
      toast({
        title: "Failed to load merchandise inventory",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters and search
  useEffect(() => {
    let filtered = [...merchandise];
    
    // Apply status filter
    if (filterOption !== 'all') {
      const filterMap = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'critical': 'Critical'
      };
      
      filtered = filtered.filter(item => item.status === filterMap[filterOption as keyof typeof filterMap]);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.client.toLowerCase().includes(term) ||
        item.zone.toLowerCase().includes(term) ||
        String(item.id).includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortField as keyof MerchandiseItem];
      let bValue: any = b[sortField as keyof MerchandiseItem];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredMerchandise(filtered);
  }, [merchandise, filterOption, searchTerm, sortField, sortDirection]);

  useEffect(() => {
    fetchMerchandise();
  }, []);

  const handleSort = (field: string) => {
    setSortDirection(prevDir => 
      sortField === field ? (prevDir === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortField(field);
  };

  const refreshInventory = () => {
    fetchMerchandise();
  };

  return { 
    merchandise: filteredMerchandise, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    handleSort,
    sortField,
    sortDirection,
    refreshInventory
  };
};
