"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { useState } from "react";

export default function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";

    const perfumesList = items
      .map(
        (item) =>
          `• ${item.brand} ${item.name} (${item.ml}ml) x${item.quantity}`,
      )
      .join("\n");

    const total = formatPrice(getTotalPrice());

    const message =
      items.length === 1
        ? `Hola, que tal! Me interesa el perfume:\n\n${perfumesList}\n\nTotal: ${total}`
        : `Hola, que tal! Me interesan los perfumes:\n\n${perfumesList}\n\nTotal: ${total}`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = "56958337518";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-card border-l border-border shadow-2xl z-[70]"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground font-[family-name:var(--font-unbounded)]">
                    Carrito de Compras
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5 font-[family-name:var(--font-geist)]">
                    {items.length}{" "}
                    {items.length === 1 ? "producto" : "productos"}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2.5 text-muted-foreground hover:text-card-foreground hover:bg-muted/20 transition-all rounded-xl"
                  aria-label="Cerrar carrito"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-background">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-6">
                    <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-foreground font-[family-name:var(--font-cormorant)]">
                        Tu carrito está vacío
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 font-[family-name:var(--font-geist)]">
                        Añade productos para comenzar a cotizar
                      </p>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItemCard
                      key={`${item.id}-${item.ml}`}
                      item={item}
                      onRemove={() => removeItem(item.id, item.ml)}
                      onUpdateQuantity={(quantity) =>
                        updateQuantity(item.id, item.ml, quantity)
                      }
                    />
                  ))
                )}
              </div>

              {/* Footer - Total y Contacto */}
              {items.length > 0 && (
                <div className="border-t border-border px-6 py-6 space-y-5 bg-card">
                  <div className="flex justify-between items-center pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-[family-name:var(--font-geist)]">
                        Total a cotizar
                      </p>
                      <span className="text-3xl font-bold text-card-foreground font-[family-name:var(--font-unbounded)] tracking-tight">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleWhatsAppClick}
                      className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold text-base transition-all hover:shadow-lg hover:shadow-[#25D366]/25 flex items-center justify-center gap-3 font-[family-name:var(--font-geist)]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Mandar mensaje a WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

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

function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
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
      <div className="relative w-24 h-24 bg-muted/20 rounded-xl overflow-hidden flex-shrink-0 border border-border">
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
            <span className="text-4xl font-bold font-[family-name:var(--font-cormorant)] text-muted">
              {item.brand.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary uppercase tracking-wider font-[family-name:var(--font-geist)] truncate">
              {item.brand}
            </p>
            <h3 className="text-base font-bold text-card-foreground font-[family-name:var(--font-unbounded)] truncate mt-0.5">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 font-[family-name:var(--font-geist)]">
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

            <span className="min-w-[2.5rem] text-center font-bold text-base text-card-foreground font-[family-name:var(--font-geist)]">
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
            <p className="text-lg font-bold text-primary font-[family-name:var(--font-unbounded)]">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
