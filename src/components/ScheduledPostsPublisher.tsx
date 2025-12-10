"use client";

import { useEffect } from "react";

/**
 * Component to automatically publish scheduled posts
 * This runs on the client side and checks every 5 minutes
 */
export default function ScheduledPostsPublisher() {
  useEffect(() => {
    // Function to publish scheduled posts
    const publishScheduledPosts = async () => {
      try {
        const response = await fetch("/api/news/publish-scheduled", {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.published > 0) {
            console.log(`✅ Published ${data.published} scheduled posts`);
          }
        }
      } catch (error) {
        console.error("Error publishing scheduled posts:", error);
      }
    };

    // Run immediately on mount
    publishScheduledPosts();

    // Then run every 5 minutes (300000 ms)
    const interval = setInterval(publishScheduledPosts, 5 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // This component doesn't render anything
  return null;
}
