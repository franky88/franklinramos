import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true, comments: true, skills: true, portfolios: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const { name, email } = await req.json();
//     if (!email)
//       return NextResponse.json({ error: "Email required" }, { status: 400 });

//     const user = await prisma.user.create({ data: { name, email } });
//     revalidatePath("/users");
//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     console.error(error);
// console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create user" },
//       { status: 500 }
//     );
//   }
// }
