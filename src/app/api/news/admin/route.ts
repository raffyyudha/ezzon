import { NextResponse } from "next/server";
import { getAllNewsForAdmin } from "@/lib/newsStore";

/**
 * API endpoint for admin to get all news (including drafts and scheduled)
 */
export async function GET() {
  try {
    const items = await getAllNewsForAdmin();
    return NextResponse.json(items);
  } catch (err) {
    console.error("Failed to load news for admin", err);
    return NextResponse.json({ message: "Failed to load news" }, { status: 500 });
  }
}
