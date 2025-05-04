
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import { CustomCard } from '@/components/ui/custom-card';
import { Calendar } from '@/components/ui/calendar';
import { FileText, Package, Truck, Loader2 } from 'lucide-react';
import { PendingOrdersCard } from '@/components/moderator/PendingOrdersCard';
import { InspectionRequiredCard } from '@/components/moderator/InspectionRequiredCard';
import { DriverAssignmentsCard } from '@/components/moderator/DriverAssignmentsCard';
import { RecentActivityCard } from '@/components/moderator/RecentActivityCard';

const ModeratorDashboard = () => {
  return (
    <DashboardLayout title="Moderator Dashboard" dashboardType="moderator">
      <div className="space-y-6">
        {/* Overview Cards */}
        <OverviewCards dashboardType="moderator" />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pending Orders Card */}
          <PendingOrdersCard />

          {/* Calendar Card */}
          <CustomCard variant="elevated">
            <h3 className="text-lg font-semibold m-4">Calendar</h3>
            <div className="p-4">
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </div>
          </CustomCard>

          {/* Inspections Required Card */}
          <InspectionRequiredCard />

          {/* Driver Assignments Card */}
          <DriverAssignmentsCard />

          {/* Recent Activity Card */}
          <RecentActivityCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModeratorDashboard;
