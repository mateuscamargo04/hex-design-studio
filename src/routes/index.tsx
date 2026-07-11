import { createFileRoute } from "@tanstack/react-router";
import { LenisProvider } from "@/components/hex/LenisProvider";
import { Preloader } from "@/components/hex/Preloader";
import { Header } from "@/components/hex/Header";
import { Hero } from "@/components/hex/Hero";
import { MarqueeStrip } from "@/components/hex/MarqueeStrip";
import { ServicesGallery } from "@/components/hex/ServicesGallery";
import { Packages } from "@/components/hex/Packages";
import { ScrollStorytelling } from "@/components/hex/ScrollStorytelling";
import { HowItWorks } from "@/components/hex/HowItWorks";
import { FAQ } from "@/components/hex/FAQ";
import { ContactForm } from "@/components/hex/ContactForm";
import { Footer } from "@/components/hex/Footer";
import { ScrollProgress } from "@/components/hex/ScrollProgress";
import { CustomCursor } from "@/components/hex/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <LenisProvider />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <Hero />
      <MarqueeStrip />
      <ServicesGallery />
      <Packages />
      <ScrollStorytelling />
      <HowItWorks />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
