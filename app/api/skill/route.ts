import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Skill } from "@/models/schema";

export async function GET() {
  
  try {
    await connectDB()
    // const skills = await prisma.skill.findMany();
    const skills = await Skill.find()
    console.log('fetching skills from server', skills)
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json({ message: "Failed to fetch skill" }, { status: 500 });
  }
}