import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/schema";

export async function GET() {
  try {
    await connectDB();
    const experience = await Experience.find().sort({ createdAt: -1 });
    return NextResponse.json({ experience });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json({ message: "Failed to fetch experience" }, { status: 500 });
  }
}