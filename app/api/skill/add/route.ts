import { connectDB } from "@/lib/db";
import { Skill } from "@/models/schema";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB(); // Ensure database connection

    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Received body:", body);

    // Ensure mastery is a valid number
    const masteryNumber = Number(body.mastery);
    if (isNaN(masteryNumber)) {
      return NextResponse.json({ message: "Mastery must be a number" }, { status: 400 });
    }

    // Create a new Skill document
    const skill = new Skill({
      name: body.name,
      application: body.application,
      from: new Date(body.from),
      to: new Date(body.to),
      mastery: masteryNumber,
      userId: userId, // Reference to the user
    });

    await skill.save(); // Save to MongoDB

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
