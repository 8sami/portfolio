"use client";

import React, { useState } from "react";
import { Button, Input } from "@once-ui-system/core";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isLoading = false }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="comment-content"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value)}
        disabled={isSubmitting || isLoading}
        hasSuffix={
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting || isLoading}
            loading={isSubmitting}
            size="s"
            variant="primary"
          >
            Post
          </Button>
        }
      />
    </form>
  );
}; 