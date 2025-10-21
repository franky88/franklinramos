"use client";

import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipWords } from "./flip-words";
import { animate } from "framer-motion";
import { useEffect } from "react";

export const HeroSection = () => {
  const skills = [
    "graphic design.",
    "web design.",
    "web development.",
    "animation.",
  ];
  const navItems = [
    { href: "#portfolio", label: "See how I help brands stand out" },
    { href: "#contact", label: "Let's start your project" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - 80;
    animate(window.scrollY, targetY, {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20 animate-gradient" />

      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(rgba(212,212,212,0.3)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(rgba(64,64,64,0.3)_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Shooting meteors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`meteor-${i}`}
            className="absolute h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{
              top: `${Math.random() * 50}%`,
              left: "-100px",
              opacity: 0
            }}
            animate={{
              left: ["0%", "100%"],
              top: [`${Math.random() * 50}%`, `${Math.random() * 50 + 50}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0
                ? "rgba(96, 165, 250, 0.4)"
                : i % 3 === 1
                ? "rgba(168, 85, 247, 0.4)"
                : "rgba(45, 212, 191, 0.4)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: "20%", top: "20%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ right: "20%", bottom: "20%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        {/* Animated greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <motion.span
            className="text-sm md:text-base text-blue-400 font-semibold tracking-wider uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome to my Portfolio
          </motion.span>
        </motion.div>

        {/* Main heading with stagger effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block"
          >
            Hi! I{"'"}m{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] relative"
          >
            Franklin Ramos
            <motion.span
              className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 opacity-30 blur-xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.span>
        </motion.h1>

        {/* Subtitle with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A <b className="text-white">Multimedia Artist</b> with{" "}
            <span className="text-blue-400 font-semibold">9+ years</span> of
            experience in{" "}
          </motion.span>
          <strong className="text-blue-400">
            <FlipWords
              words={skills}
              colorScheme="custom"
              opacityPattern="fade"
              letterColors={["text-blue-400"]}
            />
          </strong>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-400"
          >
            I bring ideas to life with creativity and precision.
          </motion.span>
        </motion.div>

        {/* CTA buttons with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href.replace("#", ""))}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BorderButton>{item.label}</BorderButton>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Scroll Down
            </span>
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
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
