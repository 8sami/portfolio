-- Migration: Fix RLS policies for comments table
-- This fixes the authentication issues with comment creation

-- Drop existing policies
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON comments;

-- Create new policies that work properly
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Also create a policy for users to update their own comments (optional)
CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

-- And a policy for users to delete their own comments (optional)
CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id); 