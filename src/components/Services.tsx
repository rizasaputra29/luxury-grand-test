"use client";

import { motion, Variants } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Property Acquisition",
    description:
      "Our expert team guides you through every step of acquiring your dream property, from initial search to final handover with absolute discretion.",
  },
  {
    id: 2,
    title: "Luxury Renovation",
    description:
      "Transform your property into a masterpiece with our bespoke renovation services, crafted by world-class artisans and visionary architects.",
  },
  {
    id: 3,
    title: "Property Management",
    description:
      "Comprehensive management services ensuring your valuable assets are maintained to the highest standards, providing absolute peace of mind.",
  },
  {
    id: 4,
    title: "Investment Advisory",
    description:
      "Strategic investment opportunities in prime real estate markets, backed by comprehensive data analysis and exclusive global networks.",
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

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-32 md:py-48 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={headerVariants}
          className="max-w-2xl mb-24 md:mb-32"
        >
          <motion.span variants={headerVariants} className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
            Our Services
          </motion.span>
          <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black leading-[1.1]">
            <motion.span variants={sentenceVariants} className="block mb-3">Comprehensive excellence</motion.span>
            <motion.span variants={sentenceVariants} className="block">across the entire luxury spectrum.</motion.span>
          </motion.h2>
        </motion.div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              variants={itemVariants}
              className="service-item group relative border-t border-black/10 py-12 md:py-16 cursor-pointer flex flex-col md:flex-row md:items-start gap-6 md:gap-12"
            >
              {/* Background hover reveal - absolute pure minimalist impact */}
              <div className="absolute inset-0 bg-[#f9f9f9] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
              
              <div className="md:w-1/3 flex flex-col items-start gap-4">
                <span className="font-sans text-5xl md:text-6xl font-light text-black select-none group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  0{index + 1}
                </span>
                <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  {service.title}
                </h3>
              </div>

              <div className="md:w-1/2 md:ml-auto">
                <p className="font-sans text-lg md:text-xl text-black/60 font-light leading-relaxed max-w-xl">
                  {service.description}
                </p>
                <div className="mt-8 overflow-hidden h-4 relative">
                    <span className="absolute font-sans text-xs tracking-[0.2em] uppercase text-black font-bold transition-transform duration-500 group-hover:-translate-y-full">
                        Discover
                    </span>
                    <span className="absolute font-sans text-xs tracking-[0.2em] uppercase text-black font-bold translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                        Specific details →
                    </span>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Final border bottom */}
          <div className="border-t border-black/10 w-full" />
        </div>
      </div>
    </section>
  );
}
