import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();

    // Validate request body
    const requiredFields = [
      "position",
      "company",
      "description",
      "startDate",
      "endDate",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Explicitly check for `isWithLine` (ensure it's a boolean)
    if (typeof body.isWithLine !== "boolean") {
      return NextResponse.json(
        { message: "Invalid value for isWithLine" },
        { status: 400 }
      );
    }

    // Log request body for debugging
    console.log("Request body:", body);

    // Create the portfolio and link it to the authenticated user
    const experience = await prisma.experience.create({
      data: {
        position: body.position,
        company: body.company,
        description: body.description,
        isWithLine: body.isWithLine,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        userId: userId,
      },
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
