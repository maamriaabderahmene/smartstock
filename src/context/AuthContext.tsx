
import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { getUserRole, assignUserRole } from '@/integrations/supabase/dbFunctions';
import { AllowedRole } from '@/components/auth/AuthGuard';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch user profile and role when user changes
  const fetchUserRole = async (userId: string) => {
    try {
      console.info(`Fetching user role for: ${userId}`);
      const role = await getUserRole(userId);
      
      if (role) {
        console.log(`User role found: ${role}`);
        setUserRole(role);
      } else {
        console.error("No role found for this user");
        setUserRole(null);
        toast({
          title: "Role not found",
          description: "Please complete your profile with a role or contact an administrator",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserRole(null);
      toast({
        title: "Error fetching role",
        description: "Could not retrieve your role information. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  // Function to manually refresh the user role
  const refreshUserRole = async () => {
    if (user) {
      await fetchUserRole(user.id);
    }
  };

  useEffect(() => {
    // First setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.info('Auth state changed:', event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        // Use setTimeout to avoid Supabase auth deadlock issues
        setTimeout(() => {
          fetchUserRole(currentSession.user.id);
        }, 0);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    // Then get the current session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserRole(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: string) => {
    try {
      setLoading(true);
      console.log(`Signing up user with email: ${email}, firstName: ${firstName}, lastName: ${lastName}, role: ${role}`);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      if (data.user) {
        console.log(`User created successfully with ID: ${data.user.id}`);
        
        // Assign the selected role to the user
        console.log(`Assigning role '${role}' to user ${data.user.id}`);
        
        // Try multiple times if needed (sometimes there's a race condition)
        let success = false;
        let attempts = 0;
        let lastError = null;
        
        while (!success && attempts < 3) {
          attempts++;
          console.log(`Role assignment attempt ${attempts}...`);
          
          const result = await assignUserRole(data.user.id, role);
          
          if (result.success) {
            success = true;
            console.log(`Role '${role}' assigned successfully on attempt ${attempts}`);
          } else {
            lastError = result.error;
            console.error(`Failed to assign role (attempt ${attempts}):`, result.error);
            // Wait a bit before trying again
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        if (!success) {
          console.error("All role assignment attempts failed:", lastError);
          throw new Error(`Failed to assign role after ${attempts} attempts`);
        }
        
        toast({
          title: "Account created",
          description: "You have successfully signed up. Please check your email for verification.",
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Error during signup process:", error);
      toast({
        title: "Error signing up",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUserRole(null);
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      userRole,
      loading,
      signIn,
      signUp,
      signOut,
      refreshUserRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
