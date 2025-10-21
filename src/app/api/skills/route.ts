import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthAPI } from "@/lib/authUser";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      include: { skillCategory: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const authuser = await requireAuthAPI();
  if (!authuser.ok) {
    return NextResponse.json(
      { error: "Unauthorized please log in" },
      { status: 401 }
    );
  }
  try {
    const { name, level, categoryId, userId } = await req.json();
    const skill = await prisma.skill.create({
      data: { name, level, skillCategoryId: categoryId, userId },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
