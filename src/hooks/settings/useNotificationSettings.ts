
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserSettings } from '@/types/userSettings';

export const useNotificationSettings = (userId: string | undefined, setLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  
  const fetchNotificationPreferences = async () => {
    if (!userId) return null;
    
    try {
      const { data: notificationData, error: notificationError } = await supabase
        .from('user_notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (notificationError && notificationError.code !== 'PGRST116') throw notificationError;
      
      return {
        newAssignments: notificationData?.new_assignments ?? true,
        urgentAlerts: notificationData?.urgent_alerts ?? true,
        feedbackNotifications: notificationData?.feedback_notifications ?? true,
        systemUpdates: notificationData?.system_updates ?? false,
        emailNotifications: notificationData?.email_notifications ?? true,
        smsNotifications: notificationData?.sms_notifications ?? false,
      };
      
    } catch (error: any) {
      console.error('Error fetching notification preferences:', error);
      return null;
    }
  };
  
  const updateNotificationPreferences = async (data: UserSettings['notificationPreferences'], userId: string | undefined) => {
    if (!userId) return false;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_notification_preferences')
        .upsert({
          user_id: userId,
          new_assignments: data.newAssignments,
          urgent_alerts: data.urgentAlerts,
          feedback_notifications: data.feedbackNotifications,
          system_updates: data.systemUpdates,
          email_notifications: data.emailNotifications,
          sms_notifications: data.smsNotifications,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved",
      });
      
      return true;
      
    } catch (error: any) {
      console.error('Error updating notification preferences:', error);
      toast({
        title: "Failed to save notification preferences",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
      
      return false;
      
    } finally {
      setLoading(false);
    }
  };
  
  return {
    fetchNotificationPreferences,
    updateNotificationPreferences
  };
};
