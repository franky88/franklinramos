import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
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
  const { id } = context.params;
  try {
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
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
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
