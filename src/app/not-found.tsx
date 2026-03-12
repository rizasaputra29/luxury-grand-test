"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".notfound-number",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          ".notfound-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".notfound-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".notfound-button",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".notfound-link",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#111111]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1619216083420-6e54b895f730?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Property"
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#111111]/80 via-[#111111]/60 to-[#111111]/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <div className="notfound-number font-serif text-[12rem] md:text-[16rem] lg:text-[20rem] leading-none font-bold text-white/3 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          404
        </div>

        <div className="relative z-20 mt-16">
          <h1 className="notfound-title font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-8">
            Page Not Found
          </h1>

          <p className="notfound-description font-sans text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-md mx-auto mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back to where you need to be.
          </p>

          <div className="notfound-button mb-16">
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <span className="relative z-10 font-sans text-xs font-bold tracking-[0.15em] uppercase text-white">
                Return Home
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="notfound-link flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="/#about"
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/#properties"
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/#services"
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#why-us"
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Why Us
            </Link>
            <Link
              href="/#testimonials"
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Testimonials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
