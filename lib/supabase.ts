
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  try {
    // @ts-ignore
    return process.env[key] || import.meta.env[key] || '';
  } catch {
    return '';
  }
};

const url = getEnv('VITE_SUPABASE_URL');
const key = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = (url && key) ? createClient(url, key) : null;
