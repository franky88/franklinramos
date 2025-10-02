import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      include: { skillCategory: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, level, categoryId, userId } = await req.json();
    const skill = await prisma.skill.create({
      data: { name, level, skillCategoryId: categoryId, userId },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
