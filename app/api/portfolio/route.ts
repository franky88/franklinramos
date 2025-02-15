import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio } from "@/models/schema";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const portfolio = categoryId
      ? await Portfolio.find({ categoryId }).sort({ createdAt: -1 })
      : await Portfolio.find().sort({ createdAt: -1 });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ message: "Failed to fetch portfolio" }, { status: 500 });
  }
}