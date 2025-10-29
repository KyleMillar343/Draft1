import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ClientInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_description: string;
  preferred_contact: 'text' | 'phone' | 'email';
  budget_range?: string;
  timeline?: string;
  status?: string;
  created_at?: string;
}
