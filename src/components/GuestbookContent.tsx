"use client";

import React, { useState, useEffect } from "react";
import { Flex, Heading, Schema, Column, Button, Text, Icon, Dialog } from "@once-ui-system/core";
import { baseURL, guestbook, person } from "@/resources";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { supabase } from "@/lib/supabase";

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

export const GuestbookContent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Handle authentication state
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setUser(session?.user ?? null);
        
        // If user just signed in, try to post pending comment
        if (event === 'SIGNED_IN' && session?.user) {
          const pending = localStorage.getItem('pendingComment');
          if (pending) {
            handleSubmitComment(pending);
            localStorage.removeItem('pendingComment');
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (content: string) => {
    if (!user) {
      localStorage.setItem('pendingComment', content);
      setShowSignInModal(true);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No access token");
      }

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        return newComment;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  };

  // Handle sign in
  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/guestbook`
        }
      });
      if (error) {
        console.error('Sign in error:', error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={guestbook.title}
        description={guestbook.description}
        path={guestbook.path}
        image={`/api/og/generate?title=${encodeURIComponent(guestbook.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${guestbook.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24" gap="l" maxHeight="l">
        {/* Header */}
        <Column maxWidth="s">
          <Heading variant="display-strong-l">
            {guestbook.title}
          </Heading>
          <Text variant="heading-default-xl" onBackground="neutral-weak">
            {guestbook.description}
          </Text>
        </Column>

        {/* Comments Section */}
        <Column fillWidth gap="s">
          <Heading as="h2" variant="display-strong-xs">
            Comments
          </Heading>
          <CommentList comments={comments} />
        </Column>

        {/* Comment Form - Always visible */}
        <Column fillWidth gap="m">
          <Heading as="h2" variant="display-strong-xs">
            Leave a comment
          </Heading>
          <CommentForm onSubmit={handleSubmitComment} isLoading={isLoading} />
        </Column>
      </Column>

      {/* Sign-in Modal */}
      <Dialog
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign in to comment"
        maxWidth="xs"
        className="sm:h-md"
      >
        <Flex
          direction="column"
          gap="m"
          background="transparent"
          border="transparent"
        >
          <Text variant="body-default-m" onBackground="neutral-weak">
            You need to sign in to leave a comment.
          </Text>
          <Flex direction="column" gap="s">
            <Button
              onClick={() => handleSignIn("google")}
              size="m"
              fillWidth
              loading={isAuthenticating}
            >
              <Icon name="google" size="s" marginRight="8"/>
              Continue with Google
            </Button>
            <Button
              onClick={() => handleSignIn("github")}
              size="m"
              fillWidth
              loading={isAuthenticating}
            >
              <Icon name="github" size="s" marginRight="8"/>
              Continue with GitHub
            </Button>
          </Flex>
        </Flex>
      </Dialog>
    </Column>
  );
};
