import Portfolios from "@/components/portfolio/Portfolios";
import React, { Suspense } from "react";
import { fetchPortfolio } from "@/lib/dataFetch";
import { Card, CardContent } from "@/components/ui/card";
import Categories from "@/components/portfolio/category/Categories";
import AddCategory from "@/components/portfolio/category/AddCategory";
import AddPortfolio from "@/components/portfolio/AddPortfolio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PortfoliosList from "@/components/portfolio/PortfolioList";

type PortfolioPageProps = {
  searchParams?: {
    page?: string;
  };
};

const PortfolioPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const resolvedSearch = searchParams;
  const page = Number(resolvedSearch?.page) || 1;
  const limit = 5;

  const { data: portfolios, total } = await fetchPortfolio(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-2">
      <PortfoliosList />
    </div>
  );
};

export default PortfolioPage;
