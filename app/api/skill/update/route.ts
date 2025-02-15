import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Skill } from "@/models/schema";

const skillSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  application: z.string().optional(),
  mastery: z.number().optional()
});

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const parsedBody = skillSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { _id, name, application, mastery } = parsedBody.data;

    const skill = await Skill.findById(_id);
    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    if (skill.userId.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to update this skill" },
        { status: 403 }
      );
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      _id,
      {
        name: name ?? skill.name,
        application: application ?? skill.application,
        mastery: mastery ?? skill.mastery,
      },
      { new: true }
    );

    return NextResponse.json(updatedSkill, { status: 200 });
  } catch (error: any) {
    console.error("Error updating skill:", error);

    return NextResponse.json(
      { message: process.env.NODE_ENV === "development" ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
