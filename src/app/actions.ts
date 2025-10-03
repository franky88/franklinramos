"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        _count: {
          select: { comments: true, posts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getPosts(limit: number = 10) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
        comments: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        skills: true, // Added missing skills relation
        portfolios: true, // Added missing portfolios relation
        _count: {
          select: { comments: true, posts: true },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
}

export async function createUser({
  name,
  email,
  clerkId,
}: {
  name: string;
  email: string;
  clerkId: string;
}) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, clerkId },
    });

    revalidatePath("/");

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function createPost({
  title,
  content,
  authorId,
  published = false,
}: {
  title: string;
  content: string;
  authorId: string;
  published?: boolean;
}) {
  if (!title || !content || !authorId) {
    throw new Error("Title, content, and authorId are required");
  }

  try {
    // FIXED: Changed from prisma.post to prisma.user and fixed typo
    const authorExists = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!authorExists) {
      throw new Error("Author does not exist");
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: true,
      },
    });

    revalidatePath("/");
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}

export async function createComment({
  text,
  postId,
  authorId,
}: {
  text: string;
  postId: string;
  authorId: string;
}) {
  if (!text || !postId || !authorId) {
    throw new Error("Text, postId, and authorId are required");
  }

  try {
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    const authorExists = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!postExists) {
      throw new Error("Post does not exist");
    }

    if (!authorExists) {
      throw new Error("Author does not exist");
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
      include: { author: true, post: true },
    });

    revalidatePath("/");
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
}

// SKILL FUNCTIONS
export async function createSkill({
  name,
  level,
  skillCategoryId,
  userId,
}: {
  name: string;
  level: string;
  skillCategoryId?: string;
  userId?: string;
}) {
  if (!name || !level) {
    throw new Error("Name and level are required");
  }

  try {
    const skill = await prisma.skill.create({
      data: {
        name,
        level,
        ...(skillCategoryId && {
          skillCategory: { connect: { id: skillCategoryId } },
        }),
        ...(userId && { user: { connect: { id: userId } } }),
      },
      include: {
        skillCategory: true,
        user: true,
      },
    });

    revalidatePath("/");
    return skill;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw new Error("Failed to create skill");
  }
}

export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        skillCategory: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("Failed to fetch skills");
  }
}

export async function deleteSkill(skillId: string) {
  if (!skillId) {
    throw new Error("Skill ID is required");
  }
  try {
    const skill = await prisma.skill.delete({
      where: { id: skillId },
    });
    revalidatePath("/");
    return skill;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw new Error("Failed to delete skill");
  }
}

export async function updateSkill({
  skillId,
  name,
  level,
  skillCategoryId,
}: {
  skillId: string;
  name: string;
  level: string;
  skillCategoryId?: string;
}) {
  if (!skillId || !name || !level) {
    throw new Error("Skill ID, name and level are required");
  }
  try {
    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        name,
        level,
        ...(skillCategoryId && {
          skillCategory: { connect: { id: skillCategoryId } },
        }),
      },
      include: {
        skillCategory: true,
        user: true,
      },
    });
    revalidatePath("/");
    return skill;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw new Error("Failed to update skill");
  }
}

// PORTFOLIO FUNCTIONS
export async function getPortfolios() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        user: true,
        portfolioCategory: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return portfolios;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw new Error("Failed to fetch portfolios");
  }
}

export async function createPortfolio({
  title,
  description,
  imageUrl,
  projectUrl,
  userId,
  portfolioCategoryId,
  isHidden,
}: {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  userId?: string;
  portfolioCategoryId?: string;
  isHidden?: boolean;
}) {
  if (!title || !description) {
    throw new Error("All fields are required");
  }

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        isHidden: isHidden || false,
        ...(userId && { user: { connect: { id: userId } } }),
        ...(portfolioCategoryId && {
          portfolioCategory: { connect: { id: portfolioCategoryId } },
        }),
      },
      include: {
        user: true,
        portfolioCategory: true,
      },
    });

    revalidatePath("/");
    return portfolio;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw new Error("Failed to create portfolio");
  }
}

export async function deletePortfolio(portfolioId: string) {
  if (!portfolioId) {
    throw new Error("Portfolio ID is required");
  }

  try {
    const portfolio = await prisma.portfolio.delete({
      where: { id: portfolioId },
    });
    revalidatePath("/");
    return portfolio;
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw new Error("Failed to delete portfolio");
  }
}

export async function updatePortfolio({
  portfolioId,
  title,
  description,
  imageUrl,
  projectUrl,
  categoryId,
  isHidden,
}: {
  portfolioId: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  categoryId?: string;
  isHidden?: boolean;
}) {
  if (!portfolioId?.trim() || !title?.trim()) {
    throw new Error("All fields are required and cannot be empty");
  }

  if (imageUrl && imageUrl.trim() !== "") {
    try {
      new URL(imageUrl);
    } catch {
      throw new Error("Invalid image URL provided");
    }
  }

  if (projectUrl && projectUrl.trim() !== "") {
    try {
      new URL(projectUrl);
    } catch {
      throw new Error("Invalid project URL provided");
    }
  }

  try {
    const portfolio = await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl?.trim(),
        projectUrl: projectUrl?.trim(),
        isHidden: isHidden ?? false,
        ...(categoryId && {
          portfolioCategory: { connect: { id: categoryId } },
        }),
      },
      include: {
        user: true,
        portfolioCategory: true,
      },
    });

    revalidatePath("/");
    return portfolio;
  } catch (error) {
    console.error("Error updating portfolio:", error);

    if (error instanceof Error && error.message.includes("P2025")) {
      throw new Error("Portfolio not found");
    }

    throw new Error("Failed to update portfolio");
  }
}

// PORTFOLIO CATEGORY FUNCTIONS
export async function getPortfolioCategories() {
  try {
    const portfolioCategories = await prisma.portfolioCategory.findMany({});
    return portfolioCategories;
  } catch (error) {
    console.error("Error fetching portfolio categories:", error);
    throw new Error("Failed to fetch portfolio categories");
  }
}

export async function createPortfolioCategory({ name }: { name: string }) {
  if (!name) {
    throw new Error("Name is required");
  }
  try {
    const portfolioCategory = await prisma.portfolioCategory.create({
      data: { name },
    });
    revalidatePath("/");
    return portfolioCategory;
  } catch (error) {
    console.error("Error creating portfolio category:", error);
    throw new Error("Failed to create portfolio category");
  }
}

export async function deletePortfolioCategory(portfolioCategoryId: string) {
  if (!portfolioCategoryId) {
    throw new Error("Portfolio Category ID is required");
  }
  try {
    const portfolioCategory = await prisma.portfolioCategory.delete({
      where: { id: portfolioCategoryId },
    });

    revalidatePath("/");
    return portfolioCategory;
  } catch (error) {
    console.error("Error deleting portfolio category:", error);
    throw new Error("Failed to delete portfolio category");
  }
}

export async function updatePortfolioCategory({
  portfolioCategoryId,
  name,
}: {
  portfolioCategoryId: string;
  name: string;
  description?: string;
}) {
  if (!portfolioCategoryId || !name) {
    throw new Error("Portfolio Category ID and name are required");
  }
  try {
    const portfolioCategory = await prisma.portfolioCategory.update({
      where: { id: portfolioCategoryId },
      data: { name },
    });
    revalidatePath("/");
    return portfolioCategory;
  } catch (error) {
    console.error("Error updating portfolio category:", error);
    throw new Error("Failed to update portfolio category");
  }
}

// SKILL CATEGORY FUNCTIONS
export async function createSkillCategory({
  name,
  description,
  icon,
}: {
  name: string;
  description?: string;
  icon?: string;
}) {
  if (!name) {
    throw new Error("Name is required");
  }

  try {
    const skillCategory = await prisma.skillCategory.create({
      data: { name, description, icon },
    });

    revalidatePath("/");
    return skillCategory;
  } catch (error) {
    console.error("Error creating skill category:", error);
  }
}

export async function getSkillCategories() {
  try {
    console.log("Attempting to fetch skill categories...");
    const skillCategories = await prisma.skillCategory.findMany({
      include: {
        skills: true,
      },
      orderBy: { createdAt: "asc" },
    });

    console.log("Found skill categories:", skillCategories.length);
    return skillCategories;
  } catch (error) {
    console.error("Detailed error fetching skill categories:", error);

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    throw new Error(
      `Failed to fetch skill categories: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getSkillCategoryById(skillCategoryId: string) {
  try {
    const skillCategory = await prisma.skillCategory.findUnique({
      where: { id: skillCategoryId },
      include: {
        skills: {
          include: {
            user: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!skillCategory) {
      throw new Error("Skill category not found");
    }

    return skillCategory;
  } catch (error) {
    console.error("Error fetching skill category by ID:", error);
    throw new Error("Failed to fetch skill category");
  }
}

export async function deleteSkillCategory(skillCategoryId: string) {
  if (!skillCategoryId) {
    throw new Error("Skill Category ID is required");
  }

  try {
    const skillCategory = await prisma.skillCategory.delete({
      where: { id: skillCategoryId },
    });
    revalidatePath("/");
    return skillCategory;
  } catch (error) {
    console.error("Error deleting skill category:", error);
    throw new Error("Failed to delete skill category");
  }
}

export async function updateSkillCategory({
  skillCategoryId,
  name,
  description,
  icon,
}: {
  skillCategoryId: string;
  name: string;
  description?: string;
  icon?: string;
}) {
  if (!skillCategoryId || !name) {
    throw new Error("Skill Category ID and name are required");
  }

  try {
    const skillCategory = await prisma.skillCategory.update({
      where: { id: skillCategoryId },
      data: { name, description, icon },
      include: {
        skills: true,
      },
    });

    revalidatePath("/");
    return skillCategory;
  } catch (error) {
    console.error("Error updating skill category:", error);
    throw new Error("Failed to update skill category");
  }
}
