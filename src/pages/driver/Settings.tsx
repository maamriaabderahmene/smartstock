
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserSettings } from '@/components/settings/UserSettings';

const Settings = () => {
  return (
    <DashboardLayout title="Settings" dashboardType="driver">
      <UserSettings userType="driver" />
    </DashboardLayout>
  );
};

export default Settings;
