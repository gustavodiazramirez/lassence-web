"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Catalog from "@/components/catalog";
import DeliverySection from "@/components/delivery-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Catalog />
      <DeliverySection />
      <FAQSection />
      <Footer />
    </div>
  );
}

