import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProjectType } from "@/models/schema";

// list all project type
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const projectType = await ProjectType.find({}, "_id name");

    return NextResponse.json({ projectType }, { status: 200 });
  } catch (error) {
    console.error("Error fetching project type:", error);
    return NextResponse.json(
      { message: "Failed to fetch project type" },
      { status: 500 }
    );
  }
}

// add project type
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
  
      const body: { name?: string } = await request.json();
      if (!body.name) {
        return new Response(
          JSON.stringify({ message: "Invalid request body" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const projectType = new ProjectType({ name: body.name });
      await projectType.save();
  
      return new Response(JSON.stringify(projectType), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error creating category:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }