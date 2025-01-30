import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const portfolio = categoryId
      ? await prisma.portfolio.findMany({
          where: { categoryId: categoryId },
        })
      : await prisma.portfolio.findMany({
        orderBy: {
          createdAt: "desc",
        }
      });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ message: "Failed to fetch portfolio" }, { status: 500 });
  }
}
