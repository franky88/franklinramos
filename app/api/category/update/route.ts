import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
  });

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = categorySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { id, name  } = parsedBody.data;

    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: name ?? undefined,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    console.error("Error updating category:", error);

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal server error";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
