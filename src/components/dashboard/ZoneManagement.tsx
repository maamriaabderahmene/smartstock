
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash, 
  Search, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  ArrowDown, 
  ArrowUp, 
  Warehouse,
  Thermometer,
  Droplets,
  Scale,
  Box
} from 'lucide-react';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';

interface Zone {
  id: string;
  name: string;
  type: 'Rack Storage' | 'Bulk Storage';
  matricule: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: {
    min: number;
    max: number;
  };
  weightCapacity: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  saturation: number;
}

const ZoneManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<keyof Zone>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const zonesData: Zone[] = [
    {
      id: '1',
      name: 'Zone A',
      type: 'Rack Storage',
      matricule: 'ZA-001',
      temperature: {
        min: 15,
        max: 25,
      },
      humidity: {
        min: 40,
        max: 60,
      },
      weightCapacity: 5000,
      dimensions: {
        length: 10,
        width: 8,
        height: 12,
      },
      saturation: 75,
    },
    {
      id: '2',
      name: 'Zone B',
      type: 'Bulk Storage',
      matricule: 'ZB-002',
      temperature: {
        min: 10,
        max: 20,
      },
      humidity: {
        min: 30,
        max: 50,
      },
      weightCapacity: 8000,
      dimensions: {
        length: 15,
        width: 12,
        height: 8,
      },
      saturation: 45,
    },
    {
      id: '3',
      name: 'Cold Storage',
      type: 'Rack Storage',
      matricule: 'CS-003',
      temperature: {
        min: 2,
        max: 8,
      },
      humidity: {
        min: 60,
        max: 80,
      },
      weightCapacity: 3000,
      dimensions: {
        length: 8,
        width: 6,
        height: 10,
      },
      saturation: 90,
    },
    {
      id: '4',
      name: 'Heavy Items',
      type: 'Bulk Storage',
      matricule: 'HI-004',
      temperature: {
        min: 18,
        max: 28,
      },
      humidity: {
        min: 35,
        max: 55,
      },
      weightCapacity: 12000,
      dimensions: {
        length: 20,
        width: 18,
        height: 10,
      },
      saturation: 60,
    },
  ];

  const handleSort = (field: keyof Zone) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredZones = zonesData
    .filter(zone => 
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'name' || sortField === 'type' || sortField === 'matricule') {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else if (sortField === 'weightCapacity' || sortField === 'saturation') {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortDirection === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
      return 0;
    });

  const getSaturationColor = (saturation: number) => {
    if (saturation < 50) return 'bg-green-500';
    if (saturation < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSortIcon = (field: keyof Zone) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    if (sortDirection === 'asc') return <ArrowUp size={16} />;
    return <ArrowDown size={16} />;
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-wms-900">Zone Management</h2>
        <CustomButton 
          variant="accent" 
          icon={<Plus size={16} />}
          iconPosition="left"
        >
          Add Zone
        </CustomButton>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-wms-200">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-wms-400" />
          </div>
          <input
            type="text"
            placeholder="Search zones..."
            className="block w-full pl-10 pr-3 py-2 border border-wms-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-wms-accent focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-wms-accent/10 text-wms-accent' 
                : 'text-wms-600 hover:bg-wms-100'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-wms-accent/10 text-wms-accent' 
                : 'text-wms-600 hover:bg-wms-100'
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' && (
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredZones.map((zone) => (
            <motion.div key={zone.id} variants={cardVariants}>
              <CustomCard variant="default" className="h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-wms-accent/10 text-wms-accent mr-3">
                      <Warehouse size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-wms-900">{zone.name}</h3>
                      <p className="text-xs text-wms-500">{zone.matricule}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-wms-100 text-wms-700">
                    {zone.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-wms-600 text-xs">
                      <Thermometer size={14} className="mr-1.5" />
                      Temperature
                    </div>
                    <p className="text-sm font-medium text-wms-900">{zone.temperature.min}°C - {zone.temperature.max}°C</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-wms-600 text-xs">
                      <Droplets size={14} className="mr-1.5" />
                      Humidity
                    </div>
                    <p className="text-sm font-medium text-wms-900">{zone.humidity.min}% - {zone.humidity.max}%</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-wms-600 text-xs">
                      <Scale size={14} className="mr-1.5" />
                      Weight Capacity
                    </div>
                    <p className="text-sm font-medium text-wms-900">{zone.weightCapacity.toLocaleString()} kg</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-wms-600 text-xs">
                      <Box size={14} className="mr-1.5" />
                      Dimensions
                    </div>
                    <p className="text-sm font-medium text-wms-900">{zone.dimensions.length}x{zone.dimensions.width}x{zone.dimensions.height} m</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-wms-600">Saturation</span>
                    <span className="font-medium text-wms-900">{zone.saturation}%</span>
                  </div>
                  <div className="w-full bg-wms-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getSaturationColor(zone.saturation)}`}
                      style={{ width: `${zone.saturation}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-wms-200 flex justify-end space-x-2">
                  <button className="p-1.5 rounded text-wms-500 hover:text-wms-900 hover:bg-wms-100 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 rounded text-wms-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash size={16} />
                  </button>
                </div>
              </CustomCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {viewMode === 'list' && (
        <div className="bg-white overflow-x-auto rounded-lg border border-wms-200 shadow-sm">
          <table className="min-w-full divide-y divide-wms-200">
            <thead className="bg-wms-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Name</span>
                    <span className="ml-1">{getSortIcon('name')}</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('matricule')}
                >
                  <div className="flex items-center">
                    <span>Matricule</span>
                    <span className="ml-1">{getSortIcon('matricule')}</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    <span>Type</span>
                    <span className="ml-1">{getSortIcon('type')}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <span>Temperature</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <span>Humidity</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('weightCapacity')}
                >
                  <div className="flex items-center">
                    <span>Weight Capacity</span>
                    <span className="ml-1">{getSortIcon('weightCapacity')}</span>
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-wms-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('saturation')}
                >
                  <div className="flex items-center">
                    <span>Saturation</span>
                    <span className="ml-1">{getSortIcon('saturation')}</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-wms-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-wms-200">
              {filteredZones.map((zone) => (
                <motion.tr 
                  key={zone.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-wms-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-md bg-wms-accent/10 text-wms-accent">
                        <Warehouse size={16} />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-wms-900">{zone.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-wms-600">{zone.matricule}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-wms-100 text-wms-700">
                      {zone.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wms-600">
                    {zone.temperature.min}°C - {zone.temperature.max}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wms-600">
                    {zone.humidity.min}% - {zone.humidity.max}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wms-600">
                    {zone.weightCapacity.toLocaleString()} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-wms-100 rounded-full mr-2" style={{maxWidth: '100px'}}>
                        <div 
                          className={`h-2 rounded-full ${getSaturationColor(zone.saturation)}`}
                          style={{ width: `${zone.saturation}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-wms-900">{zone.saturation}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1.5 rounded text-wms-500 hover:text-wms-900 hover:bg-wms-100 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 rounded text-wms-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ZoneManagement;
