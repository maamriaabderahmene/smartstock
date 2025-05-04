
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Calendar } from '@/components/ui/calendar';
import { FileSearch, AlertTriangle, Loader2, Check } from 'lucide-react';
import { useInspectionRequired } from '@/hooks/useInspectionRequired';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const InspectionRequiredCard = () => {
  const { inspectionItems, validatedToday, loading, refreshInspections } = useInspectionRequired();
  
  // Only show up to 3 inspection items on the dashboard
  const displayedItems = inspectionItems.slice(0, 3);
  const hasMoreItems = inspectionItems.length > 3;

  return (
    <CustomCard variant="elevated" className="col-span-2">
      <div className="flex justify-between items-center m-4">
        <div className="flex items-center">
          <div className="p-2 bg-wms-accent/10 rounded-md mr-2">
            <FileSearch className="h-5 w-5 text-wms-accent" />
          </div>
          <h3 className="text-lg font-semibold">Inspections Required</h3>
        </div>
        <div className="flex items-center">
          <span className="text-wms-600 mr-2">Validated today:</span>
          <span className="text-wms-accent font-semibold">{validatedToday}</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
        </div>
      ) : displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          <div className="lg:col-span-2 space-y-4">
            {displayedItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex justify-between items-center p-3 bg-wms-50 rounded-md border border-wms-200">
                <div className="flex items-center">
                  <div className={cn(
                    "p-1.5 rounded-full mr-3",
                    item.daysOverdue > 14 ? "bg-red-200 text-red-800" : "bg-amber-200 text-amber-800"
                  )}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-wms-600">
                      {item.type === 'zone' ? 'Zone' : 'Merchandise'} • 
                      Last inspected: {item.lastInspected ? format(item.lastInspected, 'MMM d, yyyy') : 'Never'}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  item.daysOverdue > 14 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                )}>
                  {item.daysOverdue} days overdue
                </div>
              </div>
            ))}
            
            {hasMoreItems && (
              <button 
                className="w-full py-2 text-center text-wms-accent hover:text-wms-accent/70 text-sm font-medium" 
                onClick={() => {/* View all inspections logic */}}
              >
                View all {inspectionItems.length} inspections required
              </button>
            )}
          </div>
          
          <div>
            <Calendar
              mode="single"
              className="rounded-md border"
              modifiers={{
                booked: inspectionItems.map(item => item.lastInspected).filter(Boolean) as Date[]
              }}
              modifiersStyles={{
                booked: { backgroundColor: 'rgba(var(--wms-accent) / 0.1)' }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-lg font-medium text-wms-500">All inspections are up to date</p>
          <p className="text-sm text-wms-400">No items require inspection at this time.</p>
        </div>
      )}
    </CustomCard>
  );
};
