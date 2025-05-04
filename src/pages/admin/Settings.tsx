
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserSettings } from '@/components/settings/UserSettings';

const Settings = () => {
  return (
    <DashboardLayout title="Settings" dashboardType="admin">
      <UserSettings userType="admin" />
    </DashboardLayout>
  );
};

export default Settings;
