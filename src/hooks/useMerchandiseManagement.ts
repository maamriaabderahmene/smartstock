
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Merchandise = {
  id: string;
  name: string;
  client: string;
  quantity: number;
  zone: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  merchandiseId?: number;
  clientId?: number;
};

export const useMerchandiseManagement = (statusFilter: string = 'all') => {
  const [merchandise, setMerchandise] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchMerchandise = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('merchandise')
        .select(`
          merchandiseid,
          merchandisename,
          quantity,
          categoryid,
          merchandisecategories:categoryid (categoryname),
          zonesaturationlevels:merchandiseid (zoneid, zones:zoneid (zonename))
        `);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Map the data to our Merchandise type
        const formattedMerchandise: Merchandise[] = data.map(item => {
          // Determine status based on quantity
          let status: 'In Stock' | 'Low Stock' | 'Critical';
          
          if (item.quantity > 50) {
            status = 'In Stock';
          } else if (item.quantity > 15) {
            status = 'Low Stock';
          } else {
            status = 'Critical';
          }
          
          // Get zone from relationship if available
          const zone = item.zonesaturationlevels && item.zonesaturationlevels.length > 0
            ? item.zonesaturationlevels[0]?.zones?.zonename
            : `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 4) + 1}`;
            
          return {
            id: `PRD${item.merchandiseid.toString().padStart(3, '0')}`,
            name: item.merchandisename || 'Unknown Product',
            client: 'Generic Client', // This would ideally come from a clients relationship
            quantity: item.quantity || 0,
            zone: zone || 'Unassigned',
            status,
            merchandiseId: item.merchandiseid
          };
        });
        
        setMerchandise(formattedMerchandise);
      } else {
        setMerchandise([]);
      }
    } catch (error) {
      console.error('Error fetching merchandise:', error);
      toast.error('Failed to load merchandise');
    } finally {
      setLoading(false);
    }
  };

  // Filter merchandise based on search term and status filter
  const filteredMerchandise = merchandise
    .filter(item => 
      (searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || item.status.toLowerCase().replace(' ', '-') === statusFilter)
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof Merchandise];
      const bValue = b[sortField as keyof Merchandise];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('merchandise-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'merchandise'
        },
        () => {
          fetchMerchandise();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchMerchandise();
  }, []);

  return {
    merchandise: filteredMerchandise,
    loading,
    searchTerm,
    setSearchTerm,
    handleSort,
    sortField,
    sortDirection,
    fetchMerchandise
  };
};
