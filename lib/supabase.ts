
import { createClient } from '@supabase/supabase-js';

const getEnvValue = (key: string): string => {
  try {
    // Check process.env (Vercel/Production)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Check import.meta.env (Vite/Local)
    if (typeof (import.meta as any).env !== 'undefined' && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch (e) {
    // Silent fail
  }
  return '';
};

const supabaseUrl = getEnvValue('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvValue('VITE_SUPABASE_ANON_KEY');

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.info("Supabase not configured. Using local fallback data.");
}
