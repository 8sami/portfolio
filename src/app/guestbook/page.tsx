import { Meta } from "@once-ui-system/core";
import { baseURL, guestbook } from "@/resources";
import { GuestbookContent } from "@/components/guestbook/GuestbookContent";

export async function generateMetadata() {
  return Meta.generate({
    title: guestbook.title,
    description: guestbook.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(guestbook.title)}`,
    path: guestbook.path,
  });
}

async function fetchComments() {
  // Use the local API route for fetching
  const res = await fetch(`${baseURL}/api/comments`, { cache: "no-store" });
  if (!res.ok) {
    console.error("Failed to fetch initial comments from API route");
    return [];
  }
  return res.json();
}

export default async function Guestbook() {
  const comments = await fetchComments();
  return <GuestbookContent initialComments={comments} />;
}
