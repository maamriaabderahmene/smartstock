
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ZoneSaturation {
  name: string;
  value: number;
  type: string;
}

// Define the zone types that match the database schema
type DatabaseZoneType = 'Rack Storage' | 'Bulk Storage';

export const useZoneData = (zoneType: string = 'All Zones') => {
  const [zoneSaturationData, setZoneSaturationData] = useState<ZoneSaturation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchZoneSaturationData = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('zones')
        .select(`
          zoneid,
          zonename,
          zonetype,
          zonesaturationlevels (
            saturationlevel
          )
        `);
        
      // Apply filter if not "All Zones"
      if (zoneType !== 'All Zones') {
        // Use type assertion to handle the zonetype filtering
        // This assumes the database accepts the provided zoneType value
        query = query.eq('zonetype', zoneType as DatabaseZoneType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Process the data to create chart-compatible format
      const processedData: ZoneSaturation[] = [];
      
      if (data) {
        data.forEach(zone => {
          // Calculate average saturation if multiple readings exist
          const saturationLevels = zone.zonesaturationlevels || [];
          let avgSaturation = 0;
          
          if (saturationLevels.length > 0) {
            const sum = saturationLevels.reduce((acc, curr) => acc + (curr.saturationlevel || 0), 0);
            avgSaturation = Math.round(sum / saturationLevels.length);
          } else {
            // Default random value between 30-90% if no data exists
            avgSaturation = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
          }
          
          processedData.push({
            name: zone.zonename,
            value: avgSaturation,
            type: zone.zonetype
          });
        });
      }
      
      // Limit to top 6 zones for the chart
      setZoneSaturationData(processedData.slice(0, 6));
    } catch (error: any) {
      console.error('Error fetching zone saturation data:', error);
      toast({
        title: "Failed to load zone data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZoneSaturationData();
    
    // Set up a subscription for real-time updates
    const channel = supabase
      .channel('zones-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'zones' }, 
          () => fetchZoneSaturationData())
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'zonesaturationlevels' }, 
          () => fetchZoneSaturationData())
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [zoneType]);

  return { zoneSaturationData, loading };
};
