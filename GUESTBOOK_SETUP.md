# Guestbook Setup Guide

This guide will help you set up OAuth authentication for Google and GitHub, and configure the guestbook functionality with Supabase.

## Prerequisites

- Node.js and npm installed
- A Supabase project
- Google OAuth application (optional, can be configured in Supabase)
- A GitHub OAuth application (optional, can be configured in Supabase)

## Database Setup

The application uses Supabase for authentication and data storage. You'll need to create the following tables in your Supabase project:

- `users` - Stores user information from OAuth providers
- `comments` - Stores guestbook comments

## Environment Variables

Update your `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

## Setting up Supabase

1. Go to [Supabase](https://supabase.com/) and create a new project
2. In the SQL Editor, run the following SQL to create the required tables:

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

3. Copy your Supabase URL and anon key from the project settings

## Setting up OAuth Providers in Supabase

### Google OAuth

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Go to the [Google Cloud Console](https://console.cloud.google.com/)
5. Create OAuth 2.0 credentials
6. Set the authorized redirect URI to: `https://your-project.supabase.co/auth/v1/callback`
7. Copy the Client ID and Client Secret to Supabase

### GitHub OAuth

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable GitHub provider
4. Go to [GitHub Developer Settings](https://github.com/settings/developers)
5. Click "New OAuth App"
6. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `https://your-project.supabase.co`
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
7. Copy the Client ID and Client Secret to Supabase

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/guestbook` to test the functionality

## Features

### Authentication
- Google OAuth sign-in (via Supabase Auth)
- GitHub OAuth sign-in (via Supabase Auth)
- Session management
- Sign out functionality

### Guestbook
- View all comments with author information
- Post new comments (requires authentication)
- Real-time comment updates
- Responsive design using Once UI components

### Components
- `SignInButtons` - OAuth sign-in buttons and user status
- `CommentForm` - Form for posting new comments
- `CommentList` - Display all comments with author avatars

## API Endpoints

- `GET /api/comments` - Fetch all comments
- `POST /api/comments` - Create a new comment (requires authentication)

## Database Schema

```sql
-- Users table (linked to Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Production Deployment

For production deployment:

1. Set up your Supabase project for production
2. Update OAuth redirect URIs to your production domain
3. Set up environment variables in your hosting platform
4. Configure Supabase RLS policies for production

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"** - Make sure your OAuth app redirect URIs match exactly
2. **"Supabase connection failed"** - Check your Supabase URL and keys in `.env`
3. **"Authentication failed"** - Ensure OAuth providers are properly configured in Supabase

### Debug Mode

To enable debug logging, add to your `.env`:
```env
DEBUG="supabase:*"
```

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique secrets for production
- Regularly rotate OAuth client secrets
- Consider rate limiting for comment posting
- Implement proper input validation and sanitization
- Configure Supabase RLS policies appropriately 