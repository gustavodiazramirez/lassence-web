"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

// Mapeo de IDs de productos a URLs de Fragrantica
const FRAGRANTICA_URLS: Record<string, string> = {
  "ysl-y-edp": "https://www.fragrantica.es/perfume/Yves-Saint-Laurent/Y-Eau-de-Parfum-50757.html",
  "jpg-le-male-le-parfum": "https://www.fragrantica.es/perfume/Jean-Paul-Gaultier/Le-Male-Le-Parfum-61856.html",
  "jpg-le-beau-le-parfum": "https://www.fragrantica.es/perfume/Jean-Paul-Gaultier/Le-Beau-Le-Parfum-72158.html",
  "valentino-intense": "https://www.fragrantica.es/perfume/Valentino/Valentino-Uomo-Born-In-Roma-Intense-78740.html",
  "armani-acqua-di-gio-parfum": "https://www.fragrantica.es/perfume/Giorgio-Armani/Acqua-di-Gio-Parfum-81508.html",
  "versace-eros-flame": "https://www.fragrantica.es/perfume/Versace/Eros-Flame-52180.html",
  "ysl-black-opium-over-red": "https://www.fragrantica.es/perfume/Yves-Saint-Laurent/Black-Opium-Over-Red-88707.html",
  "lancome-la-vie-est-belle": "https://www.fragrantica.es/perfume/Lancome/La-Vie-Est-Belle-14982.html",
  "valentino-coral-fantasy": "https://www.fragrantica.es/perfume/Valentino/Valentino-Uomo-Born-In-Roma-Coral-Fantasy-71761.html",
};

interface PriceOption {
  ml: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  family: string[];
  notes: string[];
  prices: PriceOption[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(`/perfumes/${product.id}.jpeg`);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const selectedPrice = product.prices[selectedSize];
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      ml: selectedPrice.ml,
      price: selectedPrice.price,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleImageError = () => {
    // Intentar con PNG si JPEG falla
    if (imageSrc.endsWith('.jpeg')) {
      setImageSrc(`/perfumes/${product.id}.png`);
    } else {
      // Si PNG también falla, mostrar placeholder
      setImageError(true);
    }
  };

  return (
    <motion.div 
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto - ocupa todo el espacio */}
      <div className="relative h-80 bg-linear-to-br from-muted via-card to-muted/50 overflow-hidden">
        {/* Imagen del perfume o placeholder */}
        {!imageError ? (
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onError={handleImageError}
            />
          </div>
        ) : (
          /* Letra central como fallback */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-8xl font-bold font-cormorant text-foreground/5 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              {product.brand.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Badge flotante */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-semibold rounded-full capitalize shadow-lg font-geist tracking-wide">
            {product.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4 bg-card">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] font-geist">
            {product.brand}
          </p>
          <h3 className="text-xl font-bold text-foreground font-unbounded leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Familias olfativas */}
        <div className="flex flex-wrap gap-2">
          {product.family.map((f, idx) => (
            <span 
              key={idx}
              className="px-3 py-1.5 bg-muted/30 text-foreground border border-border text-xs font-semibold rounded-full capitalize font-geist hover:bg-muted/50 transition-colors"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Notas */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] font-geist">Notas principales</p>
            {FRAGRANTICA_URLS[product.id] && (
              <a
                href={FRAGRANTICA_URLS[product.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-[0.15em] font-geist transition-colors flex items-center gap-1"
              >
                Ver más
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-sm text-card-foreground/70 font-geist capitalize leading-relaxed">
            {product.notes.slice(0, 3).join(' • ')}
          </p>
        </div>

        {/* Selector de tamaño */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            {product.prices.map((priceOption, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSize(idx)}
                className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all font-geist ${
                  selectedSize === idx
                    ? 'bg-primary text-white shadow-lg shadow-accent/20 '
                    : 'bg-button-inactive text-button-inactive-foregroundhover:bg-button-inactive/80 '
                }`}
              >
                {priceOption.ml} ml
              </button>
            ))}
          </div>

          {/* Precio y CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-3xl font-bold text-accent font-unbounded">
                {formatPrice(product.prices[selectedSize].price)}
              </p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-accent hover:shadow-xl hover:shadow-primary/30 transition-all  shadow-md font-geist tracking-wide"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
