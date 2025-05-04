
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  FileCheck, 
  FileSearch, 
  FileX, 
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  History
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const InspectionHistory = () => {
  const [openInspection, setOpenInspection] = useState(null);
  
  const inspectionHistory = [
    {
      id: 'insp001',
      merchandise: 'Laptop Boxes',
      client: 'Tech Solutions Inc.',
      date: '2025-04-26T14:30:00',
      zone: 'A12',
      emplacement: 'E045',
      operationType: 'Stocking',
      result: 'Accepted',
      quantity: 25,
      notes: 'All items in perfect condition and properly stacked according to guidelines.'
    },
    {
      id: 'insp002',
      merchandise: 'Clothing Packages',
      client: 'Fashion Forward Co.',
      date: '2025-04-25T11:15:00',
      zone: 'B08',
      emplacement: 'E022',
      operationType: 'Destocking',
      result: 'Minor Issues',
      quantity: 40,
      notes: 'Some packages have minor damage to outer packaging but contents intact. Driver notified.'
    },
    {
      id: 'insp003',
      merchandise: 'Medical Supplies',
      client: 'HealthPlus Ltd.',
      date: '2025-04-24T09:45:00',
      zone: 'C15',
      emplacement: 'E031',
      operationType: 'Stocking',
      result: 'Rejected',
      quantity: 15,
      notes: 'Temperature requirements not met. Items returned to driver for proper handling.'
    },
    {
      id: 'insp004',
      merchandise: 'Electronic Components',
      client: 'Circuit Systems',
      date: '2025-04-23T16:20:00',
      zone: 'A05',
      emplacement: 'E018',
      operationType: 'Stocking',
      result: 'Accepted',
      quantity: 60,
      notes: 'All items properly packaged and humidity levels within acceptable range.'
    },
    {
      id: 'insp005',
      merchandise: 'Food Products',
      client: 'Fresh Foods Inc.',
      date: '2025-04-22T10:30:00',
      zone: 'D03',
      emplacement: 'E007',
      operationType: 'Destocking',
      result: 'Accepted',
      quantity: 75,
      notes: 'Items properly maintained at required temperature.'
    }
  ];
  
  const getStatusIcon = (result) => {
    switch (result) {
      case 'Accepted':
        return <FileCheck className="h-5 w-5 text-green-600" />;
      case 'Minor Issues':
        return <FileSearch className="h-5 w-5 text-yellow-600" />;
      case 'Rejected':
        return <FileX className="h-5 w-5 text-red-600" />;
      default:
        return <FileCheck className="h-5 w-5 text-green-600" />;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DashboardLayout title="Inspection History" dashboardType="controller">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Inspection History</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-wms-500" />
              <Input placeholder="Search inspections..." className="pl-9 w-full sm:w-[250px]" />
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-wms-500" />
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomCard variant="elevated" className="bg-green-50">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Accepted</h3>
                </div>
                <span className="font-bold text-lg text-green-600">
                  {inspectionHistory.filter(i => i.result === 'Accepted').length}
                </span>
              </div>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-yellow-50">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSearch className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold">Minor Issues</h3>
                </div>
                <span className="font-bold text-lg text-yellow-600">
                  {inspectionHistory.filter(i => i.result === 'Minor Issues').length}
                </span>
              </div>
            </div>
          </CustomCard>
          
          <CustomCard variant="elevated" className="bg-red-50">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileX className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold">Rejected</h3>
                </div>
                <span className="font-bold text-lg text-red-600">
                  {inspectionHistory.filter(i => i.result === 'Rejected').length}
                </span>
              </div>
            </div>
          </CustomCard>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stocking">Stocking</TabsTrigger>
            <TabsTrigger value="destocking">Destocking</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {inspectionHistory.map((inspection) => (
              <Collapsible
                key={inspection.id}
                open={openInspection === inspection.id}
                onOpenChange={(open) => setOpenInspection(open ? inspection.id : null)}
              >
                <CustomCard variant="elevated" className="overflow-hidden">
                  <CollapsibleTrigger asChild className="cursor-pointer w-full text-left">
                    <div className="flex items-center justify-between p-4 hover:bg-wms-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          inspection.result === 'Accepted' ? 'bg-green-100' : 
                          inspection.result === 'Minor Issues' ? 'bg-yellow-100' : 
                          'bg-red-100'
                        }`}>
                          {getStatusIcon(inspection.result)}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{inspection.merchandise}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              inspection.operationType === 'Stocking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {inspection.operationType}
                            </span>
                          </div>
                          <p className="text-sm text-wms-600">
                            {formatDate(inspection.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-2 hidden sm:block">
                          <div>Zone: {inspection.zone}</div>
                          <div>{inspection.client}</div>
                        </div>
                        {openInspection === inspection.id ? (
                          <ChevronUp className="h-5 w-5 text-wms-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-wms-500" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t border-wms-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Inspection Details</h4>
                          <div className="space-y-1 text-sm">
                            <div><span className="font-medium">Client:</span> {inspection.client}</div>
                            <div><span className="font-medium">Merchandise:</span> {inspection.merchandise}</div>
                            <div><span className="font-medium">Quantity:</span> {inspection.quantity} units</div>
                            <div><span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}</div>
                            <div><span className="font-medium">Operation:</span> {inspection.operationType}</div>
                            <div><span className="font-medium">Date:</span> {formatDate(inspection.date)}</div>
                            <div><span className="font-medium">Result:</span> {inspection.result}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p className="text-sm whitespace-pre-wrap bg-wms-50 p-3 rounded-md">
                            {inspection.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CustomCard>
              </Collapsible>
            ))}
          </TabsContent>
          
          <TabsContent value="stocking" className="space-y-4">
            {inspectionHistory.filter(i => i.operationType === 'Stocking').map((inspection) => (
              <Collapsible
                key={inspection.id}
                open={openInspection === inspection.id}
                onOpenChange={(open) => setOpenInspection(open ? inspection.id : null)}
              >
                <CustomCard variant="elevated" className="overflow-hidden">
                  <CollapsibleTrigger asChild className="cursor-pointer w-full text-left">
                    <div className="flex items-center justify-between p-4 hover:bg-wms-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          inspection.result === 'Accepted' ? 'bg-green-100' : 
                          inspection.result === 'Minor Issues' ? 'bg-yellow-100' : 
                          'bg-red-100'
                        }`}>
                          {getStatusIcon(inspection.result)}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{inspection.merchandise}</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                              {inspection.operationType}
                            </span>
                          </div>
                          <p className="text-sm text-wms-600">
                            {formatDate(inspection.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-2 hidden sm:block">
                          <div>Zone: {inspection.zone}</div>
                          <div>{inspection.client}</div>
                        </div>
                        {openInspection === inspection.id ? (
                          <ChevronUp className="h-5 w-5 text-wms-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-wms-500" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t border-wms-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Inspection Details</h4>
                          <div className="space-y-1 text-sm">
                            <div><span className="font-medium">Client:</span> {inspection.client}</div>
                            <div><span className="font-medium">Merchandise:</span> {inspection.merchandise}</div>
                            <div><span className="font-medium">Quantity:</span> {inspection.quantity} units</div>
                            <div><span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}</div>
                            <div><span className="font-medium">Operation:</span> {inspection.operationType}</div>
                            <div><span className="font-medium">Date:</span> {formatDate(inspection.date)}</div>
                            <div><span className="font-medium">Result:</span> {inspection.result}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p className="text-sm whitespace-pre-wrap bg-wms-50 p-3 rounded-md">
                            {inspection.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CustomCard>
              </Collapsible>
            ))}
          </TabsContent>
          
          <TabsContent value="destocking" className="space-y-4">
            {inspectionHistory.filter(i => i.operationType === 'Destocking').map((inspection) => (
              <Collapsible
                key={inspection.id}
                open={openInspection === inspection.id}
                onOpenChange={(open) => setOpenInspection(open ? inspection.id : null)}
              >
                <CustomCard variant="elevated" className="overflow-hidden">
                  <CollapsibleTrigger asChild className="cursor-pointer w-full text-left">
                    <div className="flex items-center justify-between p-4 hover:bg-wms-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          inspection.result === 'Accepted' ? 'bg-green-100' : 
                          inspection.result === 'Minor Issues' ? 'bg-yellow-100' : 
                          'bg-red-100'
                        }`}>
                          {getStatusIcon(inspection.result)}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{inspection.merchandise}</span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                              {inspection.operationType}
                            </span>
                          </div>
                          <p className="text-sm text-wms-600">
                            {formatDate(inspection.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-2 hidden sm:block">
                          <div>Zone: {inspection.zone}</div>
                          <div>{inspection.client}</div>
                        </div>
                        {openInspection === inspection.id ? (
                          <ChevronUp className="h-5 w-5 text-wms-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-wms-500" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t border-wms-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Inspection Details</h4>
                          <div className="space-y-1 text-sm">
                            <div><span className="font-medium">Client:</span> {inspection.client}</div>
                            <div><span className="font-medium">Merchandise:</span> {inspection.merchandise}</div>
                            <div><span className="font-medium">Quantity:</span> {inspection.quantity} units</div>
                            <div><span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}</div>
                            <div><span className="font-medium">Operation:</span> {inspection.operationType}</div>
                            <div><span className="font-medium">Date:</span> {formatDate(inspection.date)}</div>
                            <div><span className="font-medium">Result:</span> {inspection.result}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p className="text-sm whitespace-pre-wrap bg-wms-50 p-3 rounded-md">
                            {inspection.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CustomCard>
              </Collapsible>
            ))}
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            {inspectionHistory.filter(i => i.result === 'Rejected').map((inspection) => (
              <Collapsible
                key={inspection.id}
                open={openInspection === inspection.id}
                onOpenChange={(open) => setOpenInspection(open ? inspection.id : null)}
              >
                <CustomCard variant="elevated" className="overflow-hidden">
                  <CollapsibleTrigger asChild className="cursor-pointer w-full text-left">
                    <div className="flex items-center justify-between p-4 hover:bg-wms-50">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-red-100">
                          <FileX className="h-5 w-5 text-red-600" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{inspection.merchandise}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              inspection.operationType === 'Stocking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {inspection.operationType}
                            </span>
                          </div>
                          <p className="text-sm text-wms-600">
                            {formatDate(inspection.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-sm text-right mr-2 hidden sm:block">
                          <div>Zone: {inspection.zone}</div>
                          <div>{inspection.client}</div>
                        </div>
                        {openInspection === inspection.id ? (
                          <ChevronUp className="h-5 w-5 text-wms-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-wms-500" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t border-wms-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Inspection Details</h4>
                          <div className="space-y-1 text-sm">
                            <div><span className="font-medium">Client:</span> {inspection.client}</div>
                            <div><span className="font-medium">Merchandise:</span> {inspection.merchandise}</div>
                            <div><span className="font-medium">Quantity:</span> {inspection.quantity} units</div>
                            <div><span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}</div>
                            <div><span className="font-medium">Operation:</span> {inspection.operationType}</div>
                            <div><span className="font-medium">Date:</span> {formatDate(inspection.date)}</div>
                            <div><span className="font-medium">Result:</span> {inspection.result}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Notes</h4>
                          <p className="text-sm whitespace-pre-wrap bg-wms-50 p-3 rounded-md">
                            {inspection.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CustomCard>
              </Collapsible>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InspectionHistory;
