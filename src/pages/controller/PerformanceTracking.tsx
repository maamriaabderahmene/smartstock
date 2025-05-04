
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileCheck, FileX, FileSearch, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PerformanceTracking = () => {
  const [period, setPeriod] = useState('week');

  // Sample data for charts
  const dailyData = [
    { date: 'Mon', accepted: 5, minorIssues: 2, rejected: 1, total: 8 },
    { date: 'Tue', accepted: 7, minorIssues: 1, rejected: 0, total: 8 },
    { date: 'Wed', accepted: 6, minorIssues: 3, rejected: 1, total: 10 },
    { date: 'Thu', accepted: 4, minorIssues: 2, rejected: 0, total: 6 },
    { date: 'Fri', accepted: 8, minorIssues: 1, rejected: 2, total: 11 },
    { date: 'Sat', accepted: 3, minorIssues: 1, rejected: 0, total: 4 },
    { date: 'Sun', accepted: 2, minorIssues: 0, rejected: 0, total: 2 },
  ];

  const weeklyData = [
    { date: 'Week 1', accepted: 32, minorIssues: 10, rejected: 3, total: 45 },
    { date: 'Week 2', accepted: 28, minorIssues: 12, rejected: 5, total: 45 },
    { date: 'Week 3', accepted: 35, minorIssues: 8, rejected: 4, total: 47 },
    { date: 'Week 4', accepted: 30, minorIssues: 7, rejected: 2, total: 39 },
  ];

  const monthlyData = [
    { date: 'Jan', accepted: 120, minorIssues: 40, rejected: 15, total: 175 },
    { date: 'Feb', accepted: 110, minorIssues: 35, rejected: 10, total: 155 },
    { date: 'Mar', accepted: 125, minorIssues: 38, rejected: 12, total: 175 },
    { date: 'Apr', accepted: 135, minorIssues: 42, rejected: 8, total: 185 },
  ];

  const getChartData = () => {
    switch (period) {
      case 'day': return dailyData;
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      default: return weeklyData;
    }
  };

  const chartData = getChartData();
  
  // Calculate summary stats
  const totalInspections = chartData.reduce((sum, item) => sum + item.total, 0);
  const totalAccepted = chartData.reduce((sum, item) => sum + item.accepted, 0);
  const totalMinorIssues = chartData.reduce((sum, item) => sum + item.minorIssues, 0);
  const totalRejected = chartData.reduce((sum, item) => sum + item.rejected, 0);
  const acceptRate = totalInspections > 0 ? (totalAccepted / totalInspections * 100).toFixed(1) : 0;
  
  // Pie chart data
  const pieData = [
    { name: 'Accepted', value: totalAccepted, color: '#22c55e' },
    { name: 'Minor Issues', value: totalMinorIssues, color: '#eab308' },
    { name: 'Rejected', value: totalRejected, color: '#ef4444' },
  ];

  // Time data
  const timeData = [
    { name: 'Avg. Time Per Inspection', value: period === 'month' ? '18 min' : period === 'week' ? '16 min' : '15 min' },
    { name: 'Fastest Inspection', value: period === 'month' ? '8 min' : period === 'week' ? '7 min' : '9 min' },
    { name: 'Longest Inspection', value: period === 'month' ? '45 min' : period === 'week' ? '32 min' : '28 min' },
  ];

  return (
    <DashboardLayout title="Performance Tracking" dashboardType="controller">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-wms-600" />
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CustomCard variant="elevated" className="bg-wms-50">
            <div className="p-4 text-center">
              <h3 className="text-sm font-medium text-wms-600">Total Inspections</h3>
              <p className="mt-1 text-3xl font-bold">{totalInspections}</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-green-50">
            <div className="p-4 text-center">
              <div className="flex justify-center items-center space-x-2">
                <FileCheck className="h-4 w-4 text-green-600" />
                <h3 className="text-sm font-medium text-wms-600">Accepted</h3>
              </div>
              <p className="mt-1 text-3xl font-bold text-green-700">{totalAccepted}</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-yellow-50">
            <div className="p-4 text-center">
              <div className="flex justify-center items-center space-x-2">
                <FileSearch className="h-4 w-4 text-yellow-600" />
                <h3 className="text-sm font-medium text-wms-600">Minor Issues</h3>
              </div>
              <p className="mt-1 text-3xl font-bold text-yellow-700">{totalMinorIssues}</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-red-50">
            <div className="p-4 text-center">
              <div className="flex justify-center items-center space-x-2">
                <FileX className="h-4 w-4 text-red-600" />
                <h3 className="text-sm font-medium text-wms-600">Rejected</h3>
              </div>
              <p className="mt-1 text-3xl font-bold text-red-700">{totalRejected}</p>
            </div>
          </CustomCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CustomCard variant="elevated" className="lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Inspections by Outcome</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accepted" name="Accepted" fill="#22c55e" stackId="a" />
                    <Bar dataKey="minorIssues" name="Minor Issues" fill="#eab308" stackId="a" />
                    <Bar dataKey="rejected" name="Rejected" fill="#ef4444" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CustomCard>

          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6 text-center">Inspection Results</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-wms-600">Acceptance Rate</p>
                <p className="text-2xl font-bold text-wms-900">{acceptRate}%</p>
              </div>
            </div>
          </CustomCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Time Metrics</h3>
              <div className="space-y-4">
                {timeData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-wms-50 rounded-md">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CustomCard>

          <CustomCard variant="elevated">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
              
              <Tabs defaultValue="summary">
                <TabsList className="mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>High acceptance rate ({acceptRate}%)</li>
                      <li>Consistent inspection quality</li>
                      <li>Below average inspection time</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold flex items-center">
                      <FileSearch className="h-4 w-4 mr-2 text-yellow-600" />
                      Areas for Improvement
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>Higher than average minor issues rate</li>
                      <li>Some variability in inspection speed</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <div className="p-4 bg-wms-50 rounded-lg border border-wms-200">
                    <h4 className="font-semibold">Recommendations</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>Follow the updated inspection checklist for {period === 'month' ? 'food products' : 'electronics'}</li>
                      <li>Consider spending more time on merchandise verification step</li>
                      <li>Review common issues found in zones B and C</li>
                      <li>Schedule training on the new scanning equipment</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CustomCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PerformanceTracking;
