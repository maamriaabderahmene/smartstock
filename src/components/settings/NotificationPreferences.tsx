
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CustomCard } from '@/components/ui/custom-card';
import { Bell, Save } from 'lucide-react';
import { UserSettings, useUserSettings } from '@/hooks/useUserSettings';

interface NotificationPreferencesProps {
  userType: 'admin' | 'moderator' | 'client' | 'driver' | 'controller';
}

export const NotificationPreferences = ({ userType }: NotificationPreferencesProps) => {
  const { settings, loading, updateNotificationPreferences, fetchUserSettings } = useUserSettings();
  const [preferences, setPreferences] = useState<UserSettings['notificationPreferences']>(
    settings.notificationPreferences
  );
  
  useEffect(() => {
    fetchUserSettings();
  }, []);
  
  useEffect(() => {
    setPreferences(settings.notificationPreferences);
  }, [settings.notificationPreferences]);
  
  const handleToggleChange = (key: keyof UserSettings['notificationPreferences']) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    await updateNotificationPreferences(preferences);
  };
  
  return (
    <CustomCard variant="elevated">
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-wms-accent/20 flex items-center justify-center">
            <Bell className="h-6 w-6 text-wms-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-wms-600">Manage how you receive notifications</p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Task Assignments</p>
              <p className="text-sm text-wms-600">Get notified when you are assigned a new task</p>
            </div>
            <Switch 
              checked={preferences.newAssignments} 
              onCheckedChange={() => handleToggleChange('newAssignments')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Urgent Alerts</p>
              <p className="text-sm text-wms-600">Receive urgent task alerts as high priority</p>
            </div>
            <Switch 
              checked={preferences.urgentAlerts} 
              onCheckedChange={() => handleToggleChange('urgentAlerts')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Feedback Notifications</p>
              <p className="text-sm text-wms-600">Get notified about feedback on your work</p>
            </div>
            <Switch 
              checked={preferences.feedbackNotifications} 
              onCheckedChange={() => handleToggleChange('feedbackNotifications')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Updates</p>
              <p className="text-sm text-wms-600">Updates about system changes and improvements</p>
            </div>
            <Switch 
              checked={preferences.systemUpdates} 
              onCheckedChange={() => handleToggleChange('systemUpdates')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-wms-600">Receive notifications via email</p>
            </div>
            <Switch 
              checked={preferences.emailNotifications} 
              onCheckedChange={() => handleToggleChange('emailNotifications')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-wms-600">Receive urgent notifications via SMS</p>
            </div>
            <Switch 
              checked={preferences.smsNotifications} 
              onCheckedChange={() => handleToggleChange('smsNotifications')}
              disabled={loading}
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            Save Preferences
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};
