
export interface UserSettings {
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle?: string;
    department?: string;
    bio?: string;
  };
  notificationPreferences: {
    newAssignments: boolean;
    urgentAlerts: boolean;
    feedbackNotifications: boolean;
    systemUpdates: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  securitySettings: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  }
}

export const defaultSettings: UserSettings = {
  profileData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    bio: '',
  },
  notificationPreferences: {
    newAssignments: true,
    urgentAlerts: true,
    feedbackNotifications: true,
    systemUpdates: false,
    emailNotifications: true,
    smsNotifications: false,
  },
  securitySettings: {
    twoFactorAuth: false,
    sessionTimeout: 30
  }
};
