"use client";

import React, { useEffect } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { Portfolio } from "@prisma/client";
import { getPortfolios } from "@/app/actions";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
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

      {/* <StickyScroll content={portfolio} /> */}
    </>
  );
};

export default PortfolioSection;
