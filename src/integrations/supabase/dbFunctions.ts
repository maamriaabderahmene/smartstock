
import { supabase } from './client';
import { User } from '@supabase/supabase-js';
import { AllowedRole } from '@/components/auth/AuthGuard';

export interface SetupResult {
  success: boolean;
  error?: any;
}

// Function to setup all required database tables and functions
export const setupDatabase = async (): Promise<SetupResult> => {
  try {
    // Check if user_profiles table exists
    const { error: profilesCheckError } = await supabase
      .from('user_profiles')
      .select('user_id')
      .limit(1);

    // If there's an error, create the user_profiles table
    if (profilesCheckError) {
      console.log('Creating user_profiles table...');
      const { error: createProfilesError } = await supabase.rpc('create_user_profiles_table');
      
      if (createProfilesError) {
        console.error('Error creating user_profiles table:', createProfilesError);
        return { success: false, error: createProfilesError };
      }
    }

    // Check if user_roles table exists by using rpc to avoid type issues
    console.log('Creating user_roles table...');
    const { error: createRolesError } = await supabase.rpc('create_user_roles_table');
    
    if (createRolesError) {
      console.error('Error creating user_roles table:', createRolesError);
      return { success: false, error: createRolesError };
    }

    return { success: true };
  } catch (error) {
    console.error('Error setting up database:', error);
    return { success: false, error };
  }
};

// Function to create a user profile
export const createUserProfile = async (user: User, firstName: string, lastName: string): Promise<SetupResult> => {
  try {
    const { error } = await supabase.from('user_profiles').insert({
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: user.email
    });

    if (error) {
      console.error('Error creating user profile:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }
};

// Function to assign a role to a user
export const assignUserRole = async (userId: string, role: string): Promise<SetupResult> => {
  try {
    console.log(`Assigning role '${role}' to user '${userId}'`);
    
    // Use Edge Function to assign the role with retry logic
    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    let lastError = null;
    
    while (!success && attempt < maxRetries) {
      attempt++;
      console.log(`Attempt ${attempt} to assign role '${role}' to user '${userId}'`);
      
      try {
        const { data, error } = await supabase.functions.invoke('assign-user-role', {
          body: {
            user_id: userId,
            role: role
          }
        });

        if (error) {
          console.error(`Role assignment error on attempt ${attempt}:`, error);
          lastError = error;
          // Wait briefly before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        } else {
          console.log('Role assignment successful:', data);
          success = true;
          return { success: true };
        }
      } catch (invocationError) {
        console.error(`Exception during role assignment attempt ${attempt}:`, invocationError);
        lastError = invocationError;
        // Wait briefly before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    // If we've exhausted all retries, try fallback method: direct database insertion
    if (!success) {
      console.log('All Edge Function attempts failed, trying direct database insertion...');
      
      try {
        // Use rpc function instead of direct table access
        const { error: rpcError } = await supabase.rpc('assign_user_role', {
          p_user_id: userId,
          p_role: role
        });
        
        if (rpcError) {
          console.error('RPC function call failed:', rpcError);
          return { success: false, error: rpcError };
        }
        
        console.log('RPC function call succeeded');
        return { success: true };
      } catch (directError) {
        console.error('Exception during RPC function call:', directError);
        lastError = directError;
      }
    }
    
    console.error('All role assignment methods failed:', lastError);
    return { success: false, error: lastError };
  } catch (error) {
    console.error('Error assigning user role:', error);
    return { success: false, error };
  }
};

// Function to get the user's role
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    console.log(`Getting role for user '${userId}'`);
    
    // Try using RPC function first
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_user_role', {
        p_user_id: userId
      });
      
      if (!rpcError && rpcData) {
        console.log('Retrieved user role via RPC function:', rpcData);
        return rpcData;
      }
      
      if (rpcError) {
        console.log('RPC function error:', rpcError);
      }
    } catch (rpcFunctionError) {
      console.error('Exception during RPC function call:', rpcFunctionError);
    }
    
    // Use Edge Function to get the role as fallback
    console.log('Trying Edge Function to get role...');
    
    const { data, error } = await supabase.functions.invoke('get-user-role', {
      body: {
        user_id: userId
      }
    });

    if (error) {
      console.error('Error getting user role from Edge Function:', error);
      return null;
    }

    console.log('Retrieved user role from Edge Function:', data);
    return data;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};
