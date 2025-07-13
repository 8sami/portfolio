"use client";

import React, { useState } from "react";
import { Flex, Textarea, Button } from "@once-ui-system/core";

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
      <Flex position="relative" fillWidth>
        <Textarea
          id="comment-content"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          lines={1}
          disabled={isSubmitting || isLoading}
          style={{ width: "100%" }}
        />
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting || isLoading}
          loading={isSubmitting}
          size="s"
          style={{
            position: "absolute",
            right: "16px",
            bottom: "8px",
          }}
        >
          Post
        </Button>
      </Flex>
    </form>
  );
}; 