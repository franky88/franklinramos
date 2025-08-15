"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  letterColors = [],
  letterOpacities = [],
  colorScheme = "default",
  opacityPattern = "default",
}: {
  words: string[];
  duration?: number;
  className?: string;
  letterColors?: string[];
  letterOpacities?: string[];
  colorScheme?:
    | "default"
    | "rainbow"
    | "gradient"
    | "blue"
    | "purple"
    | "custom";
  opacityPattern?: "default" | "fade" | "wave" | "random";
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  // Color scheme functions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getLetterColor = (letterIndex: number, wordIndex: number = 0) => {
    if (letterColors.length > 0) {
      return letterColors[letterIndex % letterColors.length];
    }

    switch (colorScheme) {
      case "rainbow":
        const rainbowColors = [
          "text-red-400",
          "text-orange-400",
          "text-yellow-400",
          "text-green-400",
          "text-blue-400",
          "text-indigo-400",
          "text-purple-400",
          "text-pink-400",
        ];
        return rainbowColors[letterIndex % rainbowColors.length];

      case "gradient":
        const gradientColors = [
          "text-blue-400",
          "text-purple-400",
          "text-pink-400",
          "text-red-400",
          "text-orange-400",
        ];
        return gradientColors[letterIndex % gradientColors.length];

      case "blue":
        const blueColors = [
          "text-blue-300",
          "text-blue-400",
          "text-blue-500",
          "text-cyan-400",
          "text-sky-400",
        ];
        return blueColors[letterIndex % blueColors.length];

      case "purple":
        const purpleColors = [
          "text-purple-300",
          "text-purple-400",
          "text-purple-500",
          "text-violet-400",
          "text-indigo-400",
        ];
        return purpleColors[letterIndex % purpleColors.length];

      default:
        return "";
    }
  };

  // Opacity pattern functions
  const getLetterOpacity = (letterIndex: number, totalLetters: number) => {
    if (letterOpacities.length > 0) {
      return letterOpacities[letterIndex % letterOpacities.length];
    }

    switch (opacityPattern) {
      case "fade":
        const fadeOpacities = [
          "opacity-100",
          "opacity-90",
          "opacity-80",
          "opacity-70",
        ];
        return fadeOpacities[letterIndex % fadeOpacities.length];

      case "wave":
        const progress = letterIndex / totalLetters;
        const waveValue = Math.sin(progress * Math.PI * 2) * 0.3 + 0.7;
        return `opacity-[${waveValue.toFixed(2)}]`;

      case "random":
        const randomOpacities = [
          "opacity-60",
          "opacity-70",
          "opacity-80",
          "opacity-90",
          "opacity-100",
        ];
        return randomOpacities[
          Math.floor(Math.random() * randomOpacities.length)
        ];

      default:
        return "opacity-100";
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
          className
        )}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => {
          const totalLettersInWord = word.length;

          return (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.3,
                duration: 0.3,
              }}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2,
                  }}
                  className={cn(
                    "inline-block transition-all duration-300 hover:scale-110",
                    getLetterColor(letterIndex, wordIndex),
                    getLetterOpacity(letterIndex, totalLettersInWord)
                  )}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
