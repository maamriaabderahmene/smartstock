
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CustomCard } from '@/components/ui/custom-card';
import { User, Save } from 'lucide-react';
import { UserSettings, useUserSettings } from '@/hooks/useUserSettings';
import { useAuth } from '@/context/AuthContext';

interface UserProfileProps {
  userType: 'admin' | 'moderator' | 'client' | 'driver' | 'controller';
}

export const UserProfile = ({ userType }: UserProfileProps) => {
  const { user } = useAuth();
  const { settings, loading, updateProfileData, fetchUserSettings } = useUserSettings();
  const [formData, setFormData] = useState<UserSettings['profileData']>(settings.profileData);
  
  useEffect(() => {
    fetchUserSettings();
  }, []);
  
  useEffect(() => {
    setFormData(settings.profileData);
  }, [settings.profileData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileData(formData);
  };
  
  return (
    <CustomCard variant="elevated">
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-wms-accent/20 flex items-center justify-center">
            <User className="h-8 w-8 text-wms-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-medium">{formData.firstName || 'Your'} Profile</h3>
            <p className="text-wms-600">Manage your personal information</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          
          {(userType === 'admin' || userType === 'moderator' || userType === 'controller') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department"
                  name="department"
                  value={formData.department || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              name="bio"
              rows={3}
              placeholder="Write a short bio..."
              value={formData.bio || ''}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            Save Profile
          </Button>
        </form>
      </div>
    </CustomCard>
  );
};
