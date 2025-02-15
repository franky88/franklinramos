import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Portfolio } from "@/models/schema";

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
    await connectDB();

    // Authenticate user
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const parsedBody = portfolioSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { id, title, description, url, imageUrl, categoryId } = parsedBody.data;

    // Check if portfolio exists
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    }

    // Ensure user owns the portfolio
    if (portfolio.userId.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to update this portfolio" },
        { status: 403 }
      );
    }

    // Update the portfolio
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      {
        title: title ?? portfolio.title,
        description: description ?? portfolio.description,
        url: url ?? portfolio.url,
        imageUrl: imageUrl ?? portfolio.imageUrl,
        categoryId: categoryId ?? portfolio.categoryId,
      },
      { new: true }
    );

    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error: any) {
    console.error("Error updating portfolio:", error);

    return NextResponse.json(
      { message: process.env.NODE_ENV === "development" ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
