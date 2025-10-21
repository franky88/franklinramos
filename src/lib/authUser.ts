import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "./prisma";

/**
 * Get the authenticated user's Clerk ID
 * Returns null if not authenticated
 */
export async function getAuthUserId() {
  const { userId } = await auth();
  return userId;
}

/**
 * Get the full authenticated user object
 * Returns null if not authenticated
 */
export async function getAuthUser() {
  const user = await currentUser();
  return user;
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in server actions or API routes that require auth
 */
export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: Please sign in to continue");
  }

  return userId;
}

// For API Routes
export async function requireAuthAPI() {
  const { userId } = await auth();

  if (!userId) {
    return {
      ok: false,
      error: NextResponse.json(
        { error: "Unauthorized: Please sign in to continue" },
        { status: 401 }
      ),
    };
  }

  return { ok: true, userId };
}

/**
 * Get authenticated user with full details
 * Returns user data needed for database operations
 */
export async function getAuthUserData() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return {
    clerkId: user.id,
    email: user.emailAddresses[0]?.emailAddress || "",
    name:
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
    imageUrl: user.imageUrl,
  };
}

/**
 * Get authenticated or create user with full details
 * Returns user data needed for database operations
 */

export async function getOrCreateUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Try to find existing user
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // If user doesn't exist, create them
  if (!user) {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          "Anonymous",
      },
    });
  }

  return user;
}
