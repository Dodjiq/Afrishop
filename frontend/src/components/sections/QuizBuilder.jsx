import React, { useState } from 'react'
import { ChevronRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * QuizBuilder - Quiz interactif pour recommandations produits
 */
export function QuizBuilder({
  heading = 'Trouvez Votre Style Parfait',
  questions = [
    {
      id: 1,
      question: 'Quelle est votre occasion ?',
      options: ['Quotidien', 'Travail', 'Soirée', 'Mariage']
    },
    {
      id: 2,
      question: 'Quel est votre style préféré ?',
      options: ['Classique', 'Moderne', 'Boho', 'Chic']
    },
    {
      id: 3,
      question: 'Quelle couleur vous attire ?',
      options: ['Noir', 'Blanc', 'Couleurs vives', 'Neutre']
    }
  ],
  className = ''
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  return (
    <section className={`py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {!showResults ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Question {currentQuestion + 1} sur {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-2xl font-bold mb-8">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-left font-medium flex items-center justify-between group"
                    >
                      <span>{option}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Merci !</h3>
              <p className="text-xl text-gray-600 mb-8">
                Voici nos recommandations personnalisées pour vous
              </p>
              <button className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                Voir Mes Recommandations
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
