# Database Setup Instructions

To complete the setup of your AI Agent landing page, you need to create the database table in Supabase.

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://xztvkpzcjiqkuxxxuddj.supabase.co
2. Navigate to the **SQL Editor** section
3. Create a new query and paste the following SQL:

```sql
-- Create client inquiries table
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

-- Enable Row Level Security
ALTER TABLE client_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit inquiries (public form access)
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON client_inquiries;
CREATE POLICY "Anyone can submit inquiries"
  ON client_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all inquiries (for admin access)
DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON client_inquiries;
CREATE POLICY "Authenticated users can view all inquiries"
  ON client_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click **Run** to execute the SQL

## What This Creates

The `client_inquiries` table stores all form submissions with:
- Client contact information (name, email, phone)
- Company details
- Project description
- Preferred contact method (email, text, or phone call)
- Budget range and timeline preferences
- Status tracking for managing inquiries
- Automatic timestamps

## Security

Row Level Security (RLS) is enabled with these policies:
- **Public access**: Anyone can submit inquiries through the form
- **Admin access**: Only authenticated users can view submitted inquiries

This ensures client data is protected while allowing the public form to work correctly.
