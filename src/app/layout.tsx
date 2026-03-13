import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import SplashScreenWrapper from "@/components/SplashScreenWrapper";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Grand | Premium Real Estate",
  description: "Discover exceptional properties with Luxury Grand. Where luxury meets elegance in real estate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased relative`}
        suppressHydrationWarning
      >
        <SplashScreenWrapper>
          {children}
        </SplashScreenWrapper>
      </body>
    </html>
  );
}