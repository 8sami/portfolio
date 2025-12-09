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
  isLoading?: boolean;
}

const SkeletonBox: React.FC<{
  width?: string;
  height?: string;
  borderRadius?: string;
}> = ({ width = "100%", height = "16px", borderRadius = "4px" }) => (
  <div
    style={{
      width,
      height,
      borderRadius,
      background: "linear-gradient(90deg, var(--neutral-alpha-weak) 25%, var(--neutral-alpha-medium) 50%, var(--neutral-alpha-weak) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 3.5s infinite ease-in-out",
    }}
  />
);

const CommentSkeleton: React.FC = () => (
  <Flex
    direction="column"
    gap="xs"
    padding="s"
    radius="m"
    background="surface"
    border="neutral-alpha-weak"
    fillWidth
  >
    <Flex horizontal="space-between" vertical="center">
      <Flex direction="row" vertical="center" gap="xs">
        <SkeletonBox width="24px" height="24px" borderRadius="50%" />
        <SkeletonBox width="100px" height="14px" borderRadius="4px" />
      </Flex>
      <SkeletonBox width="80px" height="12px" borderRadius="4px" />
    </Flex>
    <Flex direction="column" gap="4" fillWidth>
      <SkeletonBox width="100%" height="16px" borderRadius="4px" />
      <SkeletonBox width="75%" height="16px" borderRadius="4px" />
    </Flex>
  </Flex>
);

export const CommentList: React.FC<CommentListProps> = ({ comments, isLoading }) => {
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
    <>
    <style>
      {`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}
    </style>
    <Flex direction="column" gap="xs" fillWidth>
      {isLoading && <CommentSkeleton />}
      {comments.length === 0 && !isLoading ? (
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
  </>
  );
}; 