import { Meta } from "@once-ui-system/core";
import { baseURL, guestbook } from "@/resources";
import { GuestbookContent } from "@/components/GuestbookContent";

export async function generateMetadata() {
  return Meta.generate({
    title: guestbook.title,
    description: guestbook.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(guestbook.title)}`,
    path: guestbook.path,
  });
}

export default function Guestbook() {
  return <GuestbookContent />;
}
