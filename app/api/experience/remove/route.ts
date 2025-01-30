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
        JSON.stringify({ message: "Experience ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the portfolio belongs to the authenticated user
    const experience = await prisma.experience.findUnique({
      where: { id: id },
    });

    if (!experience) {
      return new Response(
        JSON.stringify({ message: "Experience not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (experience.userId !== userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized to delete this experience" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the portfolio
    await prisma.experience.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify({ message: "Experience deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting experience:", error);

    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
