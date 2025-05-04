
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserSettings } from '@/components/settings/UserSettings';

const ClientSettings = () => {
  return (
    <DashboardLayout title="Settings" dashboardType="client">
      <UserSettings userType="client" />
    </DashboardLayout>
  );
};

export default ClientSettings;
