
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserSettings } from '@/types/userSettings';

export const useSecuritySettings = (userId: string | undefined, setLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  
  const fetchSecuritySettings = async () => {
    if (!userId) return null;
    
    try {
      const { data: securityData, error: securityError } = await supabase
        .from('user_security_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (securityError && securityError.code !== 'PGRST116') throw securityError;
      
      return {
        twoFactorAuth: securityData?.two_factor_auth ?? false,
        sessionTimeout: securityData?.session_timeout ?? 30,
      };
      
    } catch (error: any) {
      console.error('Error fetching security settings:', error);
      return null;
    }
  };
  
  const updateSecuritySettings = async (data: UserSettings['securitySettings'], userId: string | undefined) => {
    if (!userId) return false;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_security_settings')
        .upsert({
          user_id: userId,
          two_factor_auth: data.twoFactorAuth,
          session_timeout: data.sessionTimeout,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      toast({
        title: "Security settings updated",
        description: "Your security settings have been saved",
      });
      
      return true;
      
    } catch (error: any) {
      console.error('Error updating security settings:', error);
      toast({
        title: "Failed to save security settings",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
      
      return false;
      
    } finally {
      setLoading(false);
    }
  };
  
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed",
      });
      
      return true;
      
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast({
        title: "Failed to update password",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
      
      return false;
      
    } finally {
      setLoading(false);
    }
  };
  
  return {
    fetchSecuritySettings,
    updateSecuritySettings,
    updatePassword
  };
};
