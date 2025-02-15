import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/schema";
import { z } from "zod";

const experienceSchema = z.object({
  _id: z.string(),
  position: z.string().optional(),
  company: z.string().optional(),
  description: z.string().optional(),
  isPromoted: z.boolean().optional(),
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
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = experienceSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { _id, position, description, company, isPromoted, startDate, endDate } = parsedBody.data;

    await connectDB();

    const experience = await Experience.findById(_id);

    if (!experience) {
      return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    }

    if (experience.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to update this experience" },
        { status: 403 }
      );
    }

    experience.position = position ?? experience.position;
    experience.description = description ?? experience.description;
    experience.company = company ?? experience.company;
    experience.isPromoted = isPromoted ?? experience.isPromoted;
    experience.startDate = startDate ?? experience.startDate;
    experience.endDate = endDate ?? experience.endDate;
    await experience.save();

    return NextResponse.json(experience, { status: 200 });
  } catch (error: any) {
    console.error("Error updating experience:", error);

    const errorMessage =
      process.env.NODE_ENV === "development" ? error.message : "Internal server error";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
