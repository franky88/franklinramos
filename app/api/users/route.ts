import { User } from "@/models/schema";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const users = await User.find({}, "_id name");
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}