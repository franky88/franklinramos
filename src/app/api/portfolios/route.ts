import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/authUser";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.portfolio.findMany({
        skip,
        take: limit,
        include: {
          portfolioCategory: true,
          user: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.portfolio.count(),
    ]);

    return NextResponse.json({
      data,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await getOrCreateUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, imageUrl, projectUrl, categoryId } =
      await req.json();
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        portfolioCategoryId: categoryId,
        userId: user.id,
      },
    });
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
