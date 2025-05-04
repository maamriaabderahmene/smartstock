
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { setupDatabase } from '@/integrations/supabase/dbFunctions';

export const DbSetup = () => {
  const { toast } = useToast();

  useEffect(() => {
    const setupDatabaseTables = async () => {
      try {
        // Check if user_profiles table exists
        const { error: tableError } = await supabase
          .from('user_profiles')
          .select('user_id')
          .limit(1);

        if (tableError) {
          console.log('Creating user_profiles table...');
          
          // Use the setupDatabase function which has proper error handling
          const setupResult = await setupDatabase();
          
          if (!setupResult.success) {
            console.error('Error creating user_profiles table:', setupResult.error);
            toast({
              title: 'Database setup error',
              description: 'Failed to setup the database. Please contact support.',
              variant: 'destructive',
            });
          } else {
            console.log('User profiles table created successfully');
          }
        } else {
          // Table exists, check if columns exist
          console.log('Checking user_profiles table structure...');
        }
      } catch (error) {
        console.error('Error setting up database:', error);
      }
    };

    setupDatabaseTables();
  }, [toast]);

  return null;
};
