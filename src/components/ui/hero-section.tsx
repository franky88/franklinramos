"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipWords } from "./flip-words";
import { animate } from "framer-motion";

export const HeroSection = () => {
  const skills = [
    "graphic design.",
    "web design.",
    "web development.",
    "animation.",
  ];
  const navItems = [
    { href: "#portfolio", label: "View my works" },
    { href: "#contact", label: "Contact me" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - 80; // Offset for header
    animate(window.scrollY, targetY, {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(rgba(212,212,212,0.3)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(rgba(64,64,64,0.3)_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Hi! I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Franklin Ramos
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          A <b>Multimedia Artist</b> with 5+ years of experience in{" "}
          <strong className="text-blue-400">
            <FlipWords
              words={skills}
              colorScheme="custom"
              opacityPattern="fade"
              letterColors={["text-blue-400"]}
            />
          </strong>
          <br /> I bring ideas to life with creativity and precision.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href.replace("#", ""))}
            >
              <BorderButton>{item.label}</BorderButton>
            </a>
          ))}

          {/* <BorderButton>Contact Me</BorderButton> */}
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              y: [-20, -100, -20],
              x: [0, 100, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ShimmerButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white">
      {children}
    </button>
  );
};

const BorderButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
        {children}
      </span>
    </button>
  );
};
