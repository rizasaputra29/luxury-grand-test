"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const interestOptions = [
  { value: "buy", label: "Acquiring a Property" },
  { value: "sell", label: "Selling a Property" },
  { value: "invest", label: "Investment Advisory" },
  { value: "other", label: "Other Inquiry" },
];

export default function Hero() {
  const title1Ref = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // ✅ FIX: Premium, smooth zoom-out and fade transition for the Hero Image
      gsap.fromTo(
        ".hero-bg-wrapper",
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
          delay: 0.5, // Waits perfectly for the splash screen to begin fading
        }
      );

      // Initial layout fade-in
      tl.fromTo(
        title1Ref.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power4.out" 
        }
      );

      // Smooth parallax on the background image
      gsap.to(".main-hero-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal the form card smoothly as user scrolls
      gsap.fromTo(
        formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative w-full flex flex-col min-h-screen overflow-hidden">
      
      {/* Shared Background Image spanning both text hero and form */}
      {/* ✅ FIX: Added inline style={{ opacity: 0 }} for bulletproof initial hiding */}
      <div className="absolute inset-0 z-0 opacity-0 hero-bg-wrapper bg-white" style={{ opacity: 0 }}>
        <div className="absolute inset-0 h-full main-hero-bg transform origin-center">
            <Image
            src="https://images.unsplash.com/photo-1619216083420-6e54b895f730?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Property"
            fill
            className="object-cover"
            priority
            />
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 1. Full-Height Hero Text Area */}
      <div className="relative z-10 h-dvh w-full flex flex-col justify-between pt-6 pb-12 px-6 md:px-12">
        {/* Top Header Row */}
        <div className="w-full flex justify-center items-start px-4 lg:px-8">
          <div ref={title1Ref}>
            <span className="font-sans text-2xl lg:text-3xl font-semibold tracking-tight text-white select-none drop-shadow-md">
              Luxury Grand
            </span>
          </div>
        </div>

        {/* Bottom Centered Text */}
        <div className="w-full flex justify-center pb-8 md:pb-20 px-4">
          <h1
            ref={bottomTextRef}
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] text-center max-w-4xl drop-shadow-xl"
          >
            Exceptional glazing for those who build with vision.
          </h1>
        </div>
      </div>

      {/* 2. Registration Form Area */}
      <div className="relative z-10 w-full grow flex justify-center items-center py-12 md:py-16 px-6 lg:px-12">
        <div 
            ref={formRef}
            className="bg-white/95 backdrop-blur-xl w-full max-w-4xl rounded-4xl p-10 md:p-16 lg:p-20 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] border border-white/20"
        >
          <div className="mb-16 text-center">
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block font-bold">
              Private Inquiries
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-black leading-[1.1]">
              Register your interest.
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12 group/form">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 font-sans text-lg text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                  placeholder="name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 font-sans text-black/40 transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-black peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                >
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-black/20 py-3 font-sans text-lg text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent"
                  placeholder="email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 font-sans text-black/40 transition-all duration-300 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-black peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest cursor-text"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div ref={containerRef} className="relative group border-b border-black/20">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-transparent py-3 font-sans text-lg text-left focus:outline-none cursor-pointer flex items-center justify-between"
              >
                <span className={formData.interest ? "text-black" : "text-black/40"}>
                  {formData.interest
                    ? interestOptions.find((opt) => opt.value === formData.interest)?.label
                    : "Area of Interest"}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-black transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div
                ref={dropdownRef}
                className={`absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-xl border border-black/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 z-50 ${
                  isDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                {interestOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, interest: option.value });
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left font-sans text-base transition-colors duration-200 ${
                      formData.interest === option.value
                        ? "bg-black text-white"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 text-center flex justify-center">
              <button
                type="submit"
                className="group relative inline-flex overflow-hidden pb-2 font-sans text-xs uppercase tracking-[0.2em] text-black font-bold"
              >
                <span className="relative z-10 transition-colors duration-300">Submit Registration</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black/10" />
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}