
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserSettings } from '@/types/userSettings';

export const useProfileSettings = (userId: string | undefined, setLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  
  const fetchProfileData = async () => {
    if (!userId) return null;
    
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      return {
        firstName: profileData?.first_name || '',
        lastName: profileData?.last_name || '',
        email: profileData?.email || '',
        phone: profileData?.phone || '',
        jobTitle: profileData?.job_title || '',
        department: profileData?.department || '',
        bio: profileData?.bio || '',
      };
      
    } catch (error: any) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  };
  
  const updateProfileData = async (data: UserSettings['profileData'], userId: string | undefined) => {
    if (!userId) return false;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          job_title: data.jobTitle,
          department: data.department,
          bio: data.bio,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      });
      
      return true;
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Failed to save profile",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
      
      return false;
      
    } finally {
      setLoading(false);
    }
  };
  
  return {
    fetchProfileData,
    updateProfileData
  };
};
