
-- Create type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'user_role_type'
  ) THEN
    CREATE TYPE public.user_role_type AS ENUM ('admin', 'moderator', 'driver', 'client', 'controller');
  END IF;
END$$;

-- Create the user_roles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'user_roles'
  ) THEN
    -- Create the user_roles table
    CREATE TABLE public.user_roles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      role user_role_type NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id)
    );

    -- Enable RLS
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Users can view their own role"
      ON public.user_roles
      FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Service role can manage all roles"
      ON public.user_roles
      USING (auth.role() = 'service_role');
  END IF;
END$$;

-- Function to assign a role to a user
CREATE OR REPLACE FUNCTION public.assign_user_role(p_user_id UUID, p_role TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user already has a role assigned
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = p_user_id) THEN
    -- Update existing role
    UPDATE public.user_roles
    SET role = p_role::public.user_role_type,
        updated_at = NOW()
    WHERE user_id = p_user_id;
  ELSE
    -- Insert new role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (p_user_id, p_role::public.user_role_type);
  END IF;
END;
$$;

-- Function to get a user's role
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role::TEXT INTO v_role
  FROM public.user_roles
  WHERE user_id = p_user_id;
  
  RETURN v_role;
END;
$$;

-- Function to check if user_roles table exists
CREATE OR REPLACE FUNCTION public.create_user_roles_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- First create the enum type if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'user_role_type'
  ) THEN
    CREATE TYPE public.user_role_type AS ENUM ('admin', 'moderator', 'driver', 'client', 'controller');
  END IF;

  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'user_roles'
  ) THEN
    -- Create the user_roles table
    CREATE TABLE public.user_roles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      role user_role_type NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id)
    );

    -- Enable RLS
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Users can view their own role"
      ON public.user_roles
      FOR SELECT
      USING (auth.uid() = user_id);
      
    CREATE POLICY "Service role can manage all roles"
      ON public.user_roles
      USING (auth.role() = 'service_role');
  END IF;
END;
$$;
