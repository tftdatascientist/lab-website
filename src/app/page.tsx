import { Suspense } from "react";
import GeoStripe from "@/components/GeoStripe";
import Services from "@/components/Services";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import AnimatedLogoWrapper, { StaticLogoFallback } from "@/components/Logo/AnimatedLogoWrapper";

export default function Home() {
  return (
    <>
      <section className="relative w-full flex justify-center" style={{ maxHeight: '80vh' }}>
        <div style={{ width: '75%' }}>
          <Suspense fallback={<StaticLogoFallback />}>
            <AnimatedLogoWrapper accentStart="mint" accentEnd="gold" />
          </Suspense>
        </div>
      </section>
      <GeoStripe />
      <Services />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
