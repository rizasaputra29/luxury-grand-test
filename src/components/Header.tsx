"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-6 shadow-sm"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-3 items-center">
        {/* Left Space (Empty for center alignment) */}
        <div></div>

        {/* Center Logo */}
        <Link href="/" className="flex justify-center items-center gap-2">
          <div className="font-sans text-2xl font-medium tracking-tight text-white">
            Fluid Glass
          </div>
        </Link>

        {/* Right CTA */}
        <div className="flex justify-end">
          <Link
            href="#contact"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white uppercase hover:opacity-70 transition-opacity"
          >
            <span className="text-lg leading-none mt-[-2px]">↳</span> GET A
            QUOTE
          </Link>
        </div>
      </div>
    </header>
  );
}
