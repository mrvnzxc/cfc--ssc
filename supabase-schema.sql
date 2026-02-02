-- Create confessions table
CREATE TABLE IF NOT EXISTS confessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  confession TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE confessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert confessions
CREATE POLICY "Allow public insert" ON confessions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to read confessions (optional - remove if you want private confessions)
CREATE POLICY "Allow public read" ON confessions
  FOR SELECT
  TO public
  USING (true);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_confessions_created_at ON confessions(created_at DESC);
