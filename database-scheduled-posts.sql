-- Add scheduled publishing feature to news table
-- Run this SQL in your Supabase SQL Editor

-- Add scheduled_date column to news table
ALTER TABLE news
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP WITH TIME ZONE;

-- Add index for better query performance on scheduled posts
CREATE INDEX IF NOT EXISTS idx_news_scheduled_date ON news(scheduled_date);

-- Create function to auto-publish scheduled posts
CREATE OR REPLACE FUNCTION auto_publish_scheduled_posts()
RETURNS void AS $$
BEGIN
  UPDATE news
  SET 
    status = 'published',
    published_at = NOW()
  WHERE 
    status = 'scheduled' 
    AND scheduled_date IS NOT NULL 
    AND scheduled_date <= NOW()
    AND (published_at IS NULL OR published_at > scheduled_date);
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled status if not exists (optional, for better tracking)
-- You can also use 'draft' status with scheduled_date set
COMMENT ON COLUMN news.scheduled_date IS 'Date and time when the post should be automatically published';

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'news' AND column_name = 'scheduled_date';

-- Example: Schedule a post for future publishing
-- UPDATE news 
-- SET status = 'scheduled', scheduled_date = '2025-12-20 10:00:00+07'
-- WHERE id = 'your-post-id';

-- To manually trigger auto-publish (for testing)
-- SELECT auto_publish_scheduled_posts();
