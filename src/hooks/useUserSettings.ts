
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { UserSettings, defaultSettings } from '@/types/userSettings';
import { useProfileSettings } from '@/hooks/settings/useProfileSettings';
import { useNotificationSettings } from '@/hooks/settings/useNotificationSettings';
import { useSecuritySettings } from '@/hooks/settings/useSecuritySettings';

export type { UserSettings } from '@/types/userSettings';

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const profileManager = useProfileSettings(user?.id, setLoading);
  const notificationManager = useNotificationSettings(user?.id, setLoading);
  const securityManager = useSecuritySettings(user?.id, setLoading);
  
  const fetchUserSettings = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Fetch all settings in parallel
      const [profileData, notificationPreferences, securitySettings] = await Promise.all([
        profileManager.fetchProfileData(),
        notificationManager.fetchNotificationPreferences(),
        securityManager.fetchSecuritySettings()
      ]);
      
      setSettings({
        profileData: profileData || defaultSettings.profileData,
        notificationPreferences: notificationPreferences || defaultSettings.notificationPreferences,
        securitySettings: securitySettings || defaultSettings.securitySettings
      });
      
    } catch (error: any) {
      console.error('Error fetching user settings:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateProfileData = async (data: UserSettings['profileData']) => {
    const success = await profileManager.updateProfileData(data, user?.id);
    if (success) {
      setSettings(prev => ({
        ...prev,
        profileData: data
      }));
    }
  };
  
  const updateNotificationPreferences = async (data: UserSettings['notificationPreferences']) => {
    const success = await notificationManager.updateNotificationPreferences(data, user?.id);
    if (success) {
      setSettings(prev => ({
        ...prev,
        notificationPreferences: data
      }));
    }
  };
  
  const updateSecuritySettings = async (data: UserSettings['securitySettings']) => {
    const success = await securityManager.updateSecuritySettings(data, user?.id);
    if (success) {
      setSettings(prev => ({
        ...prev,
        securitySettings: data
      }));
    }
  };
  
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await securityManager.updatePassword(currentPassword, newPassword);
  };
  
  return {
    settings,
    loading,
    fetchUserSettings,
    updateProfileData,
    updateNotificationPreferences,
    updateSecuritySettings,
    updatePassword
  };
};
