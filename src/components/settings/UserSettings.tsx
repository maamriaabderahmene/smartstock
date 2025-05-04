
import { useState } from 'react';
import { CustomCard } from '@/components/ui/custom-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from './UserProfile';
import { NotificationPreferences } from './NotificationPreferences';
import { SecuritySettings } from './SecuritySettings';
import { User, Bell, Shield, Settings } from 'lucide-react';

interface UserSettingsProps {
  userType: 'admin' | 'moderator' | 'client' | 'driver' | 'controller';
}

export const UserSettings = ({ userType }: UserSettingsProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs 
        defaultValue="profile" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <UserProfile userType={userType} />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationPreferences userType={userType} />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings userType={userType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
