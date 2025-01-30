import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server"; // Import NextRequest correctly


export async function POST(request: NextRequest) { // Change Request to NextRequest
  try {
    // Authenticate the user
    const { userId } = getAuth(request); // Now this should work correctly

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse the request body
    const body = await request.json();

    // Validate request body
    if (!body.title || !body.description || !body.url) {
      return new Response(
        JSON.stringify({ message: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Request body:", body);

    // Create the portfolio and link it to the authenticated user
    const portfolio = await prisma.portfolio.create({
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
        categoryId: body.categoryId,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(portfolio), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);

    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
