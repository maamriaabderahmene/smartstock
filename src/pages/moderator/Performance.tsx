
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, Download, Calendar, Loader2 } from 'lucide-react';
import { usePerformanceStats } from '@/hooks/usePerformanceStats';
import { toast } from 'sonner';

const Performance = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  const {
    loading,
    ordersCount,
    deliveriesCount,
    avgCompletionTime,
    weeklyData,
    monthlyData,
    driverPerformance,
    refreshStats
  } = usePerformanceStats(timeRange);

  const handleExport = () => {
    try {
      // Create CSV content
      let csvContent = 'Name,Orders,Deliveries,Returns\n';
      const data = timeRange === 'week' ? weeklyData : monthlyData;
      
      data.forEach(item => {
        csvContent += `${item.name},${item.orders},${item.deliveries},${item.returns || 0}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `performance_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success('Performance data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  const handleChartTypeChange = (type: 'bar' | 'line') => {
    setChartType(type);
  };

  if (loading) {
    return (
      <DashboardLayout title="Performance Analytics" dashboardType="moderator">
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-wms-accent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Performance Analytics" dashboardType="moderator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold">Performance Dashboard</h2>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={refreshStats}>
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CustomCard variant="elevated" className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-wms-600">Total Orders</h3>
              <p className="text-3xl font-bold mt-2">{ordersCount}</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% from last {timeRange}</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-wms-600">Completed Deliveries</h3>
              <p className="text-3xl font-bold mt-2">{deliveriesCount}</p>
              <p className="text-sm text-green-600 mt-1">↑ 8% from last {timeRange}</p>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-wms-600">Avg Completion Time</h3>
              <p className="text-3xl font-bold mt-2">{avgCompletionTime}h</p>
              <p className="text-sm text-red-600 mt-1">↓ 0.3h from last {timeRange}</p>
            </div>
          </CustomCard>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <CustomCard variant="elevated">
                <div className="flex justify-between items-center mb-4 p-4">
                  <h3 className="font-semibold text-lg">Order Processing</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant={chartType === 'bar' ? 'default' : 'outline'} 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleChartTypeChange('bar')}
                    >
                      <BarChartIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={chartType === 'line' ? 'default' : 'outline'} 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleChartTypeChange('line')}
                    >
                      <LineChartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-80 px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#8884d8" name="Orders" />
                        <Bar dataKey="deliveries" fill="#82ca9d" name="Deliveries" />
                      </BarChart>
                    ) : (
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                        <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" name="Deliveries" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CustomCard>

              <CustomCard variant="elevated">
                <div className="flex justify-between items-center mb-4 p-4">
                  <h3 className="font-semibold text-lg">Monthly Trends</h3>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
                <div className="h-80 px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                      <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" name="Deliveries" />
                      <Line type="monotone" dataKey="returns" stroke="#ff7300" name="Returns" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CustomCard>
            </div>
          </TabsContent>
          
          <TabsContent value="drivers">
            <div className="mt-6">
              <CustomCard variant="elevated">
                <h3 className="font-semibold text-lg mb-4 p-4">Driver Performance</h3>
                <div className="h-80 px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={driverPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tasks" fill="#8884d8" name="Assigned Tasks" />
                      <Bar dataKey="completed" fill="#82ca9d" name="Completed Tasks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 border-t pt-4 p-4">
                  <h4 className="font-medium mb-2">Top Performing Drivers</h4>
                  <div className="space-y-2">
                    {driverPerformance
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 3)
                      .map((driver, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-wms-50 rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-wms-accent/20 flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <span>{driver.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{driver.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CustomCard>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory">
            <div className="mt-6">
              <CustomCard variant="elevated">
                <h3 className="font-semibold text-lg mb-4 p-4">Inventory Movement</h3>
                <p className="text-wms-600 mb-6 px-4">View inventory movement trends and analytics.</p>
                <div className="h-80 px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="orders" fill="#8884d8" name="Stock In" />
                      <Bar dataKey="returns" fill="#82ca9d" name="Stock Out" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CustomCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
