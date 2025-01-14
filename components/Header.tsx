"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white text-slate-700 p-5">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center rounded-[50px] shadow-lg">
        <div className="text-lg font-bold">
          <a href="/" className="hover:text-gray-300">
            Franklin Ramos /{" "}
            <small className="text-sm">Multimedia Artist</small>
          </a>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="/about-me" className="hover:text-gray-300">
            About me
          </a>
          <a href="/projects" className="hover:text-gray-300">
            Projects
          </a>
          <a href="/resume" className="hover:text-gray-300">
            Resume
          </a>
          <a href="/contact" className="hover:text-gray-300">
            Contact
          </a>
        </nav>

        <button
          className="md:hidden flex items-center text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <a href="/about-me" className="block px-4 py-2 hover:bg-gray-600">
            About me
          </a>
          <a href="/projects" className="block px-4 py-2 hover:bg-gray-600">
            Projects
          </a>
          <a href="/resume" className="block px-4 py-2 hover:bg-gray-600">
            Resume
          </a>
          <a href="/contact" className="block px-4 py-2 hover:bg-gray-600">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
