
import { createClient } from '@supabase/supabase-js';

/**
 * Accesses environment variables from either process.env or import.meta.env.
 * This ensures compatibility across different deployment platforms and development environments.
 */
const getEnvVar = (key: string): string => {
  try {
    // Try process.env first (common in Vercel/Node)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      const val = process.env[key];
      if (val) return val;
    }
    
    // Try import.meta.env (common in Vite/ESM)
    // @ts-ignore
    const meta = import.meta as any;
    if (meta && meta.env && meta.env[key]) {
      return meta.env[key];
    }
  } catch (e) {
    // Fail silently
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

/**
 * Initialize the Supabase client only if valid credentials are provided.
 * If credentials are missing, we export null and handle it gracefully in the components.
 */
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn("Supabase client not initialized: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Falling back to static data.");
}
