import { Suspense } from "react";
import { Meta } from "@once-ui-system/core";
import { baseURL, guestbook } from "@/resources";
import { GuestbookContent } from "@/components/guestbook/GuestbookContent";
import Loading from "./loading";

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
  try {
    const res = await fetch(`${baseURL}/api/comments`, {
      cache: "no-store"
    });

    if (!res.ok) {
      console.error("Failed to fetch initial comments from API route");
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

async function GuestbookData() {
  const comments = await fetchComments();
  return <GuestbookContent initialComments={comments} />;
}

export default function Guestbook() {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <GuestbookData />
      </Suspense>
    </section>
  );
}