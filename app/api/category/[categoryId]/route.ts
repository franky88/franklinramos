import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
  const { categoryId } = await params;

  console.log(request)

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: `Category with id ${categoryId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);

    return NextResponse.json(
      { message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
