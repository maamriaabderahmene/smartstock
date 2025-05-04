
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowRight, 
  Package, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Zap, 
  Plus,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import ZoneManagement from '@/components/dashboard/ZoneManagement';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRecentActivity } from '@/hooks/useRecentActivity';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { useZoneData } from '@/hooks/useZoneData';

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('Last 12 Months');
  const [zoneFilter, setZoneFilter] = useState<string>('All Zones');
  const { activities, loading: activitiesLoading, refreshActivity } = useRecentActivity();
  const { performanceData, loading: performanceLoading } = usePerformanceData(timeRange);
  const { zoneSaturationData, loading: zoneDataLoading } = useZoneData(zoneFilter);

  return (
    <DashboardLayout title="Administrator Dashboard" dashboardType="admin">
      <div className="space-y-6">
        <OverviewCards dashboardType="admin" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <CustomCard variant="elevated" className="h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-wms-900">Performance Metrics</h3>
                  <p className="text-sm text-wms-500">Role-based efficiency over time</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <select 
                    className="text-sm border border-wms-200 rounded-md py-1.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent focus:border-transparent"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option>Last 12 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
              </div>
              
              <div className="h-80">
                {performanceLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Loading performance data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                        }}
                        formatter={(value) => [`${value}%`, '']}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="warehouse" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} name="Warehouse Ops" />
                      <Line type="monotone" dataKey="shipping" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} name="Shipping" />
                      <Line type="monotone" dataKey="inventory" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} name="Inventory Mgmt" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CustomCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <CustomCard variant="elevated" className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-wms-900">Recent Activity</h3>
                  <p className="text-sm text-wms-500">Latest events in the warehouse</p>
                </div>
                <div>
                  <Link to="/admin/activity" className="text-wms-accent text-sm font-medium hover:underline">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                {activitiesLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <p>Loading activities...</p>
                  </div>
                ) : activities.length > 0 ? (
                  activities.slice(0, 5).map((activity) => {
                    // Determine icon based on activity type
                    let icon = <Package size={18} />;
                    let colorClass = 'text-blue-500';
                    
                    if (activity.title.toLowerCase().includes('task')) {
                      icon = <Zap size={18} />;
                      colorClass = 'text-green-500';
                    } else if (activity.title.toLowerCase().includes('inspection')) {
                      icon = <Clock size={18} />;
                      colorClass = 'text-wms-accent';
                    } else if (activity.title.toLowerCase().includes('order')) {
                      icon = <Package size={18} />;
                      colorClass = 'text-yellow-500';
                    }
                    
                    return (
                      <div key={activity.id} className="flex items-start">
                        <div className={`p-2 rounded-full ${colorClass.replace('text', 'bg')}/10 ${colorClass} mr-3 mt-0.5`}>
                          {icon}
                        </div>
                        <div>
                          <p className="text-wms-700 text-sm">{activity.title}</p>
                          <p className="text-wms-500 text-xs">
                            {new Date(activity.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500">No recent activity found</p>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-wms-200">
                <div className="flex items-center">
                  <Calendar size={16} className="text-wms-500 mr-2" />
                  <span className="text-sm text-wms-500">Today, {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CustomCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <CustomCard variant="elevated">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-wms-900">Zone Saturation</h3>
                <p className="text-sm text-wms-500">Current storage utilization by zone</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <select 
                  className="text-sm border border-wms-200 rounded-md py-1.5 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent focus:border-transparent"
                  value={zoneFilter}
                  onChange={(e) => setZoneFilter(e.target.value)}
                >
                  <option>All Zones</option>
                  <option>Standard</option>
                  <option>Cold Storage</option>
                  <option>Bulk Storage</option>
                </select>
              </div>
            </div>
            
            <div className="h-80">
              {zoneDataLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading zone data...</p>
                </div>
              ) : zoneSaturationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={zoneSaturationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                      }}
                      formatter={(value) => [`${value}%`, 'Saturation']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="url(#colorGradient)" 
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3182ce" />
                        <stop offset="100%" stopColor="#63b3ed" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No zone data available</p>
                  <Link to="/admin/zones/new" className="mt-2 text-wms-accent hover:underline">
                    Add your first zone
                  </Link>
                </div>
              )}
            </div>
          </CustomCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <ZoneManagement />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
