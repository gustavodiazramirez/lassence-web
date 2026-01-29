"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Cuánto dura cada decant?",
    answer: "La duración de un decant depende del tamaño y del uso diario. Un decant de 5 ml rinde aproximadamente 75 sprays y uno de 10 ml alrededor de 150 sprays. Con un uso promedio de 2 a 3 sprays por día, el decant de 5 ml puede durar entre 2 y 4 semanas, mientras que el de 10 ml puede durar entre 1 y 2 meses."
  },
  {
    question: "¿Qué es un decant?",
    answer: "Un decant es una porción de perfume original extraída directamente desde el frasco oficial y envasada en un atomizador más pequeño. El aroma, la duración y la proyección son exactamente iguales al perfume original."
  },
  {
    question: "¿Los perfumes son originales?",
    answer: "Sí, todos los decants se realizan exclusivamente a partir de perfumes 100% originales. No se utilizan réplicas ni perfumes inspirados."
  },
  {
    question: "¿Cómo se extrae el perfume para ponerlo en el decant?",
    answer: "El perfume se extrae de forma manual utilizando una aguja y una jeringa estéril. Este proceso permite obtener el perfume directamente desde el frasco original sin alterar su calidad ni composición."
  },
  {
    question: "¿El envase del decant es nuevo?",
    answer: "Sí, todos los decants se entregan en atomizadores nuevos, previamente limpiados y desinfectados para asegurar una correcta conservación del perfume."
  },
  {
    question: "¿Cuántos sprays debería usar?",
    answer: "La cantidad de sprays depende del perfume y de tu preferencia. En perfumes intensos se recomiendan entre 2 y 3 sprays, mientras que en perfumes más frescos o suaves se pueden usar entre 3 y 5 sprays."
  },
  {
    question: "¿Puedo llevar el decant en el bolso o mochila?",
    answer: "Sí, los decants son compactos y fáciles de transportar, ideales para llevar en el bolso, mochila o bolsillo y reaplicar durante el día."
  },
  {
    question: "¿Qué tamaño de decant me conviene elegir?",
    answer: "El decant de 5 ml es ideal para probar un perfume antes de comprar el frasco completo. El decant de 10 ml es recomendable si ya conoces el perfume y planeas usarlo de forma más frecuente."
  },
  {
    question: "¿Los decants tienen fecha de vencimiento?",
    answer: "Los perfumes no tienen un vencimiento estricto. Conservados en un lugar fresco, seco y sin luz directa, los decants pueden durar varios años manteniendo su aroma."
  }
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="h-px w-16 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cormorant text-foreground mb-4">
              Preguntas{" "}
              <span className="text-primary italic">Frecuentes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-geist">
              Todo lo que necesitas saber sobre nuestros decants
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-semibold text-foreground font-geist text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-sm text-muted-foreground font-geist leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
