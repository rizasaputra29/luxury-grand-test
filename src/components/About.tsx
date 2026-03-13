"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!mounted) {
    return null;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-32 md:py-48 bg-white"
    >
      <motion.div 
        className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        variants={containerVariants}
      >
        {/* Label */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
          <div className="w-[6px] h-[6px] bg-[#1c1c1c] rotate-45" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#1c1c1c] uppercase">
            About Luxury Grand
          </span>
        </motion.div>

        {/* Main Text */}
        <motion.h2 
          variants={itemVariants}
          className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium text-[#1c1c1c] leading-[1.2] tracking-tight mb-16 max-w-4xl"
        >
          <span className="block mb-3">We bring architecture to life through craft and innovation.</span>
          <span className="block">Trusted by architects who demand precision, beauty, and care.</span>
        </motion.h2>

        {/* CTA Button */}
        <motion.button 
          variants={itemVariants}
          className="px-8 py-4 bg-[#1c1c1c] text-white flex items-center gap-3 hover:bg-[#333] transition-colors"
        >
          <span className="text-lg leading-none mt-[-2px]">↳</span>
          <span className="text-xs font-bold tracking-widest uppercase">
            WHO WE ARE
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
