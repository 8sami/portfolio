import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        author:author_id (
          id,
          name,
          email,
          image
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    return NextResponse.json(comments || []);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Create Supabase client with the user's session
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
    
    // Verify the JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // First, ensure the user exists in the users table
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (userError && userError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error("Error checking user:", userError);
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 500 }
      );
    }

    // If user doesn't exist, create them
    if (!existingUser) {
      const { error: insertUserError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name,
          image: user.user_metadata?.avatar_url || user.user_metadata?.picture
        });

      if (insertUserError) {
        console.error("Error creating user:", insertUserError);
        return NextResponse.json(
          { error: "Failed to create user record" },
          { status: 500 }
        );
      }
    }

    // Insert the comment into the database (RLS will allow this for authenticated users)
    const { data: newComment, error: insertError } = await supabase
      .from('comments')
      .insert({
        content: content.trim(),
        author_id: user.id
      })
      .select(`
        id,
        content,
        created_at,
        author:author_id (
          id,
          name,
          email,
          image
        )
      `)
      .single();

    if (insertError) {
      console.error("Error inserting comment:", insertError);
      return NextResponse.json(
        { error: "Failed to create comment", details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
} 