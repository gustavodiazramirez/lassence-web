"use client";

import Image from "next/image";
import { useState } from "react";

interface CartItemCardProps {
  item: {
    id: string;
    name: string;
    brand: string;
    ml: number;
    price: number;
    quantity: number;
  };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(`/perfumes/${item.id}.jpeg`);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = () => {
    if (imageSrc.endsWith(".jpeg")) {
      setImageSrc(`/perfumes/${item.id}.png`);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen miniatura */}
      <div className="relative w-24 h-24 bg-muted/20 rounded-xl overflow-hidden shrink-0 border border-border">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold font-cormorant text-muted">
              {item.brand.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary uppercase tracking-wider font-geist truncate">
              {item.brand}
            </p>
            <h3 className="text-base font-bold text-card-foreground font-unbounded truncate mt-0.5">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 font-geist">
              {item.ml}ml • {formatPrice(item.price)}
            </p>
          </div>

          {/* Botón eliminar */}
          <button
            onClick={onRemove}
            className="p-2 text-muted hover:text-red-600 hover:bg-red-50/50 transition-all rounded-lg"
            aria-label="Eliminar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Controles de cantidad y precio */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="w-9 h-9 flex items-center justify-center bg-muted/20 border border-border rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground"
              aria-label="Disminuir cantidad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <span className="min-w-10 text-center font-bold text-base text-card-foreground font-geist">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center bg-muted/20 border border-border rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground"
              aria-label="Aumentar cantidad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div>
            <p className="text-lg font-bold text-primary font-unbounded">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
