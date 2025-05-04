
import React from 'react';
import { UserProfile } from '@/components/settings/UserProfile';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ProfilePageProps {
  userType: 'admin' | 'moderator' | 'client' | 'driver' | 'controller';
}

export const ProfilePage = ({ userType }: ProfilePageProps) => {
  return (
    <DashboardLayout title="Profile" dashboardType={userType}>
      <div className="max-w-4xl mx-auto">
        <UserProfile userType={userType} />
      </div>
    </DashboardLayout>
  );
};
