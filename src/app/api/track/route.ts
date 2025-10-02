import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    await prisma.visitor.create({
      data: {
        url: body.url || "unknown",
        referrer: body.referrer || "",
        ua: body.ua || req.headers.get("user-agent") || "",
        language: body.language || "",
        viewport: body.viewport || "",
        ip,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("track error", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
