import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/schema";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    console.log("user id", userId)

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();

    const requiredFields = [
      "position",
      "company",
      "description",
      "startDate",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (typeof body.isPromoted !== "boolean") {
      return NextResponse.json(
        { message: "Invalid value for is promoted" },
        { status: 400 }
      );
    }

    await connectDB();

    const experience = await Experience.create({
      position: body.position,
      company: body.company,
      description: body.description,
      isPromoted: body.isPromoted,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      userId: userId,
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    console.error("Error creating experience:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500 }
    );
  }
}
