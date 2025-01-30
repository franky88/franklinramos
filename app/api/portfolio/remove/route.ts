import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(request);

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse the request body to get the portfolio ID
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Portfolio ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the portfolio belongs to the authenticated user
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: id },
    });

    if (!portfolio) {
      return new Response(
        JSON.stringify({ message: "Portfolio not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (portfolio.userId !== userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized to delete this portfolio" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the portfolio
    await prisma.portfolio.delete({
      where: { id: id },
    });

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
