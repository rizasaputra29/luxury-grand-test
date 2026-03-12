"use client";

import { useRef } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function SplashScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const landingRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SplashScreen landingRef={landingRef} />
      <div
        ref={landingRef}
        className="opacity-0"
      >
        {children}
      </div>
    </>
  );
}
