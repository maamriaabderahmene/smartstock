
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserSettings } from '@/components/settings/UserSettings';

const ControllerSettings = () => {
  return (
    <DashboardLayout title="Settings" dashboardType="controller">
      <UserSettings userType="controller" />
    </DashboardLayout>
  );
};

export default ControllerSettings;
