"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#111111] pt-32 pb-12 md:pb-16 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col min-h-[50vh] justify-between relative z-10">
        
        {/* Top Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-32 pb-16 border-b border-white/10">
          
          <div className="footer-reveal">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-8">Navigation</span>
            <ul className="flex flex-col gap-4 font-sans text-sm md:text-base text-white/80">
                {["Home", "About", "Properties", "Services", "Why Us", "Testimonials"].map((item) => (
                    <li key={item}>
                        <Link href={`#${item.toLowerCase().replace(" ", "")}`} className="hover:text-white transition-colors">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          <div className="footer-reveal">
             <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-8">Social</span>
             <ul className="flex flex-col gap-4 font-sans text-sm md:text-base text-white/80">
                {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((platform) => (
                    <li key={platform}>
                        <a href="#" className="hover:text-white transition-colors">
                            {platform}
                        </a>
                    </li>
                ))}
            </ul>
          </div>

          <div className="footer-reveal col-span-2 md:col-span-2 flex flex-col items-start md:items-end text-left md:text-right">
             <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-8">London Office</span>
             <address className="not-italic font-sans text-lg md:text-xl text-white/90 leading-relaxed max-w-xs mb-8">
                 15 Berkeley Square<br/>
                 Mayfair, London<br/>
                 United Kingdom
             </address>
             <div className="flex flex-col gap-2 font-sans text-sm md:text-base text-white/80">
                 <a href="mailto:private@luxurygrand.com" className="hover:text-white transition-colors">private@luxurygrand.com</a>
                 <a href="tel:+442081567290" className="hover:text-white transition-colors">+44 (0) 20 8156 7290</a>
             </div>
          </div>

        </div>

        {/* Bottom Massive Typography & Legal */}
        <div className="flex flex-col mb-4 footer-reveal">
           <div className="w-full flex justify-center items-center mb-8">
               <h2 className="font-sans text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter font-medium text-white/95 whitespace-nowrap select-none">
                   Luxury Grand
               </h2>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 font-sans text-xs text-white/40 uppercase tracking-widest">
                <p>&copy; {currentYear} Luxury Grand. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
           </div>
        </div>

      </div>
    </footer>
  );
}
