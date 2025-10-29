import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const setupDatabase = async () => {
  console.log('Setting up database...');

  const query = `
    CREATE TABLE IF NOT EXISTS client_inquiries (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      company text,
      project_description text NOT NULL,
      preferred_contact text NOT NULL CHECK (preferred_contact IN ('text', 'phone', 'email')),
      budget_range text,
      timeline text,
      status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed')),
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE client_inquiries ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Anyone can submit inquiries" ON client_inquiries;
    CREATE POLICY "Anyone can submit inquiries"
      ON client_inquiries
      FOR INSERT
      TO anon
      WITH CHECK (true);

    DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON client_inquiries;
    CREATE POLICY "Authenticated users can view all inquiries"
      ON client_inquiries
      FOR SELECT
      TO authenticated
      USING (true);
  `;

  const { data, error } = await supabase.rpc('exec_sql', { sql: query });

  if (error) {
    console.error('Error setting up database:', error);
    console.log('\nPlease run the following SQL in your Supabase SQL editor:');
    console.log(query);
  } else {
    console.log('Database setup complete!');
  }
};

setupDatabase();
