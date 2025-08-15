import { useEffect, useState } from "react";

export const useScrollSpy = (selector: string) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(selector);

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY - 100;
        const bottom = top + (section as HTMLElement).offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [selector]);

  return activeSection;
};
