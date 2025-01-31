import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json({skills});
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json({ message: "Failed to fetch skill" }, { status: 500 });
  }
}