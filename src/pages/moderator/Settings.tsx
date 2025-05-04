
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserSettings } from '@/components/settings/UserSettings';

const Settings = () => {
  return (
    <DashboardLayout title="Settings" dashboardType="moderator">
      <UserSettings userType="moderator" />
    </DashboardLayout>
  );
};

export default Settings;
