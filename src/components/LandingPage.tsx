"use client";

import { HeroSection } from "./ui/hero-section";
import { FeatureCards } from "./ui/feature-cards";
import PortfolioSection from "./portfolio-section";
import ContactMe from "./contact-me-section";
import { FloatingNav } from "./ui/floating-navbar";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconFolderOpen,
  IconPhotoVideo,
} from "@tabler/icons-react";

const LandingPage = () => {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "#skills",
      icon: (
        <IconPhotoVideo className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Portfolio",
      link: "#portfolio",
      icon: (
        <IconFolderOpen className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <>
      <header>
        <FloatingNav navItems={navItems} />
      </header>
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="skills">
          <FeatureCards />
        </section>
        <section id="portfolio">
          <PortfolioSection />
        </section>
        <section id="contact" className="bg-black dark:bg-white">
          <ContactMe />
        </section>
      </main>
      <footer>
        <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Franklin Ramos. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
