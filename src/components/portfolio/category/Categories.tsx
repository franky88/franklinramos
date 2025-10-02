"use client";

import { PortfolioCategory } from "@prisma/client";
import CategoriesClient from "./CategoriesClient";
import { useEffect, useState } from "react";
import { fetchPortfolioCategories } from "@/lib/dataFetch";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchPortfolioCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading && categories.length === 0) {
    return <Skeleton className="h-7 w-[110px] rounded-full" />;
  }

  return (
    <CategoriesClient
      categories={categories}
      fetchCategoriesData={fetchCategories}
    />
  );
};

export default Categories;
