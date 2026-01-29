"use client";

import { motion } from "framer-motion";

type Question = {
  id: string;
  question: string;
  type: "single" | "multiple";
  options: {
    value: string;
    label: string;
  }[];
};

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedOptions: string[];
  onAnswer: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

export default function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  selectedOptions,
  onAnswer,
  onNext,
  onBack,
  progress,
}: QuizQuestionProps) {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold font-cormorant">
          Encuentra tu Perfume Ideal
        </h1>
        <p className="text-muted-foreground font-geist">
          Responde algunas preguntas y te ayudaremos a encontrar el perfume perfecto
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2 font-geist">
          <span>Pregunta {currentQuestion + 1} de {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <h2 className="text-xl md:text-3xl font-semibold text-center font-cormorant">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all font-geist text-left ${
                selectedOptions.includes(option.value)
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOptions.includes(option.value)
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {selectedOptions.includes(option.value) && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-base">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        {/* Navigation */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border-2 border-border bg-card rounded-full font-medium font-geist hover:border-primary transition-all"
            >
              Atrás
            </button>
          )}
          <button
            onClick={onNext}
            disabled={selectedOptions.length === 0}
            className={`flex-1 px-6 py-3 rounded-full font-medium font-geist transition-all ${
              selectedOptions.length === 0
                ? "bg-button-inactive text-button-inactive-foreground cursor-not-allowed"
                : "bg-primary text-white hover:shadow-lg"
            }`}
          >
            {currentQuestion < totalQuestions - 1 ? "Siguiente" : "Ver Resultado"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
