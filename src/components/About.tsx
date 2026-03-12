"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Label */}
        <div className="about-reveal flex items-center gap-3 mb-12">
          <div className="w-[6px] h-[6px] bg-[#1c1c1c] rotate-45" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#1c1c1c] uppercase">
            About Luxury Grand
          </span>
        </div>

        {/* Main Text */}
        <h2 className="about-reveal font-sans text-3xl md:text-4xl lg:text-5xl font-medium text-[#1c1c1c] leading-[1.2] tracking-tight mb-16 max-w-4xl">
          We bring architecture to life through craft and innovation. Trusted by
          architects who demand precision, beauty, and care.
        </h2>

        {/* CTA Button */}
        <button className="about-reveal px-8 py-4 bg-[#1c1c1c] text-white flex items-center gap-3 hover:bg-[#333] transition-colors">
          <span className="text-lg leading-none mt-[-2px]">↳</span>
          <span className="text-xs font-bold tracking-widest uppercase">
            WHO WE ARE
          </span>
        </button>
      </div>
    </section>
  );
}
