"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the section header
      gsap.fromTo(
        ".prop-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate each property row
      const rows = sectionRef.current?.querySelectorAll(".prop-row");
      rows?.forEach((row) => {
        const imageWrapper = row.querySelector(".prop-image-wrapper");
        const image = row.querySelector("img");
        const details = row.querySelector(".prop-details");

        // Image reveal line
        if (imageWrapper) {
           gsap.fromTo(
             imageWrapper,
             { opacity: 0, y: 40 },
             {
               opacity: 1,
               y: 0,
               duration: 1.2,
               ease: "power3.out",
               scrollTrigger: {
                 trigger: row,
                 start: "top 80%",
               },
             }
           );
        }

        // Slight parallax on the image itself
        if (image) {
          gsap.to(image, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Details fade in
        if (details) {
            gsap.fromTo(
                details,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%",
                    },
                }
            );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="py-32 md:py-48 bg-[#f9f9f9]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="prop-header max-w-2xl mb-24 md:mb-40">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
            Featured Collection
          </span>
          <h2 className="font-sans text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black leading-[1.1]">
            Exceptional properties, curated for the visionary.
          </h2>
        </div>

        <div className="space-y-32 md:space-y-48">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`prop-row flex flex-col gap-8 md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center`}
            >
              {/* Image Side */}
              <div className="w-full md:w-3/5">
                <div className="prop-image-wrapper relative w-full aspect-4/3 overflow-hidden bg-black/5 group">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover scale-110 group-hover:scale-[1.15] transition-transform duration-[1.5s] ease-out will-change-transform"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>

              {/* Text Side */}
              <div className="prop-details w-full md:w-2/5 flex flex-col justify-center px-4 md:px-8">
                <div className="flex items-center gap-3 text-black/40 mb-6">
                  <div className="w-1.5 h-1.5 bg-black rotate-45" />
                  <span className="font-sans text-xs tracking-[0.2em] uppercase">
                    {property.location}
                  </span>
                </div>
                
                <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl text-black font-medium tracking-tight mb-8 leading-[1.1]">
                  {property.title}
                </h3>
                
                <div className="space-y-6">
                    <p className="font-sans text-xl text-black/60 font-light">
                    {property.specs}
                    </p>
                    <p className="font-sans text-2xl text-black font-medium">
                    {property.price}
                    </p>
                </div>

                <div className="mt-12">
                    <button className="group relative overflow-hidden pb-2 font-sans text-xs uppercase tracking-[0.2em] text-black">
                        <span className="relative z-10 transition-colors duration-300">Explore Property</span>
                        <span className="absolute bottom-0 left-0 w-full h-px bg-black/20" />
                        <span className="absolute bottom-0 left-0 w-full h-px bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
