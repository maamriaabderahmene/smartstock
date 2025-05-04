
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CustomCard } from '@/components/ui/custom-card';
import { Lock, Shield, Save } from 'lucide-react';
import { UserSettings, useUserSettings } from '@/hooks/useUserSettings';

interface SecuritySettingsProps {
  userType: 'admin' | 'moderator' | 'client' | 'driver' | 'controller';
}

export const SecuritySettings = ({ userType }: SecuritySettingsProps) => {
  const { settings, loading, updateSecuritySettings, updatePassword, fetchUserSettings } = useUserSettings();
  const [securityData, setSecurityData] = useState(settings.securitySettings);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  
  useEffect(() => {
    fetchUserSettings();
  }, []);
  
  useEffect(() => {
    setSecurityData(settings.securitySettings);
  }, [settings.securitySettings]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (passwordError) {
      setPasswordError('');
    }
  };
  
  const handleSecurityChange = (key: keyof UserSettings['securitySettings'], value: any) => {
    setSecurityData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSaveSecuritySettings = async () => {
    await updateSecuritySettings(securityData);
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    
    await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
    
    // Reset form on success
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  return (
    <CustomCard variant="elevated">
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-wms-accent/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-wms-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Security Settings</h3>
            <p className="text-wms-600">Manage your account security</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <h4 className="text-lg font-medium">Change Password</h4>
            
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
            
            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}
            
            <Button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Lock size={16} />
              Update Password
            </Button>
          </form>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium mb-4">Security Options</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-wms-600">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={securityData.twoFactorAuth} 
                  onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input 
                  id="sessionTimeout"
                  type="number"
                  min={5}
                  max={240}
                  value={securityData.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value) || 30)}
                  disabled={loading}
                />
                <p className="text-sm text-wms-600">How long before you're automatically logged out due to inactivity</p>
              </div>
              
              <Button 
                onClick={handleSaveSecuritySettings} 
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Save Security Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};
