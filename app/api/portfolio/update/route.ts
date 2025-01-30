import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const portfolioSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  categoryId: z.string().optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = portfolioSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { id, title, description, url, imageUrl, categoryId } =
      parsedBody.data;

    // Check if the portfolio exists and belongs to the user
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });

    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    }

    if (portfolio.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to update this portfolio" },
        { status: 403 }
      );
    }

    // Update the portfolio
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: title ?? undefined,
        description: description ?? undefined,
        url: url ?? undefined,
        imageUrl: imageUrl ?? "",
        categoryId: categoryId ?? undefined,
      },
    });

    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error: any) {
    console.error("Error updating portfolio:", error);

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal server error";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
