"use client";

import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { portfolio } from "@/services/portfolio";

const PortfolioSection = () => {
  return <HeroParallax products={portfolio} />;
};

export default PortfolioSection;
