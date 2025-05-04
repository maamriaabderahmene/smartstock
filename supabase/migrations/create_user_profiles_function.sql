
-- Function to create user_profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_profiles_table()
RETURNS void AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'user_profiles'
  ) THEN
    -- Create the table if it doesn't exist
    CREATE TABLE public.user_profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      role TEXT CHECK (role IN ('admin', 'moderator', 'driver', 'client', 'controller')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    
    -- Set up Row Level Security
    ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Users can view their own profile"
      ON public.user_profiles
      FOR SELECT
      USING (auth.uid() = id);
      
    CREATE POLICY "Users can update their own profile"
      ON public.user_profiles
      FOR UPDATE
      USING (auth.uid() = id);
      
    -- Allow users to view, insert, and update only their own profiles
    GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
  ELSE
    -- Add missing columns if they don't exist
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'user_profiles' AND column_name = 'full_name'
    ) THEN
      ALTER TABLE public.user_profiles ADD COLUMN full_name TEXT;
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'user_profiles' AND column_name = 'role'
    ) THEN
      ALTER TABLE public.user_profiles ADD COLUMN role TEXT CHECK (role IN ('admin', 'moderator', 'driver', 'client', 'controller'));
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;
