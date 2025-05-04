
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
    const { user_id, role } = await req.json();
    
    console.log(`Attempting to assign role '${role}' to user '${user_id}'`);
    
    if (!user_id || !role) {
      console.error('Missing required parameters:', { user_id, role });
      return new Response(
        JSON.stringify({ error: "User ID and role are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Ensure user_roles table exists before insertion
    try {
      console.log('Trying standard approach with create_user_roles_table function...');
      
      // Create the table if needed using a Supabase function
      await supabaseClient.rpc('create_user_roles_table').catch((err) => {
        console.log('Error running direct SQL (this is expected if exec_sql function does not exist):', err);
      });
      
    } catch (tableError) {
      console.log('Error checking user_roles table:', tableError);
    }
    
    // Direct database insertion approach
    console.log(`Inserting role ${role} for user ${user_id} with direct SQL...`);
    try {
      const { error: directError } = await supabaseClient
        .from('user_roles')
        .upsert({ 
          user_id: user_id, 
          role: role
        }, { 
          onConflict: 'user_id' 
        });
        
      if (directError) {
        console.error('Error in direct role insertion:', directError);
        
        // Try RPC function as fallback
        console.log('Trying RPC function as fallback...');
        const { data: rpcData, error: rpcError } = await supabaseClient.rpc('assign_user_role', {
          p_user_id: user_id,
          p_role: role
        });
        
        if (rpcError) {
          console.error('Error in assign_user_role function:', rpcError);
          
          // Try raw SQL approach as final fallback
          console.log('Attempting raw SQL upsert as final fallback...');
          const rawSql = `
            INSERT INTO public.user_roles (user_id, role)
            VALUES ('${user_id}', '${role}'::user_role_type)
            ON CONFLICT (user_id)
            DO UPDATE SET
              role = '${role}'::user_role_type,
              updated_at = NOW();
          `;
          
          try {
            await supabaseClient.rpc('exec_sql', { sql: rawSql });
            console.log('Raw SQL upsert completed successfully');
          } catch (sqlError) {
            console.error('Raw SQL error:', sqlError);
            return new Response(
              JSON.stringify({ 
                error: "Failed to assign role", 
                details: sqlError.message 
              }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
            );
          }
        }
      }
      
      console.log(`Successfully assigned role '${role}' to user '${user_id}'`);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
      
    } catch (error) {
      console.error('Error assigning role:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in assign-user-role function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
