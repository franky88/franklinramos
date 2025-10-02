"use client";

import { useState, useEffect } from "react";
import { fetchPortfolio } from "@/lib/dataFetch";
import Portfolios from "./Portfolios";
import { Button } from "@/components/ui/button";
import { Portfolio, PortfolioCategory, User } from "@prisma/client";
import Categories from "./category/Categories";
import AddPortfolio from "./AddPortfolio";

type PortfolioWithRelations = Portfolio & {
  portfolioCategory: PortfolioCategory | null;
  user: User | null;
};

export default function PortfoliosList() {
  const [page, setPage] = useState(1);
  const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const load = async () => {
    try {
      setLoading(true);
      const { data: portfolios, total } = await fetchPortfolio(page, limit);
      setPortfolios(portfolios);
      setTotal(total);
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Portfolio List</h3>
          <p>List of portfolio categories and their associated portfolios.</p>
        </div>
        <div>
          <div className="flex gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Categories />
                <AddPortfolio fetchPortfoliosData={load} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 border flex-1 rounded-xl md:min-h-min">
        <Portfolios
          portfolios={portfolios}
          fetchPortfoliosData={load}
          loading={loading}
        />
      </div>

      <div className="flex justify-end items-center gap-4 mt-4 mb-4 px-4">
        {page > 1 && (
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-full h-7"
          >
            Previous
          </Button>
        )}
        <span>
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-full h-7"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
