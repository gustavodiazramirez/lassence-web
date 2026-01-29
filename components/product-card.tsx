"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

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
    <div 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto - ocupa todo el espacio */}
      <div className="relative h-80 bg-gradient-to-br from-muted via-card to-muted/50 overflow-hidden">
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
            <div className={`text-8xl font-bold font-[family-name:var(--font-cormorant)] text-foreground/5 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              {product.brand.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Badge flotante */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-semibold rounded-full capitalize shadow-lg font-[family-name:var(--font-geist)] tracking-wide">
            {product.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4 bg-card">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] font-[family-name:var(--font-geist)]">
            {product.brand}
          </p>
          <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-unbounded)] leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Familias olfativas */}
        <div className="flex flex-wrap gap-2">
          {product.family.map((f, idx) => (
            <span 
              key={idx}
              className="px-3 py-1.5 bg-muted/30 text-foreground border border-border text-xs font-semibold rounded-full capitalize font-[family-name:var(--font-geist)] hover:bg-muted/50 transition-colors"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Notas */}
        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] font-[family-name:var(--font-geist)]">Notas principales</p>
          <p className="text-sm text-card-foreground/70 font-[family-name:var(--font-geist)] capitalize leading-relaxed">
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
                className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all font-[family-name:var(--font-geist)] ${
                  selectedSize === idx
                    ? 'bg-primary text-white shadow-lg shadow-accent/20 '
                    : 'bg-[var(--button-inactive)] text-[var(--button-inactive-foreground)] hover:bg-[var(--button-inactive)]/80 '
                }`}
              >
                {priceOption.ml} ml
              </button>
            ))}
          </div>

          {/* Precio y CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-3xl font-bold text-accent font-[family-name:var(--font-unbounded)]">
                {formatPrice(product.prices[selectedSize].price)}
              </p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-accent hover:shadow-xl hover:shadow-primary/30 transition-all  shadow-md font-[family-name:var(--font-geist)] tracking-wide"
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
