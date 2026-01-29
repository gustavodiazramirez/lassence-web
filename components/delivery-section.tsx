"use client";

import { motion } from "framer-motion";

const PICKUP_LOCATIONS = [
  {
    id: 1,
    name: "Fundo El Carmen",
  },
  {
    id: 2,
    name: "Portal Temuco",
  },
  {
    id: 3,
    name: "Temuco Centro",
  },
];

export default function DeliverySection() {
  return (
    <section id="entregas" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="h-px w-16 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cormorant text-foreground mb-4">
            Formas de{" "}
            <span className="text-primary italic">Entrega</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-geist">
            Opciones flexibles para recibir tus fragancias
          </p>
        </motion.div>

        {/* Delivery Options Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Pickup Points in Temuco */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="mb-5 relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>

            <div className="flex-1 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 font-unbounded group-hover:text-primary transition-colors duration-300">
                Entregas en Temuco
              </h3>
              <div className="h-px w-12 bg-linear-to-r from-primary/40 to-transparent mb-4" />
              <p className="text-sm text-muted-foreground mb-4 font-geist leading-relaxed">
                Retira sin costo en nuestros puntos de encuentro
              </p>
            </div>
            
            <div className="space-y-3">
              {PICKUP_LOCATIONS.map((location) => (
                <div key={location.id} className="flex items-start gap-3 text-sm group/item">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-medium text-foreground font-geist">{location.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Home Delivery Temuco */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="mb-5 relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>

            <div className="flex-1 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 font-unbounded group-hover:text-primary transition-colors duration-300">
                Delivery en Temuco
              </h3>
              <div className="h-px w-12 bg-linear-to-r from-primary/40 to-transparent mb-4" />
              <p className="text-sm text-muted-foreground mb-5 font-geist leading-relaxed">
                Llevamos tu pedido directamente a tu domicilio en Temuco con cargo adicional conversable según la zona.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold font-geist border border-primary/30 shadow-sm">
                Mismo día
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold font-geist border border-primary/30 shadow-sm">
                Coordinado
              </span>
            </div>
          </motion.div>

          {/* National Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="mb-5 relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>

            <div className="flex-1 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 font-unbounded group-hover:text-primary transition-colors duration-300">
                Envíos Nacionales
              </h3>
              <div className="h-px w-12 bg-linear-to-r from-primary/40 to-transparent mb-4" />
              <p className="text-sm text-muted-foreground mb-5 font-geist leading-relaxed">
                Despachos a todo Chile mediante empresas de courier certificadas. Costo de envío por pagar.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold font-geist border border-primary/30 shadow-sm">
                2-5 días
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold font-geist border border-primary/30 shadow-sm">
                Starken
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
