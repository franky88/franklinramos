import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/portfolio-categories/[id]
export async function GET(_req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

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

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const { name } = await req.json();

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
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

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
