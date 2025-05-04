
import React from 'react';
import { ProfileMenu } from '@/components/navigation/ProfileMenu';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  dashboardType: 'admin' | 'moderator' | 'client';
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, dashboardType }) => {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <ProfileMenu userType={dashboardType} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
