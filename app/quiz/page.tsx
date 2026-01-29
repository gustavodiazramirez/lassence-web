"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QuizQuestion from "@/components/quiz/quiz-question";
import QuizResult from "@/components/quiz/quiz-result";
import perfumes from "@/data/perfumes.json";

// Función helper para obtener la extensión correcta de la imagen
const getImagePath = (id: string) => {
  const pngImages = ["ysl-black-opium-over-red", "jpg-le-beau-le-parfum", "versace-eros-flame"];
  return pngImages.includes(id) ? `/perfumes/${id}.png` : `/perfumes/${id}.jpeg`;
};

type Answer = {
  questionId: string;
  value: string | string[];
};

type Question = {
  id: string;
  question: string;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
  }[];
};

const questions: Question[] = [
  {
    id: "gender",
    question: "¿Para quién estás buscando el perfume?",
    type: "single",
    options: [
      { value: "masculino", label: "Para hombre" },
      { value: "femenino", label: "Para mujer" },
      { value: "unisex", label: "Me da igual, quiero algo versátil" },
    ],
  },
  {
    id: "occasion",
    question: "¿En qué ocasiones usarás principalmente este perfume?",
    type: "multiple",
    options: [
      { value: "daily", label: "Día a día / Trabajo" },
      { value: "party", label: "Fiestas / Salir de noche" },
      { value: "date", label: "Citas románticas / Especiales" },
      { value: "sport", label: "Deporte / Actividades casuales" },
      { value: "formal", label: "Eventos formales" },
    ],
  },
  {
    id: "season",
    question: "¿En qué época del año lo usarás más?",
    type: "single",
    options: [
      { value: "summer", label: "Verano / Primavera (frescas)" },
      { value: "winter", label: "Otoño / Invierno (cálidas)" },
      { value: "all", label: "Todo el año" },
    ],
  },
  {
    id: "intensity",
    question: "¿Qué intensidad prefieres?",
    type: "single",
    options: [
      { value: "light", label: "Suave y fresco" },
      { value: "moderate", label: "Moderado y balanceado" },
      { value: "strong", label: "Intenso y duradero" },
    ],
  },
  {
    id: "preference",
    question: "¿Qué tipo de aromas te gustan más?",
    type: "multiple",
    options: [
      { value: "fresh", label: "Frescos y acuáticos" },
      { value: "sweet", label: "Dulces y gourmand" },
      { value: "floral", label: "Florales" },
      { value: "woody", label: "Amaderados" },
      { value: "spicy", label: "Especiados y orientales" },
      { value: "fruity", label: "Frutales" },
    ],
  },
];

// Sistema de scoring para cada perfume basado en las respuestas
function calculateMatch(answers: Answer[]): typeof perfumes[0] | null {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]));

  const scores = perfumes.map((perfume) => {
    let score = 0;

    // Género (peso: 30%)
    const gender = answerMap.get("gender") as string;
    if (gender === "unisex") {
      score += 30; // Cualquier perfume sirve
    } else if (perfume.category === gender) {
      score += 30;
    }

    // Ocasión (peso: 25%)
    const occasions = answerMap.get("occasion") as string[];
    if (occasions) {
      // Le Male Le Parfum - Fiestas, noche, eventos formales
      if (perfume.id === "jpg-le-male-le-parfum") {
        if (occasions.includes("party")) score += 15;
        if (occasions.includes("formal")) score += 10;
      }

      // Le Beau Le Parfum - Verano, casual, día a día
      if (perfume.id === "jpg-le-beau-le-parfum") {
        if (occasions.includes("daily")) score += 12;
        if (occasions.includes("sport")) score += 13;
      }

      // Valentino Intense - Citas, eventos formales, noche
      if (perfume.id === "valentino-intense") {
        if (occasions.includes("date")) score += 15;
        if (occasions.includes("formal")) score += 10;
      }

      // YSL Y EDP - Día a día, versátil
      if (perfume.id === "ysl-y-edp") {
        if (occasions.includes("daily")) score += 15;
        if (occasions.includes("sport")) score += 10;
      }

      // Acqua di Giò Parfum - Deporte, casual, día
      if (perfume.id === "armani-acqua-di-gio-parfum") {
        if (occasions.includes("sport")) score += 15;
        if (occasions.includes("daily")) score += 10;
      }

      // Versace Eros Flame - Fiestas, citas, noche
      if (perfume.id === "versace-eros-flame") {
        if (occasions.includes("party")) score += 12;
        if (occasions.includes("date")) score += 13;
      }

      // Black Opium Over Red - Fiestas, citas, noche
      if (perfume.id === "ysl-black-opium-over-red") {
        if (occasions.includes("party")) score += 15;
        if (occasions.includes("date")) score += 10;
      }

      // La Vie Est Belle - Día a día, trabajo, eventos formales
      if (perfume.id === "lancome-la-vie-est-belle") {
        if (occasions.includes("daily")) score += 12;
        if (occasions.includes("formal")) score += 13;
      }

      // Valentino Coral Fantasy - Día a día, verano, casual
      if (perfume.id === "valentino-coral-fantasy") {
        if (occasions.includes("daily")) score += 15;
        if (occasions.includes("sport")) score += 10;
      }
    }

    // Temporada (peso: 20%)
    const season = answerMap.get("season") as string;
    if (season) {
      // Perfumes frescos para verano
      if (season === "summer") {
        if (["jpg-le-beau-le-parfum", "armani-acqua-di-gio-parfum", "ysl-y-edp", "valentino-coral-fantasy"].includes(perfume.id)) {
          score += 20;
        }
      }

      // Perfumes intensos para invierno
      if (season === "winter") {
        if (["jpg-le-male-le-parfum", "valentino-intense", "versace-eros-flame", "ysl-black-opium-over-red", "lancome-la-vie-est-belle"].includes(perfume.id)) {
          score += 20;
        }
      }

      // Todo el año
      if (season === "all") {
        score += 10; // Todos pueden ser usados todo el año con menos peso
      }
    }

    // Intensidad (peso: 15%)
    const intensity = answerMap.get("intensity") as string;
    if (intensity) {
      if (intensity === "light") {
        if (["armani-acqua-di-gio-parfum", "ysl-y-edp", "valentino-coral-fantasy"].includes(perfume.id)) {
          score += 15;
        }
      }

      if (intensity === "moderate") {
        if (["jpg-le-beau-le-parfum", "lancome-la-vie-est-belle"].includes(perfume.id)) {
          score += 15;
        }
      }

      if (intensity === "strong") {
        if (["jpg-le-male-le-parfum", "valentino-intense", "versace-eros-flame", "ysl-black-opium-over-red"].includes(perfume.id)) {
          score += 15;
        }
      }
    }

    // Preferencias de aroma (peso: 10%)
    const preferences = answerMap.get("preference") as string[];
    if (preferences) {
      preferences.forEach((pref) => {
        if (pref === "fresh" && perfume.family.includes("acuático")) score += 3;
        if (pref === "fresh" && perfume.family.includes("fresco")) score += 3;
        if (pref === "sweet" && perfume.family.includes("gourmand")) score += 3;
        if (pref === "floral" && perfume.family.includes("floral")) score += 3;
        if (pref === "woody" && perfume.family.includes("amaderado")) score += 3;
        if (pref === "spicy" && perfume.family.includes("oriental")) score += 3;
        if (pref === "spicy" && perfume.family.includes("especiado")) score += 3;
        if (pref === "fruity" && perfume.family.includes("frutal")) score += 3;
        if (pref === "fruity" && perfume.family.includes("tropical")) score += 3;
      });
    }

    return { perfume, score };
  });

  // Ordenar por score y retornar el mejor match
  scores.sort((a, b) => b.score - a.score);
  return scores[0]?.perfume || null;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [result, setResult] = useState<typeof perfumes[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    if (question.type === "single") {
      setSelectedOptions([value]);
    } else {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter((v) => v !== value));
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const newAnswers = [
      ...answers,
      {
        questionId: question.id,
        value: question.type === "single" ? selectedOptions[0] : selectedOptions,
      },
    ];

    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
    } else {
      // Calcular resultado
      const match = calculateMatch(newAnswers);
      setResult(match);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[currentQuestion - 1];
      setSelectedOptions(
        Array.isArray(prevAnswer.value) ? prevAnswer.value : [prevAnswer.value]
      );
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOptions([]);
    setResult(null);
    setShowResult(false);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <motion.a
          href="/"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Volver al inicio"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.a>
        <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl flex items-center justify-center min-h-screen">
          <QuizResult 
            result={result} 
            onRestart={handleRestart}
            getImagePath={getImagePath}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Volver al inicio"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </motion.a>
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-2xl flex flex-col justify-center min-h-screen">
        <QuizQuestion
          question={question}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedOptions={selectedOptions}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          progress={progress}
        />
      </div>
    </div>
  );
}
