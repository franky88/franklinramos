import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Skill } from "@/models/schema";

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Skill ID is required" },
        { status: 400 }
      );
    }
    await connectDB();

    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    if (skill.userId.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to delete this skill" },
        { status: 403 }
      );
    }

    // Delete the experience
    await Skill.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Skill deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
