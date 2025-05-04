
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { useToast } from '@/hooks/use-toast';
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
  Shield,
  Server
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Zone {
  id: string;
  name: string;
  type: 'Standard' | 'Cold Storage' | 'Bulk Storage';
  matricule: string;
  capacity: number;
  utilizationPercentage: number;
  temperature?: {
    min: number;
    max: number;
  };
  humidity?: {
    min: number;
    max: number;
  };
}

const ZoneManagement = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<keyof Zone>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Mock data for demonstration
  const zones: Zone[] = [
    {
      id: '1',
      name: 'General Storage A1',
      type: 'Standard',
      matricule: 'GS-001',
      capacity: 1000,
      utilizationPercentage: 75,
    },
    {
      id: '2',
      name: 'Cold Storage B2',
      type: 'Cold Storage',
      matricule: 'CS-002',
      capacity: 500,
      utilizationPercentage: 60,
      temperature: {
        min: 2,
        max: 8
      },
      humidity: {
        min: 40,
        max: 60
      }
    },
    {
      id: '3',
      name: 'Bulk Zone C3',
      type: 'Bulk Storage',
      matricule: 'BZ-003',
      capacity: 2000,
      utilizationPercentage: 45,
    }
  ];

  const filteredZones = zones
    .filter(zone =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] < b[sortField] ? -1 : 1;
      }
      return a[sortField] > b[sortField] ? -1 : 1;
    });

  const handleSort = (field: keyof Zone) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout title="Zone Management" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <CustomButton
              variant="accent"
              onClick={() => toast({
                title: "Add Zone",
                description: "Zone creation functionality coming soon"
              })}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Zone
            </CustomButton>
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredZones.map((zone) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <CustomCard className="h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                        <p className="text-sm text-gray-500">{zone.matricule}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {zone.type}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Capacity</span>
                          <span className="font-medium">{zone.capacity} units</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Utilization</span>
                          <span className="font-medium">{zone.utilizationPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getUtilizationColor(zone.utilizationPercentage)}`}
                            style={{ width: `${zone.utilizationPercentage}%` }}
                          />
                        </div>
                      </div>

                      {zone.temperature && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Temperature Range</span>
                          <span className="font-medium">
                            {zone.temperature.min}°C - {zone.temperature.max}°C
                          </span>
                        </div>
                      )}

                      {zone.humidity && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Humidity Range</span>
                          <span className="font-medium">
                            {zone.humidity.min}% - {zone.humidity.max}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      onClick={() => toast({
                        title: "Edit Zone",
                        description: "Zone editing functionality coming soon"
                      })}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => toast({
                        title: "Delete Zone",
                        description: "Zone deletion functionality coming soon"
                      })}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </CustomCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <CustomCard>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center gap-2"
                        onClick={() => handleSort('name')}
                      >
                        Name
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        className="flex items-center gap-2"
                        onClick={() => handleSort('matricule')}
                      >
                        Matricule
                        <ArrowUpDown size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredZones.map((zone) => (
                    <tr key={zone.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Server className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {zone.matricule}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                          {zone.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {zone.capacity} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mr-2" style={{ width: '100px' }}>
                            <div
                              className={`h-full ${getUtilizationColor(zone.utilizationPercentage)}`}
                              style={{ width: `${zone.utilizationPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{zone.utilizationPercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toast({
                              title: "Edit Zone",
                              description: "Zone editing functionality coming soon"
                            })}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => toast({
                              title: "Delete Zone",
                              description: "Zone deletion functionality coming soon"
                            })}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CustomCard>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ZoneManagement;
