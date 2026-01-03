
import { createClient } from '@supabase/supabase-js';

/**
 * Accesses environment variables from either process.env or import.meta.env.
 * This ensures compatibility across different deployment platforms and development environments.
 */
const getEnvVar = (key: string): string => {
  try {
    // Fix: Access process.env using type assertion to handle environments where process may be defined but typed strictly
    // @ts-ignore
    const processEnv = typeof process !== 'undefined' ? (process.env as any) : null;
    if (processEnv && processEnv[key]) {
      return processEnv[key];
    }
    
    // Fix: Use type assertion on import.meta to safely access the 'env' property, resolving the "Property 'env' does not exist on type 'ImportMeta'" error
    const meta = import.meta as any;
    if (meta && meta.env && meta.env[key]) {
      return meta.env[key];
    }
  } catch (e) {
    // Fail silently and return empty string
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

/**
 * Initialize the Supabase client only if valid credentials are provided.
 * If credentials are missing, we export null and handle it gracefully in the components.
 * This prevents the "supabaseUrl is required" fatal error during initialization.
 */
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn("Supabase client not initialized: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. The application will fall back to local static data.");
}
