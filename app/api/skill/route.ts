import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Skill } from "@/models/schema";

export async function GET() {
  
  try {
    await connectDB()
    const skills = await Skill.find()
    return NextResponse.json({skills});
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json({ message: "Failed to fetch skill" }, { status: 500 });
  }
}