"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./product-card";
import perfumesData from "@/data/perfumes.json";

export default function Catalog() {
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "masculino" | "femenino"
  >("todos");

  const filteredProducts = perfumesData.filter((product) => {
    if (activeFilter === "todos") return true;
    return product.category === activeFilter;
  });

  return (
    <section
      id="catalogo"
      className="py-20 px-4 sm:px-6 bg-background scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Nuestra Colección
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-cormorant mt-2">
              Descubre fragancias exclusivas
            </h2>
          </div>
          <p className="text-muted-foreground text-lg font-geist leading-relaxed">
            Cada perfume es cuidadosamente seleccionado de las mejores casas de
            alta perfumería. Experimenta el lujo en porciones perfectas sin
            comprometer la calidad.
          </p>

          {/* Filtros */}
          <div className="flex gap-3 pt-4 justify-center text-white">
            {["todos", "masculino", "femenino"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as typeof activeFilter)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all capitalize ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-button-inactive text-button-inactive-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No hay productos en esta categoría
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
