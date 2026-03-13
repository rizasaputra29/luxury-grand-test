"use client";

import { useRef, useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import FloatingNav from "@/components/FloatingNav";

export default function SplashScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const landingRef = useRef<HTMLDivElement>(null);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    if (!landingRef.current) return;

    // Wait for the splash screen to finish animating the landingRef in
    const observer = new MutationObserver(() => {
      if (!landingRef.current) return;
      const style = window.getComputedStyle(landingRef.current);
      
      if (style.opacity === "1" || !landingRef.current.classList.contains("opacity-0")) {
        setIsSplashFinished(true);
        observer.disconnect();
      }
    });

    observer.observe(landingRef.current, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Safe fallback timer just in case
    const timer = setTimeout(() => setIsSplashFinished(true), 3500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <SplashScreen landingRef={landingRef} />
      
      {/* Main App Content */}
      <div ref={landingRef} className="opacity-0">
        {children}
      </div>

      {/* Nav is hidden until Splash is fully done, then fades in smoothly */}
      <div
        className={`transition-opacity duration-1000 ease-in-out relative z-5000 ${
          isSplashFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <FloatingNav />
      </div>
    </>
  );
}