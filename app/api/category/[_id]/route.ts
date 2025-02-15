import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/schema";

export async function GET(request: NextRequest, context: { params: { _id: string } }): Promise<NextResponse> {
  try {
    await connectDB();
    
    const { _id } = context.params;
    console.log("response from the server ID: ", _id)
    const category = await Category.findById(_id).select("_id name");
    
    if (!category) {
      return NextResponse.json(
        { message: `Category with id ${_id} not found` },
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
