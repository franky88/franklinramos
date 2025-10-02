"use client";

import React, { useEffect } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { Portfolio } from "@prisma/client";
import { fetchPortfolio } from "@/lib/dataFetch";

const PortfolioSection = () => {
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const res = await fetchPortfolio(1, 20);
      setPortfolios(res.data);
    };
    fetchPortfolios();
  }, []);

  return (
    <>
      <HeroParallax products={portfolios} />
    </>
  );
};

export default PortfolioSection;
