"use client";

import { motion, Variants } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Unrivaled Expertise",
    description:
      "With over 20 years in luxury real estate, our team brings unparalleled knowledge and absolute discretion to every transaction.",
  },
  {
    number: "02",
    title: "Global Reach",
    description:
      "Direct access to exclusive off-market properties worldwide, connecting you with opportunities invisible to the public market.",
  },
  {
    number: "03",
    title: "Personal Service",
    description:
      "Dedicated senior consultants provide white-glove service, meticulously tailored to your unique requirements and aesthetic preferences.",
  },
  {
    number: "04",
    title: "Proven Excellence",
    description:
      "Billions in successful transactions and a completely private portfolio of satisfied ultra-high-net-worth clients.",
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
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mapVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FeatureItem({ feature }: { feature: typeof features[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="feature-item relative group"
    >
      <div className="absolute top-0 left-10 -translate-y-6 sm:-translate-y-8 md:-translate-y-12 -translate-x-4 sm:-translate-x-6 md:-translate-x-8 text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none font-sans font-bold text-black/3 select-none pointer-events-none group-hover:text-black/5 transition-colors duration-700">
        {feature.number}
      </div>
      
      <div className="relative z-10 pt-8 pl-4 border-l border-black/10 group-hover:border-black/30 transition-colors duration-500">
        <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-medium text-black mb-4 md:mb-6">
            {feature.title}
        </h3>
        <p className="font-sans text-base sm:text-lg text-black/60 font-light leading-relaxed max-w-sm">
            {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-32 md:py-48 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={headerVariants}
          className="wcu-header max-w-2xl mb-24 md:mb-32"
        >
          <motion.span variants={headerVariants} className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
            Why Choose Us
          </motion.span>
          <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-black leading-[1.1]">
            <motion.span variants={sentenceVariants} className="block mb-3">Elevating the standard</motion.span>
            <motion.span variants={sentenceVariants} className="block">of luxury representation.</motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-20 lg:gap-x-12">
            {features.slice(0, 2).map((feature) => (
              <FeatureItem key={feature.number} feature={feature} />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-20 lg:gap-x-12">
            {features.slice(2, 4).map((feature) => (
              <FeatureItem key={feature.number} feature={feature} />
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={mapVariants}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-4xl p-6 md:p-8 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden">
              <div className="mb-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40 block font-bold">
                  Visit Our Office
                </span>
                <h3 className="font-sans text-2xl md:text-3xl font-medium text-black mt-2">
                  Beverly Hills
                </h3>
                <p className="font-sans text-base text-black/60 font-light mt-2">
                  9454 Wilshire Blvd, Suite 500<br />
                  Beverly Hills, CA 90212
                </p>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-black/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.453184574438!2d-118.40108592354208!3d34.06741547324085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147d9%3A0x29a9751103a5e737!2sWilshire%20Blvd%2C%20Beverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=9454+Wilshire+Blvd+Beverly+Hills+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-black font-bold"
                >
                  <span className="relative z-10 transition-colors duration-300">Get Directions</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="tel:+13105551234"
                  className="font-sans text-sm text-black/60 hover:text-black transition-colors"
                >
                  +1 (310) 555-1234
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
