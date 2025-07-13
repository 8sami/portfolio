# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

## Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the following SQL to create the required tables:

```sql
-- Create users table (Supabase Auth will handle user creation)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for comments
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_author_id ON comments(author_id);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, image)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Setting up OAuth Providers

### Google OAuth

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Go to [Google Cloud Console](https://console.cloud.google.com/)
5. Create OAuth 2.0 credentials
6. Set authorized redirect URI to: `https://your-project.supabase.co/auth/v1/callback`
7. Copy Client ID and Client Secret to Supabase

### GitHub OAuth

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable GitHub provider
4. Go to [GitHub Developer Settings](https://github.com/settings/developers)
5. Create a new OAuth App
6. Set Authorization callback URL to: `https://your-project.supabase.co/auth/v1/callback`
7. Copy Client ID and Client Secret to Supabase

## Getting Your Supabase Keys

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## Testing the Integration

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/guestbook`
3. Try signing in with Google or GitHub
4. Post a comment and check your Supabase dashboard

## Features Now Working

- ✅ **Supabase Auth** - Built-in OAuth with Google/GitHub
- ✅ **Automatic User Creation** - Users are created in the database on signup
- ✅ **JWT Authentication** - Secure token-based auth for API calls
- ✅ **Comment System** - Full CRUD operations with user association
- ✅ **Real-time Data** - Comments persist in Supabase database
- ✅ **Row Level Security** - Secure database policies
- ✅ **Clean UI** - Modern interface with Once UI components

## How It Works

1. **Authentication**: Users sign in via Supabase Auth (Google/GitHub)
2. **User Creation**: New users are automatically added to the `users` table
3. **API Security**: Comments API uses JWT tokens for authentication
4. **Data Persistence**: All comments are stored in Supabase with user relationships
5. **Real-time Updates**: Comments are fetched and displayed in real-time 