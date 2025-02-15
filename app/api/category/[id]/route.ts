import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/schema";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Extract ID from the URL pathname
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Get the last segment (ID)

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
    }

    // Query category by ID
    const category = await Category.findById(id).select("_id name").lean();

    if (!category) {
      return NextResponse.json(
        { message: `Category with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
