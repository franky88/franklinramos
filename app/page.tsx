"use client";

import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import { ChevronLeft } from "lucide-react";

const interBlack = Inter({
  weight: ["900"],
  subsets: ["latin"],
});

const interRegular = Inter({
  weight: ["300"],
  subsets: ["latin"],
});

const Home = () => {
  const [activeSection, setActiveSection] = useState<string | null>("about-me");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <main className="bg-slate-100 h-screen">
      <div className="container h-full mx-auto px-8">
        <div className="h-full flex flex-col md:flex-row gap-4">
          {/* sidebar */}
          <div className="flex flex-col items-center md:items-end w-1/3 justify-center h-full">
            <p className={`${interBlack.className} text-[4em]`}>FRANKLIN</p>
            <p className={`${interBlack.className} text-[4em] -mt-8`}>RAMOS</p>
            <small className={`${interRegular.className} text-[2em]`}>
              Multimedia Artist
            </small>
            <div className="mt-4">
              {/* <SidebarMenu /> */}
              <div className="flex flex-col items-end gap-3 mt-5">
                <div
                  className={`flex gap-1 hover:-translate-x-4 duration-300 ${
                    activeSection === "about-me"
                      ? "-translate-x-4 text-blue-900 px-4 py-2"
                      : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("about-me")}>
                    About me
                    <span
                      className={`absolute right-0 translate-x-6 transition-opacity duration-300 ${
                        activeSection === "about-me"
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <ChevronLeft className="w-4" />
                    </span>
                  </button>
                </div>
                <div
                  className={`flex gap-1 hover:-translate-x-4 duration-300 ${
                    activeSection === "projects"
                      ? "-translate-x-4 text-blue-900 px-4 py-2"
                      : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("projects")}>
                    Projects
                  </button>
                  <span
                    className={`absolute right-0 translate-x-6 transition-opacity duration-300 ${
                      activeSection === "projects" ? "opacity-100" : "opacity-0"
                    } group-hover:opacity-100`}
                  >
                    <ChevronLeft className="w-4" />
                  </span>
                </div>
                <div
                  className={`flex gap-1 hover:-translate-x-4 duration-300 ${
                    activeSection === "experience"
                      ? "-translate-x-4 text-blue-900 px-4 py-2"
                      : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("experience")}>
                    Experience
                  </button>
                  <span
                    className={`absolute right-0 translate-x-6 transition-opacity duration-300 ${
                      activeSection === "experience"
                        ? "opacity-100"
                        : "opacity-0"
                    } group-hover:opacity-100`}
                  >
                    <ChevronLeft className="w-4" />
                  </span>
                </div>
                <div
                  className={`flex gap-1 hover:-translate-x-4 duration-300 ${
                    activeSection === "contact"
                      ? "-translate-x-4 text-blue-900 px-4 py-2"
                      : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("contact")}>
                    Contact
                  </button>
                  <span
                    className={`absolute right-0 translate-x-6 transition-opacity duration-300 ${
                      activeSection === "contact" ? "opacity-100" : "opacity-0"
                    } group-hover:opacity-100`}
                  >
                    <ChevronLeft className="w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-2/3 h-screen`}>
            <div className="h-full flex">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
              >
                {activeSection === "about-me" && <AboutMe />}
                {activeSection === "projects" && <Projects />}
                {activeSection === "experience" && <Experience />}
                {activeSection === "contact" && <Contact />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
