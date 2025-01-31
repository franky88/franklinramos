import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({experience});
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json({ message: "Failed to fetch experience" }, { status: 500 });
  }
}