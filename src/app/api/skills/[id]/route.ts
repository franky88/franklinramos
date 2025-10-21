import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthAPI } from "@/lib/authUser";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
      include: { skillCategory: true, user: true },
    });
    if (!skill)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(skill);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authuser = await requireAuthAPI();
  if (!authuser.ok) {
    return NextResponse.json(
      { error: "Unauthorized please log in" },
      { status: 401 }
    );
  }
  const { id } = await params;
  try {
    const { name, level } = await req.json();
    const updated = await prisma.skill.update({
      where: { id },
      data: { name, level },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authuser = await requireAuthAPI();
  if (!authuser.ok) {
    return NextResponse.json(
      { error: "Unauthorized please log in" },
      { status: 401 }
    );
  }
  const { id } = await params;
  try {
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
