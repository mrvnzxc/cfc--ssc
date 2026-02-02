# SQL Queries Reference

Useful SQL queries for managing confessions in Supabase.

## Setup Query

Run this first to create the table (already in `supabase-schema.sql`):

```sql
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

-- Create policy to allow anyone to read confessions
CREATE POLICY "Allow public read" ON confessions
  FOR SELECT
  TO public
  USING (true);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_confessions_created_at ON confessions(created_at DESC);
```

## Viewing Confessions

### View All Confessions (Most Recent First)

```sql
SELECT * FROM confessions 
ORDER BY created_at DESC;
```

### View Last 10 Confessions

```sql
SELECT * FROM confessions 
ORDER BY created_at DESC 
LIMIT 10;
```

### View Confessions from Last 24 Hours

```sql
SELECT * FROM confessions 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### View Confessions from Last 7 Days

```sql
SELECT * FROM confessions 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### View Confessions by Date Range

```sql
SELECT * FROM confessions 
WHERE created_at BETWEEN '2024-02-01' AND '2024-02-14'
ORDER BY created_at DESC;
```

### View Confessions from Today

```sql
SELECT * FROM confessions 
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

## Statistics Queries

### Count Total Confessions

```sql
SELECT COUNT(*) as total_confessions FROM confessions;
```

### Count Confessions Today

```sql
SELECT COUNT(*) as today_confessions 
FROM confessions 
WHERE DATE(created_at) = CURRENT_DATE;
```

### Count Confessions This Week

```sql
SELECT COUNT(*) as this_week_confessions 
FROM confessions 
WHERE created_at > NOW() - INTERVAL '7 days';
```

### Confessions Per Day (Last 7 Days)

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as count
FROM confessions 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Average Confessions Per Day

```sql
SELECT 
  COUNT(*) / NULLIF(EXTRACT(DAY FROM NOW() - MIN(created_at)), 0) as avg_per_day
FROM confessions;
```

## Search Queries

### Search Confessions by Keyword

```sql
SELECT * FROM confessions 
WHERE confession ILIKE '%keyword%'
ORDER BY created_at DESC;
```

### Search Confessions (Case Insensitive)

```sql
SELECT * FROM confessions 
WHERE LOWER(confession) LIKE LOWER('%search term%')
ORDER BY created_at DESC;
```

## Management Queries

### Delete All Confessions

```sql
DELETE FROM confessions;
```

### Delete Confessions Older Than 30 Days

```sql
DELETE FROM confessions 
WHERE created_at < NOW() - INTERVAL '30 days';
```

### Delete Confessions Older Than 7 Days

```sql
DELETE FROM confessions 
WHERE created_at < NOW() - INTERVAL '7 days';
```

### Delete Specific Confession by ID

```sql
DELETE FROM confessions 
WHERE id = 'uuid-here';
```

### Delete Confessions Containing Specific Text

```sql
DELETE FROM confessions 
WHERE confession ILIKE '%inappropriate text%';
```

## Export Queries

### Export as JSON Format

```sql
SELECT json_agg(
  json_build_object(
    'id', id,
    'confession', confession,
    'created_at', created_at
  )
) FROM confessions
ORDER BY created_at DESC;
```

### Export as CSV Format (for download)

```sql
SELECT 
  id,
  confession,
  created_at
FROM confessions 
ORDER BY created_at DESC;
```

## Advanced Queries

### Get Longest Confession

```sql
SELECT * FROM confessions 
ORDER BY LENGTH(confession) DESC 
LIMIT 1;
```

### Get Shortest Confession

```sql
SELECT * FROM confessions 
ORDER BY LENGTH(confession) ASC 
LIMIT 1;
```

### Get Average Confession Length

```sql
SELECT AVG(LENGTH(confession)) as avg_length 
FROM confessions;
```

### Get Confessions Longer Than 500 Characters

```sql
SELECT * FROM confessions 
WHERE LENGTH(confession) > 500
ORDER BY created_at DESC;
```

### Get Hourly Statistics (Last 24 Hours)

```sql
SELECT 
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as count
FROM confessions 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour;
```

## Moderation Queries

### View Recent Confessions (for moderation)

```sql
SELECT 
  id,
  LEFT(confession, 100) as preview,
  created_at
FROM confessions 
ORDER BY created_at DESC 
LIMIT 50;
```

### Count Unmoderated Confessions (if you add moderation column later)

```sql
-- First, add moderation column:
-- ALTER TABLE confessions ADD COLUMN moderated BOOLEAN DEFAULT FALSE;

-- Then query:
SELECT COUNT(*) FROM confessions 
WHERE moderated = FALSE;
```

## Backup Queries

### Create Backup Table

```sql
CREATE TABLE confessions_backup AS 
SELECT * FROM confessions;
```

### Restore from Backup

```sql
INSERT INTO confessions (confession, created_at)
SELECT confession, created_at 
FROM confessions_backup;
```

---

## Tips

1. **Always test queries** in SQL Editor before running DELETE operations
2. **Use LIMIT** when testing queries on large datasets
3. **Export data regularly** as backup
4. **Use transactions** for multiple operations:
   ```sql
   BEGIN;
   -- your queries here
   COMMIT;
   ```

## Accessing SQL Editor in Supabase

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in left sidebar
3. Click **New query**
4. Paste your query
5. Click **Run** (or Ctrl+Enter)

---

**Need help?** Check Supabase documentation: https://supabase.com/docs/guides/database
