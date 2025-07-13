"use client";

import React from "react";
import { Flex, Text, Avatar } from "@once-ui-system/core";

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

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Flex direction="column" gap="xs" fillWidth>
      {comments.length === 0 ? (
        <Text variant="body-default-m" onBackground="neutral-weak">
          No comments yet. Be the first to leave a message!
        </Text>
      ) : (
        comments.map((comment) => (
          <Flex
            key={comment.id}
            direction="column"
            gap="xs"
            padding="s"
            radius="m"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Flex horizontal="space-between">
              <Flex direction="row" vertical="center" gap="xs">
                <Avatar
                  src={comment.author?.image || undefined}
                  size="s"
                />
                <Text variant="body-default-s" onBackground="neutral-strong">
                  {comment.author?.name || comment.author?.email || "Anonymous"}
                </Text>
              </Flex>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                  {formatDate(comment.created_at)}
              </Text>
            </Flex>
            <Text variant="body-default-m" style={{ whiteSpace: "pre-wrap" }}>
              {comment.content}
            </Text>
          </Flex>
        ))
      )}
    </Flex>
  );
}; 