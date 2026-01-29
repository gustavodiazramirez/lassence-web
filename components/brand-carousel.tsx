"use client";

const brands = [
  "Jean Paul Gaultier",
  "Valentino",
  "Yves Saint Laurent",
  "Giorgio Armani",
  "Versace",
  "Lancôme"
];

export default function BrandCarousel() {
  return (
    <div className="w-full overflow-hidden bg-card/30 backdrop-blur-sm border-y border-border py-6 sm:py-8">
      <div className="flex animate-scroll gap-12 sm:gap-16">
        {/* Duplicamos el array para crear el efecto de loop infinito */}
        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="text-xl sm:text-2xl font-light text-muted-foreground whitespace-nowrap font-[family-name:var(--font-cormorant)] italic"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
