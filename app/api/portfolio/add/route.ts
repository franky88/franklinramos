import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio } from "@/models/schema";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    await connectDB();
    const { userId } = getAuth(request);

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body: { title?: string; description?: string; url?: string; projectTypeId?: string; projectTypeName: string; categoryId?: string; categoryName: string } = await request.json();
    if (!body.title || !body.description || !body.url) {
      return new Response(
        JSON.stringify({ message: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Request body:", body);

    const portfolio = new Portfolio({
      title: body.title,
      description: body.description,
      url: body.url,
      projectTypeId: body.projectTypeId,
      projectTypeName: body.projectTypeName,
      categoryId: body.categoryId,
      categoryName: body.categoryName,
      userId: userId,
    });
    await portfolio.save();

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
