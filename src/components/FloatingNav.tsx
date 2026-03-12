"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("HOME");
  const manuallyClosedAtBottom = useRef(false);

  const formatSectionName = (rawId: string) => {
    if (!rawId) return "HOME";
    if (rawId === "why-us") return "WHY CHOOSE US";
    if (rawId === "home") return "HOME";
    return rawId.toUpperCase();
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 50;

      if (isAtBottom) {
        if (!manuallyClosedAtBottom.current) {
          setIsOpen(true);
        }
      } else {
        manuallyClosedAtBottom.current = false;
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsOpen(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkInitialSection = () => {
      const hash = window.location.hash.slice(1);
      const scrollY = window.scrollY;
      const heroSection = document.getElementById("home");

      if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          setCurrentSection(formatSectionName(hash));
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }, 100);
          return;
        }
      }

      if (heroSection && scrollY < heroSection.clientHeight * 0.5) {
        setCurrentSection("HOME");
      }
    };

    checkInitialSection();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
               setCurrentSection(formatSectionName(id));
            } else if (entry.target.tagName.toLowerCase() === 'section' && !id) {
               setCurrentSection("HOME");
            }
          }
        });
      },
      {
        // Trigger when a section is visible in the viewport
        rootMargin: "-30% 0px -40% 0px",
      }
    );

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animate dialog open/close
    if (isOpen) {
      gsap.to(".global-menu-dialog", {
        y: "0%",
        opacity: 1,
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power4.out",
      });
      gsap.fromTo(
        ".menu-link-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(".global-menu-dialog", {
        y: "20px",
        opacity: 0,
        scale: 0.95,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isAtBottom) {
        manuallyClosedAtBottom.current = true;
      }
    }
    setIsOpen(!isOpen);
  };

  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
        if (isAtBottom) {
          manuallyClosedAtBottom.current = true;
        }
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={navContainerRef}>
      {/* Floating Dialog Menu */}
      <div
        className="global-menu-dialog fixed bottom-24 left-1/2 -translate-x-1/2 z-90 invisible opacity-0 translate-y-[20px] scale-[0.95]
                   w-[calc(100%-2rem)] max-w-sm bg-[#1c1c1c]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="text-white/40 text-[10px] tracking-[0.2em] font-medium mb-6 menu-link-item px-2">
            NAVIGATION
          </div>
          <nav className="flex flex-col gap-1">
            {[
              { name: "About", id: "about" },
              { name: "Properties", id: "properties" },
              { name: "Services", id: "services" },
              { name: "Why Us", id: "why-us" },
              { name: "Testimonials", id: "testimonials" },
            ].map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", `#${item.id}`);
                      setCurrentSection(formatSectionName(item.id));
                    }
                  }}
                  className="menu-link-item group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="font-sans text-xl text-white/90 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-300">
                    →
                  </span>
                </Link>
              )
            )}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-white/10 px-2 menu-link-item">
            <div className="flex flex-col gap-3 text-sm text-white/60">
                <a href="tel:02081567290" className="hover:text-white transition-colors">
                  020 8156 7290
                </a>
                <a
                  href="mailto:sales@fluid.glass"
                  className="hover:text-white transition-colors"
                >
                  sales@fluid.glass
                </a>
            </div>
            <button className="mt-6 w-full border text-white border-white/20 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors font-sans text-xs font-bold tracking-[0.15em] uppercase">
              Get a quote
            </button>
          </div>
        </div>
      </div>

      {/* Floating Pill Trigger */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100">
        <div className="bg-[#1c1c1c]/95 backdrop-blur-md text-white rounded-full border border-white/10 flex items-center justify-between px-6 py-3 min-w-[300px] shadow-2xl">
          {/* Left Icon */}
          <button
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L22 8V16L12 22L2 16V8L12 2Z" />
            </svg>
          </button>

          {/* Center Dynamic Text */}
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-center w-full px-4 overflow-hidden text-ellipsis whitespace-nowrap">
            {isOpen ? "CLOSE MENU" : currentSection}
          </span>

          {/* Right Hamburger / Close Icon */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center hover:opacity-70 transition-opacity w-6 h-6 shrink-0"
          >
            {isOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
