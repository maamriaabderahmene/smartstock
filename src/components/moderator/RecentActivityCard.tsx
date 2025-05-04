
import React from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { FileText, Loader2 } from 'lucide-react';
import { useRecentActivity } from '@/hooks/useRecentActivity';

export const RecentActivityCard = () => {
  const { activities, loading } = useRecentActivity();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.round(diffMs / 1000);
    const diffMins = Math.round(diffSecs / 60);
    const diffHours = Math.round(diffMins / 60);
    
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.round(diffHours / 24)} days ago`;
  };

  return (
    <CustomCard variant="elevated">
      <h3 className="text-lg font-semibold m-4">Recent Activity</h3>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4 p-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="p-2 bg-wms-accent/10 rounded-md">
                <FileText className="h-5 w-5 text-wms-accent" />
              </div>
              <div>
                <p className="font-medium">
                  {activity.title}
                  {activity.driverName && ` by ${activity.driverName}`}
                </p>
                <p className="text-sm text-wms-600">{formatTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <FileText className="h-12 w-12 text-wms-500/50 mb-2" />
          <p className="text-lg font-medium text-wms-500">No recent activity</p>
          <p className="text-sm text-wms-400">No activity has been recorded.</p>
        </div>
      )}
    </CustomCard>
  );
};
