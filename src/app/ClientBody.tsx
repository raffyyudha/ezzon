"use client";

import { useEffect } from "react";
import ChatWidget from "@/components/ChatWidget";
import ScheduledPostsPublisher from "@/components/ScheduledPostsPublisher";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      {children}
      <ChatWidget />
      <ScheduledPostsPublisher />
    </div>
  );
}
