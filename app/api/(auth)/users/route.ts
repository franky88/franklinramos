import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/user";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { username, email, password } = await request.json();
    await connect();
    const user = new User({ username, email, password });
    await user.save();

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
