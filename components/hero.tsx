"use client";

import BrandCarousel from "./brand-carousel";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden">
      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-4">
        <div className="max-w-4xl mx-auto w-full text-center space-y-6 sm:space-y-8 mt-20">
          {/* Logo L'essence - Centrado como una unidad completa */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center">
              <span className="text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent font-[family-name:var(--font-cormorant)] leading-none">
                L
              </span>
              <div className="flex items-center -ml-2 sm:-ml-3 md:-ml-4">
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light italic text-foreground/80 font-[family-name:var(--font-cormorant)]">
                  '
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light italic text-foreground/80 font-[family-name:var(--font-cormorant)]">
                  essence
                </span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-[family-name:var(--font-geist)] max-w-2xl mx-auto leading-relaxed">
            Descubre el lujo de las fragancias de diseñador sin comprometer tu presupuesto. 
            Cada decant es una puerta a un mundo de elegancia y sofisticación.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#catalogo" className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-full font-medium font-[family-name:var(--font-geist)] shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-sm text-center">
              Explorar Catálogo
            </a>

            <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-border bg-card/50 backdrop-blur-sm text-foreground rounded-full font-medium font-[family-name:var(--font-geist)] hover:border-primary hover:bg-card transition-all cursor-pointer text-sm">
              Encuentra tu Perfume
            </button>
          </div>
        </div>
      </div>

      {/* Carousel de marcas - fijo al bottom */}
      <div className="relative z-10">
        <BrandCarousel />
      </div>
    </section>
  );
}
