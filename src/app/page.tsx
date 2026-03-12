import SmoothScrolling from "@/components/SmoothScrolling";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedProperties from "@/components/FeaturedProperties";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScrolling>
      <main className="min-h-screen">
        <Hero />
        <About />
        <FeaturedProperties />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </main>
    </SmoothScrolling>
  );
}
