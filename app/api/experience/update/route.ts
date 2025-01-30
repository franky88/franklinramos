import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const experienseSchema = z.object({
    id: z.string(),
    position: z.string().optional(),
    company: z.string().optional(),
    description: z.string().optional(),
    isWithLine: z.boolean().optional(),
    startDate: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg ?? null),
        z.date().nullable().optional()
      ),
    endDate: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg ?? null),
        z.date().nullable().optional()
      ),
  });

export async function PATCH(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = experienseSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { id, position, description, company, isWithLine, startDate, endDate } =
      parsedBody.data;

    // Check if the portfolio exists and belongs to the user
    const experience = await prisma.experience.findUnique({ where: { id } });

    if (!experience) {
      return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    }

    if (experience.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to update this experience" },
        { status: 403 }
      );
    }

    // Update the portfolio
    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        position: position ?? undefined,
        description: description ?? undefined,
        company: company ?? undefined,
        isWithLine: isWithLine ?? false,
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      },
    });

    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error: any) {
    console.error("Error updating experience:", error);

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal server error";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
