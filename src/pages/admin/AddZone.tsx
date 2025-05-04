
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define the zone types that match exactly what's in the database schema
type DatabaseZoneType = 'Rack Storage' | 'Bulk Storage';
// Define our component's zone types that include Standard
type ZoneType = DatabaseZoneType | 'Standard';

const AddZone: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    zoneName: '',
    zoneType: 'Standard' as ZoneType,
    weightCapacity: 1000,
    length: 10,
    width: 10,
    height: 10,
    temperatureMin: 0,
    temperatureMax: 30,
    humidityMin: 30,
    humidityMax: 70,
  });

  const generateMatricule = (type: ZoneType, name: string) => {
    const prefix = type === 'Bulk Storage' ? 'BS' : 
                  type === 'Rack Storage' ? 'RS' : 'ST';
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const namePart = name.substring(0, 2).toUpperCase();
    return `${prefix}-${namePart}${randomDigits}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'zoneType' ? value : 
              name === 'zoneName' ? value :
              Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate a unique matricule for the zone
      const matricule = generateMatricule(
        formData.zoneType, 
        formData.zoneName
      );
      
      // Handle the type conversion explicitly for database compatibility
      // If the type is 'Standard', convert to a valid database type
      const zoneTypeForDB: DatabaseZoneType = 
        formData.zoneType === 'Standard' ? 'Rack Storage' : formData.zoneType;
      
      // Insert the new zone into the database with the correct type
      const { data, error } = await supabase
        .from('zones')
        .insert({
          zonename: formData.zoneName,
          zonetype: zoneTypeForDB, // Use the converted type
          weightcapacity: formData.weightCapacity,
          length: formData.length,
          width: formData.width,
          height: formData.height,
          // Remove references to 'Cold Storage' since it's not in our ZoneType
          temperaturemin: null,
          temperaturemax: null,
          humiditymin: null,
          humiditymax: null,
          matricule: matricule,
        })
        .select();
      
      if (error) throw error;
      
      // Success message
      toast({
        title: "Zone Created",
        description: `${formData.zoneName} has been successfully added.`,
      });
      
      // Navigate back to zones management
      navigate('/admin/zones');
      
    } catch (error: any) {
      toast({
        title: "Error Creating Zone",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add New Zone" dashboardType="admin">
      <div className="max-w-3xl mx-auto">
        <CustomCard>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Create New Zone</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone Name
                    </label>
                    <input
                      type="text"
                      name="zoneName"
                      value={formData.zoneName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone Type
                    </label>
                    <select
                      name="zoneType"
                      value={formData.zoneType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                    >
                      <option value="Standard">Standard Storage</option>
                      <option value="Rack Storage">Rack Storage</option>
                      <option value="Bulk Storage">Bulk Storage</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (m)
                    </label>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (m)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight Capacity (kg)
                  </label>
                  <input
                    type="number"
                    name="weightCapacity"
                    value={formData.weightCapacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent"
                    min="0"
                  />
                </div>
                
                {/* Removed Cold Storage specific fields to match the database schema */}
                
                <div className="flex justify-end gap-4 pt-4">
                  <CustomButton
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/zones')}
                  >
                    Cancel
                  </CustomButton>
                  
                  <CustomButton
                    type="submit"
                    variant="accent"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Zone'}
                  </CustomButton>
                </div>
              </div>
            </form>
          </div>
        </CustomCard>
      </div>
    </DashboardLayout>
  );
};

export default AddZone;
