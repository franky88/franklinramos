import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { Portfolio } from "@/models/schema";
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
        JSON.stringify({ message: "Portfolio ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return new Response(
        JSON.stringify({ message: "Portfolio not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (portfolio.userId.toString() !== userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized to delete this portfolio" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    await Portfolio.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Portfolio deleted successfully" }),
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
