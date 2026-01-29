"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Perfume = {
  id: string;
  name: string;
  brand: string;
  category: string;
  family: string[];
  notes: string[];
  prices: { ml: number; price: number }[];
};

interface QuizResultProps {
  result: Perfume;
  onRestart: () => void;
  getImagePath: (id: string) => string;
}

export default function QuizResult({ result, onRestart, getImagePath }: QuizResultProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-cormorant">
          ¡Encontramos tu perfume ideal!
        </h1>
        <p className="text-lg text-muted-foreground font-geist">
          Basado en tus preferencias, este es el perfume perfecto para ti:
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row"
      >
        {/* Imagen del perfume - Izquierda */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative w-full md:w-80 h-80 md:h-auto bg-gradient-to-br from-primary/5 to-primary/10"
        >
          <Image
            src={getImagePath(result.id)}
            alt={result.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Info - Derecha */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex-1 p-8 space-y-6"
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-geist">
              {result.brand}
            </p>
            <h2 className="text-3xl font-bold font-cormorant">{result.name}</h2>
            <p className="text-sm text-muted-foreground capitalize font-geist">
              {result.family.join(" • ")}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-geist">
              Notas principales
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.notes.slice(0, 6).map((note, index) => (
                <motion.span
                  key={note}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                  className="px-3 py-1.5 bg-muted/30 text-foreground border border-border text-xs font-semibold rounded-full capitalize font-geist hover:bg-muted/50 transition-colors"
                >
                  {note}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-geist">
              Precios disponibles
            </h3>
            <div className="flex gap-4 justify-center">
              {result.prices.map((price) => (
                <div
                  key={price.ml}
                  className="flex items-baseline gap-1 font-geist"
                >
                  <span className="text-2xl font-bold">
                    ${price.price.toLocaleString("es-CL")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {price.ml}ml
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const message = encodeURIComponent(
              `Hola! Me interesa el perfume *${result.name}* de ${result.brand}. ¿Está disponible?`
            );
            const phoneNumber = "56963574126";
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
          }}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium font-geist shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Comprar vía WhatsApp
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/#catalogo")}
          className="px-8 py-3 bg-primary text-white rounded-full font-medium font-geist shadow-lg hover:shadow-xl transition-all"
        >
          Ver en Catálogo
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-8 py-3 border-2 border-border bg-card/50 text-foreground rounded-full font-medium font-geist hover:border-primary transition-all"
        >
          Repetir Test
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
