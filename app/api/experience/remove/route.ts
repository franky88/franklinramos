import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/schema";

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    console.log("experience ID: ", body)

    if (!id) {
      return NextResponse.json(
        { message: "Experience ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Check if the experience belongs to the authenticated user
    const experience = await Experience.findById(id);

    if (!experience) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    if (experience.userId.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to delete this experience" },
        { status: 403 }
      );
    }

    // Delete the experience
    await Experience.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
