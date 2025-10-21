import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthAPI } from "@/lib/authUser";

export async function GET() {
  try {
    const categories = await prisma.portfolioCategory.findMany({
      include: { portfolios: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio categories" },
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
    const { name } = await req.json();
    const category = await prisma.portfolioCategory.create({ data: { name } });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create portfolio category" },
      { status: 500 }
    );
  }
}
