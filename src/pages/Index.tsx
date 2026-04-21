import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import Nav from "@/components/kaspaflow/Nav";
import Hero from "@/components/kaspaflow/Hero";
import Problem from "@/components/kaspaflow/Problem";
import Solution from "@/components/kaspaflow/Solution";
import HowItWorks from "@/components/kaspaflow/HowItWorks";
import Pricing from "@/components/kaspaflow/Pricing";
import Faq from "@/components/kaspaflow/Faq";
import FinalCta from "@/components/kaspaflow/FinalCta";
import Footer from "@/components/kaspaflow/Footer";

const Index = () => {
  useReveal();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // Wait a tick so sections are mounted
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "KaspaFlow",
            url: "https://kaspaflow.com",
            description:
              "AI automation consultancy for UK recruitment agencies. CV screening, candidate outreach, and ATS automation.",
            areaServed: "United Kingdom",
          }),
        }}
      />
    </div>
  );
};

export default Index;
