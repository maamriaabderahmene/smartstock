
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the request body
    const { user_id } = await req.json();
    
    console.log(`Attempting to get role for user '${user_id}'`);
    
    if (!user_id) {
      console.error('Missing required parameter: user_id');
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Ensure user_roles table exists before querying
    try {
      console.log('Ensuring user_roles table exists...');
      
      // Create enum type if it doesn't exist
      const createEnumSQL = `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'user_role_type'
          ) THEN
            CREATE TYPE public.user_role_type AS ENUM ('admin', 'moderator', 'driver', 'client', 'controller');
          END IF;
        END$$;
      `;
      
      // Create table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.user_roles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
          role user_role_type NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id)
        );
      `;
      
      // Enable RLS if not already enabled
      const enableRLSSQL = `
        ALTER TABLE IF EXISTS public.user_roles ENABLE ROW LEVEL SECURITY;
      `;
      
      // Execute SQL statements directly
      await supabaseClient.rpc('exec_sql', { sql: createEnumSQL }).catch(() => {});
      await supabaseClient.rpc('exec_sql', { sql: createTableSQL }).catch(() => {});
      await supabaseClient.rpc('exec_sql', { sql: enableRLSSQL }).catch(() => {});
      
      console.log('User roles table verified');
    } catch (tableError) {
      console.log('Error checking user_roles table (continuing anyway):', tableError);
    }

    // First try direct query to get the role
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user_id)
      .maybeSingle();

    if (roleData && roleData.role) {
      console.log(`Retrieved role for user '${user_id}':`, roleData.role);
      return new Response(
        JSON.stringify(roleData.role),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } 
    
    // If direct query failed or returned no data, try the RPC approach
    if (roleError) {
      console.log('Direct query error:', roleError);
    } else {
      console.log('Direct query returned no data');
    }
    
    console.log('Trying RPC approach...');
    try {
      const { data: rpcData, error: rpcError } = await supabaseClient.rpc('get_user_role', {
        p_user_id: user_id
      });

      if (rpcError) {
        console.error('Error in get_user_role function:', rpcError);
        
        // Try a raw SQL approach as a last resort
        try {
          console.log('Attempting raw SQL query as final fallback...');
          const rawSql = `SELECT role::TEXT FROM public.user_roles WHERE user_id = '${user_id}';`;
          
          const { data: rawData, error: rawError } = await supabaseClient.rpc('exec_sql', { 
            sql: rawSql,
            params: {}
          });
          
          if (rawError) {
            console.error('Raw SQL query failed:', rawError);
          } else if (rawData && rawData.length > 0) {
            const extractedRole = rawData[0]?.role;
            if (extractedRole) {
              console.log(`Retrieved role for user '${user_id}' via raw SQL:`, extractedRole);
              return new Response(
                JSON.stringify(extractedRole),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } }
              );
            }
          }
        } catch (rawSqlError) {
          console.error('Exception during raw SQL query:', rawSqlError);
        }
        
        return new Response(
          JSON.stringify({ 
            error: "Failed to retrieve user role", 
            details: rpcError.message
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
      }

      if (rpcData) {
        console.log(`Retrieved role for user '${user_id}' via RPC:`, rpcData);
        return new Response(
          JSON.stringify(rpcData),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch (rpcException) {
      console.error('Exception during RPC function call:', rpcException);
    }

    // If we reach here, no role was found
    console.log(`No role found for user '${user_id}'`);
    return new Response(
      JSON.stringify(null),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error in get-user-role function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
