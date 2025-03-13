"use client";

import { ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const AboutMe = () => {
  return (
    <section className="container h-screen mx-auto px-8">
      <div className="h-full flex flex-col gap-8 items-start justify-center">
        <div className="text-left">
          <h2 className={`${interBlack.className} text-[3em] text-gray-800`}>
            About me
          </h2>
          <div>
            {/* Image with Higher z-index */}
            <Image
              src="/profile_image.png"
              width={350}
              height={350}
              alt="profile image"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff00] to-[#8ddfee] opacity-30 rounded-[175px] z-0" /> */}
          </div>

          <p className={`${interRegular.className} text-[1em] w-[500px] mt-4`}>
            I am a versatile Multimedia Artist with over 10 years of experience
            in graphic design, video editing, animation, and web development.
            Skilled in Adobe Creative Suite and various multimedia tools, I
            create visually compelling and user-friendly digital experiences.
            With a passion for creativity and innovation, I deliver high-quality
            designs, animations, and websites that make an impact.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href={"/pdf-resume"}>
              <Button>
                <ArrowRight className="w-4" />
                Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
