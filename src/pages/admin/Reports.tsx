
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Calendar, Download, Filter, Search, FileText, BarChart2, Clipboard } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for reports
const monthlyData = [
  { name: 'Jan', stocking: 65, destocking: 42 },
  { name: 'Feb', stocking: 59, destocking: 38 },
  { name: 'Mar', stocking: 80, destocking: 56 },
  { name: 'Apr', stocking: 81, destocking: 40 },
  { name: 'May', stocking: 56, destocking: 30 },
  { name: 'Jun', stocking: 55, destocking: 45 },
  { name: 'Jul', stocking: 60, destocking: 35 },
  { name: 'Aug', stocking: 65, destocking: 48 },
  { name: 'Sep', stocking: 70, destocking: 50 },
  { name: 'Oct', stocking: 68, destocking: 55 },
  { name: 'Nov', stocking: 75, destocking: 62 },
  { name: 'Dec', stocking: 90, destocking: 78 },
];

const reportTypes = [
  { name: 'Stock Movement', icon: <FileText size={16} />, description: 'Stocking/destocking activity report' },
  { name: 'Zone Utilization', icon: <BarChart2 size={16} />, description: 'Storage space usage over time' },
  { name: 'Staff Performance', icon: <Clipboard size={16} />, description: 'Staff efficiency metrics' },
];

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('Stock Movement');
  const [dateRange, setDateRange] = useState('Last 12 Months');

  return (
    <DashboardLayout title="Reports" dashboardType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Reports Dashboard</h2>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-wms-accent w-full sm:w-auto"
              />
            </div>
            
            <select className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-wms-accent">
              <option value="12">Last 12 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="3">Last 3 Months</option>
              <option value="1">Last Month</option>
            </select>
            
            <CustomButton variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </CustomButton>
            
            <CustomButton variant="accent" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </CustomButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <CustomCard 
              key={report.name}
              className={`cursor-pointer transition-all ${selectedReportType === report.name ? 'ring-2 ring-wms-accent bg-wms-50' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedReportType(report.name)}
            >
              <div className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-full ${selectedReportType === report.name ? 'bg-wms-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {report.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
            </CustomCard>
          ))}
        </div>
        
        <CustomCard>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedReportType}</h3>
                <p className="text-sm text-gray-500">Showing data for {dateRange}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedReportType === 'Stock Movement' ? (
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stocking" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      name="Stocking"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="destocking" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }}
                      name="Destocking"
                    />
                  </LineChart>
                ) : (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="stocking" fill="#3b82f6" name="Stocking" />
                    <Bar dataKey="destocking" fill="#ef4444" name="Destocking" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </CustomCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium">Monthly Inventory Report</h4>
                        <p className="text-sm text-gray-500">Generated {4 - item} days ago</p>
                      </div>
                    </div>
                    <CustomButton variant="ghost" size="sm">
                      <Download size={16} />
                    </CustomButton>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>
          
          <CustomCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Scheduled Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md border border-gray-200">
                  <div>
                    <h4 className="font-medium">Weekly Performance Summary</h4>
                    <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border border-gray-200">
                  <div>
                    <h4 className="font-medium">Monthly Inventory Status</h4>
                    <p className="text-sm text-gray-500">1st day of each month</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border border-gray-200">
                  <div>
                    <h4 className="font-medium">Quarterly Financial Report</h4>
                    <p className="text-sm text-gray-500">Last day of each quarter</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Pending</span>
                </div>
              </div>
            </div>
          </CustomCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
