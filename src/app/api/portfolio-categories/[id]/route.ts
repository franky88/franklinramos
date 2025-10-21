import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthAPI } from "@/lib/authUser";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.portfolioCategory.findUnique({
      where: { id },
      include: { portfolios: true },
    });

    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio category" },
      { status: 500 }
    );
  }
}

export async function PUT(
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
  try {
    const { id } = await params;
    const { name } = await _req.json();

    const updated = await prisma.portfolioCategory.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update portfolio category" },
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
  try {
    const { id } = await params;

    await prisma.portfolioCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete portfolio category" },
      { status: 500 }
    );
  }
}
