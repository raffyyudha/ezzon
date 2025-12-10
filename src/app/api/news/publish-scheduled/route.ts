import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * API endpoint to auto-publish scheduled posts
 * This should be called periodically (e.g., via cron job or scheduled task)
 */
export async function POST() {
  try {
    const now = new Date().toISOString();

    // Find all draft posts with scheduled_date that has passed
    const { data: scheduledPosts, error: fetchError } = await supabase
      .from("news")
      .select("*")
      .eq("status", "draft")
      .not("scheduled_date", "is", null)
      .lte("scheduled_date", now);

    if (fetchError) {
      console.error("Error fetching scheduled posts:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch scheduled posts", details: fetchError.message },
        { status: 500 }
      );
    }

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return NextResponse.json({
        message: "No scheduled posts to publish",
        published: 0,
      });
    }

    // Update all scheduled posts to published
    const postIds = scheduledPosts.map((post) => post.id);
    
    const { data: updatedPosts, error: updateError } = await supabase
      .from("news")
      .update({
        status: "published",
        published_at: now,
      })
      .in("id", postIds)
      .select();

    if (updateError) {
      console.error("Error publishing scheduled posts:", updateError);
      return NextResponse.json(
        { error: "Failed to publish scheduled posts", details: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully published ${updatedPosts?.length || 0} scheduled posts`,
      published: updatedPosts?.length || 0,
      posts: updatedPosts,
    });
  } catch (error) {
    console.error("Error in publish-scheduled API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check scheduled posts status
 */
export async function GET() {
  try {
    const now = new Date().toISOString();

    // Get all draft posts with scheduled dates
    const { data: scheduledPosts, error } = await supabase
      .from("news")
      .select("id, title, scheduled_date, status")
      .eq("status", "draft")
      .not("scheduled_date", "is", null)
      .order("scheduled_date", { ascending: true });

    if (error) {
      console.error("Error fetching scheduled posts:", error);
      return NextResponse.json(
        { error: "Failed to fetch scheduled posts", details: error.message },
        { status: 500 }
      );
    }

    // Separate into ready to publish and future scheduled
    const readyToPublish = scheduledPosts?.filter(
      (post) => post.scheduled_date && new Date(post.scheduled_date) <= new Date(now)
    ) || [];

    const futureScheduled = scheduledPosts?.filter(
      (post) => post.scheduled_date && new Date(post.scheduled_date) > new Date(now)
    ) || [];

    return NextResponse.json({
      readyToPublish: readyToPublish.length,
      futureScheduled: futureScheduled.length,
      readyPosts: readyToPublish,
      futurePosts: futureScheduled,
    });
  } catch (error) {
    console.error("Error in publish-scheduled GET:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
