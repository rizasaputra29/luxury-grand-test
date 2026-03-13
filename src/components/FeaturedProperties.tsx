"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";

const properties = [
  {
    id: 1,
    title: "The Kensington Estate",
    location: "London, UK",
    price: "£12,500,000",
    specs: "6 Beds • 7 Baths • 8,500 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    id: 2,
    title: "Oceanfront Villa",
    location: "Miami, Florida",
    price: "$18,900,000",
    specs: "5 Beds • 6 Baths • 7,200 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
  },
  {
    id: 3,
    title: "Alpine Retreat",
    location: "Aspen, Colorado",
    price: "$24,500,000",
    specs: "7 Beds • 8 Baths • 12,000 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const sentenceVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 40 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function PropertyRow({ property, index }: { property: typeof properties[0], index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-col gap-8 md:gap-16 ${
        index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
      } items-center`}
    >
      {/* Image Side */}
      <div className="w-full md:w-3/5">
        <div className="relative w-full aspect-4/3 overflow-hidden bg-black/5 group rounded-sm">
          <motion.div style={{ y: smoothY }} className="absolute inset-0 scale-110">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </motion.div>
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-2/5 flex flex-col justify-center px-4 md:px-8">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="flex items-center gap-3 text-black/40 mb-6"
        >
          <div className="w-1.5 h-1.5 bg-black rotate-45" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase">
            {property.location}
          </span>
        </motion.div>
        
        <motion.h3 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="font-sans text-4xl md:text-5xl lg:text-6xl text-black font-medium tracking-tight mb-8 leading-[1.1]"
        >
          {property.title}
        </motion.h3>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="space-y-6"
        >
            <p className="font-sans text-xl text-black/60 font-light">
            {property.specs}
            </p>
            <p className="font-sans text-2xl text-black font-medium">
            {property.price}
            </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mt-12"
        >
            <button className="group relative overflow-hidden pb-2 font-sans text-xs uppercase tracking-[0.2em] text-black">
                <span className="relative z-10 transition-colors duration-300">Explore Property</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-black/20" />
                <span className="absolute bottom-0 left-0 w-full h-px bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="py-32 md:py-48 bg-[#f9f9f9]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={headerVariants}
          className="max-w-2xl mb-24 md:mb-40"
        >
          <motion.span variants={headerVariants} className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
            Featured Collection
          </motion.span>
          <motion.h2 className="font-sans text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black leading-[1.1]">
            <motion.span variants={sentenceVariants} className="block mb-3">Exceptional properties,</motion.span>
            <motion.span variants={sentenceVariants} className="block">curated for the visionary.</motion.span>
          </motion.h2>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {properties.map((property, index) => (
            <PropertyRow key={property.id} property={property} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
