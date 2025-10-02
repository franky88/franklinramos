import api from "./axios";
import {
  Portfolio,
  PortfolioCategory,
  Skill,
  SkillCategory,
  User,
} from "@prisma/client";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await api.get("users", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const res = await api.get(`users/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}:`, error);
    return null;
  }
};

export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const res = await api.get("skills", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
};

type SkillCategoryWithSkills = SkillCategory & { skills: Skill[] };

export const fetchSkillCategories = async (): Promise<
  SkillCategoryWithSkills[]
> => {
  try {
    const res = await api.get("skill-categories", {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch skill categories:", error);
    return [];
  }
};

type PortfolioWithRelations = Portfolio & {
  portfolioCategory: PortfolioCategory | null;
  user: User | null;
};

type PortfolioResponse = {
  data: PortfolioWithRelations[];
  total: number;
  page: number;
  limit: number;
};

export const fetchPortfolio = async (
  page: number = 1,
  limit: number = 5
): Promise<PortfolioResponse> => {
  try {
    const res = await api.get("portfolios", {
      params: { page, limit },
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return { data: [], total: 0, page, limit };
  }
};

export const fetchPortfolioCategories = async (): Promise<
  PortfolioCategory[]
> => {
  try {
    const res = await api.get("portfolio-categories", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch portfolio categories:", error);
    return [];
  }
};
