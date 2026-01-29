"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Catalog from "@/components/catalog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Catalog />
    </div>
  );
}

