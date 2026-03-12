"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

interface SplashScreenProps {
  landingRef: React.RefObject<HTMLDivElement | null>;
}

export default function SplashScreen({ landingRef }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll(".letter");
      const landing = landingRef.current;

      if (!letters) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (!landing) return;
          
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = "none";
              }
            },
          });

          gsap.to(landing, {
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
          });
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          letters,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            y: 40,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to({}, { duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [landingRef]);

  const text = "Luxury Grand";
  const letters = text.split("").map((char, index) => (
    <span
      key={index}
      className="letter inline-block whitespace-pre"
    >
      {char}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#fafafa] ${manrope.className}`}
    >
      <div className="relative overflow-hidden">
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#1a1a1a] tracking-[0.02em]"
        >
          {letters}
        </h1>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
        />
      </div>
    </div>
  );
}
