import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Category } from "@/models/schema";
import { connectDB } from "@/lib/db";


export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Category ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const category = await Category.findById(id);
    if (!category) {
      return new Response(
        JSON.stringify({ message: "Category not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await Category.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "Category deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
