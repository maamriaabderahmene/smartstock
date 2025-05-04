
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Download, ChevronDown, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Activity, Clock, Users, Package } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';

// Mock data for Analytics
const performanceData = [
  { name: 'Jan', warehouse: 65, shipping: 28, inventory: 85 },
  { name: 'Feb', warehouse: 59, shipping: 48, inventory: 81 },
  { name: 'Mar', warehouse: 80, shipping: 40, inventory: 65 },
  { name: 'Apr', warehouse: 81, shipping: 47, inventory: 88 },
  { name: 'May', warehouse: 56, shipping: 35, inventory: 72 },
  { name: 'Jun', warehouse: 55, shipping: 30, inventory: 60 },
  { name: 'Jul', warehouse: 40, shipping: 35, inventory: 62 },
  { name: 'Aug', warehouse: 45, shipping: 38, inventory: 68 },
  { name: 'Sep', warehouse: 50, shipping: 42, inventory: 75 },
  { name: 'Oct', warehouse: 60, shipping: 45, inventory: 80 },
  { name: 'Nov', warehouse: 65, shipping: 48, inventory: 82 },
  { name: 'Dec', warehouse: 70, shipping: 52, inventory: 85 },
];

const zoneUtilizationData = [
  { name: 'Zone A', value: 35 },
  { name: 'Zone B', value: 25 },
  { name: 'Zone C', value: 20 },
  { name: 'Zone D', value: 10 },
  { name: 'Zone E', value: 10 },
];

const pieColors = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ef4444'];

const staffPerformanceData = [
  { name: 'Week 1', drivers: 68, controllers: 72, moderators: 80 },
  { name: 'Week 2', drivers: 72, controllers: 75, moderators: 82 },
  { name: 'Week 3', drivers: 75, controllers: 71, moderators: 85 },
  { name: 'Week 4', drivers: 78, controllers: 73, moderators: 88 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('Last 12 Months');
  
  return (
    <DashboardLayout title="Analytics" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-md">
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 border-r border-gray-200">
                <Calendar size={16} />
                {timeRange}
                <ChevronDown size={14} />
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomCard>
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Warehouse Efficiency</p>
                  <p className="text-2xl font-semibold mt-1">92%</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUpRight size={16} />
                <span className="ml-1">8% from last month</span>
              </div>
            </div>
          </CustomCard>
          
          <CustomCard>
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Space Utilization</p>
                  <p className="text-2xl font-semibold mt-1">78%</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-700">
                  <Activity size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUpRight size={16} />
                <span className="ml-1">5% from last month</span>
              </div>
            </div>
          </CustomCard>
          
          <CustomCard>
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order Processing Time</p>
                  <p className="text-2xl font-semibold mt-1">3.5 hours</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-700">
                  <Clock size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowDownRight size={16} />
                <span className="ml-1">12% faster than target</span>
              </div>
            </div>
          </CustomCard>
          
          <CustomCard>
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Staff Productivity</p>
                  <p className="text-2xl font-semibold mt-1">85%</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                  <Users size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-red-600">
                <TrendingDown size={16} />
                <span className="ml-1">3% from last month</span>
              </div>
            </div>
          </CustomCard>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CustomCard className="lg:col-span-2">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Operational Performance</h3>
                  <p className="text-sm text-gray-500">Efficiency metrics by department</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent">
                    <option value="12">Last 12 Months</option>
                    <option value="6">Last 6 Months</option>
                    <option value="3">Last Quarter</option>
                  </select>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="warehouse" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} name="Warehouse Ops" />
                    <Line type="monotone" dataKey="shipping" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} name="Shipping" />
                    <Line type="monotone" dataKey="inventory" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} name="Inventory Mgmt" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CustomCard>

          <CustomCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Zone Utilization</h3>
                  <p className="text-sm text-gray-500">Current storage allocation</p>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={zoneUtilizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {zoneUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value}%`, 'Utilization']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CustomCard>
        </div>

        <CustomCard>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Staff Performance</h3>
                <p className="text-sm text-gray-500">Last 4 weeks efficiency metrics</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <CustomButton variant="outline" size="sm">
                  Detailed Report
                </CustomButton>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={staffPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar dataKey="drivers" fill="#3b82f6" name="Drivers" />
                  <Bar dataKey="controllers" fill="#10b981" name="Controllers" />
                  <Bar dataKey="moderators" fill="#8b5cf6" name="Moderators" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CustomCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Zones</h3>
              <div className="space-y-4">
                {['Zone C', 'Zone A', 'Zone E', 'Zone B'].map((zone, index) => (
                  <div key={zone} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-200 text-gray-700' :
                        index === 2 ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{zone}</p>
                        <p className="text-xs text-gray-500">
                          {index === 0 ? '97% efficiency' :
                           index === 1 ? '94% efficiency' :
                           index === 2 ? '91% efficiency' :
                           '88% efficiency'}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm ${
                      index === 0 ? 'text-green-600' :
                      index === 1 ? 'text-green-600' :
                      index === 2 ? 'text-green-600' :
                      'text-amber-600'
                    }`}>
                      {index === 0 ? '↑ 12%' :
                       index === 1 ? '↑ 8%' :
                       index === 2 ? '↑ 5%' :
                       '↑ 2%'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>

          <CustomCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="p-3 rounded-md bg-blue-50 border border-blue-100">
                  <div className="flex items-start">
                    <TrendingUp className="text-blue-500 mr-3 mt-0.5" size={18} />
                    <div>
                      <p className="font-medium text-blue-700">Warehouse efficiency improved</p>
                      <p className="text-sm text-blue-600 mt-1">Overall warehouse efficiency has improved by 8% this quarter compared to last quarter.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-yellow-50 border border-yellow-100">
                  <div className="flex items-start">
                    <Activity className="text-yellow-500 mr-3 mt-0.5" size={18} />
                    <div>
                      <p className="font-medium text-yellow-700">Zone B reaching capacity</p>
                      <p className="text-sm text-yellow-600 mt-1">Zone B is at 92% capacity. Consider redistributing items or expanding storage.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-green-50 border border-green-100">
                  <div className="flex items-start">
                    <Clock className="text-green-500 mr-3 mt-0.5" size={18} />
                    <div>
                      <p className="font-medium text-green-700">Processing time reduced</p>
                      <p className="text-sm text-green-600 mt-1">Average order processing time has decreased from 4.2 to 3.5 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
