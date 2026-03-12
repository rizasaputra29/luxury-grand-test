"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      "Luxury Grand made finding our estate an effortless journey. Their attention to detail and absolute discretion is unmatched in the market.",
    name: "Victoria Ashworth",
    title: "Private Client",
  },
  {
    id: 2,
    quote:
      "The level of service was beyond anything we had experienced. They secured an off-market property that exceeded all our architectural requirements.",
    name: "James Thornbury",
    title: "Property Investor",
  },
  {
    id: 3,
    quote:
      "Their global network and market expertise helped us secure a generational asset in a prime location. Truly exceptional representation.",
    name: "Michael Chen",
    title: "Business Executive",
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal entire block
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Simple auto-rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-white overflow-hidden relative"
      id="testimonials"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
        <div ref={contentRef} className="relative max-w-4xl mx-auto text-center z-10">
          
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 mb-16 block">
            Client Perspectives
          </span>
          
          {/* Main Quote */}
          <div className="relative mb-12 md:mb-16 px-4 md:px-12 h-[320px] sm:h-[220px] md:h-[200px] flex items-center justify-center">
             {/* Huge decorative quote mark */}
             <span className="absolute -top-4 md:-top-16 left-2 md:left-0 text-[6rem] md:text-[12rem] font-serif text-black/5 leading-none select-none pointer-events-none">
                 &ldquo;
             </span>
             
             {testimonials.map((t, i) => (
                <blockquote 
                    key={t.id}
                    className={`absolute md:min-w-2xl min-w-sm flex items-center justify-center px-2 md:px-0 text-center font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-light leading-snug tracking-tight transition-all duration-1000 ${i === activeIndex ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-8 invisible'}`}
                >
                    &ldquo;{t.quote}&rdquo;
                </blockquote>
             ))}
          </div>

          {/* Author Details - Separated from stacked logic */}
          <div className="flex flex-col items-center gap-6 md:gap-8 border-t border-black/10 pt-2">
              <div className="flex flex-col items-center h-16 justify-center">
                  <div className="font-sans text-lg md:text-xl text-black font-medium mb-1 tracking-tight transition-opacity duration-700">
                      {testimonials[activeIndex].name}
                  </div>
                  <div className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 transition-opacity duration-700">
                      {testimonials[activeIndex].title}
                  </div>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex gap-3">
                  {testimonials.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-1.5 h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'bg-black w-6' : 'bg-black/20 hover:bg-black/40'}`}
                        aria-label={`View testimonial ${i + 1}`}
                      />
                  ))}
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
