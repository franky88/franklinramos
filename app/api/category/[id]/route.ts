import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/schema";
import mongoose from "mongoose";

interface RouteContext {
  params: { id: string };
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
    }

    const category = await Category.findById(id).select("_id name");

    if (!category) {
      return NextResponse.json(
        { message: `Category with id ${id} not found` },
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
