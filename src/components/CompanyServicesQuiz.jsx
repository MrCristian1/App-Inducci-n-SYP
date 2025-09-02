import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowLeft,
  faTrophy,
  faCheck,
  faTimes,
  faCalculator,
  faUsers,
  faShield,
  faSearch,
  faBriefcase,
  faStar,
  faRocket,
  faGlobe,
  faCogs,
  faChartLine,
  faUserTie,
  faRedo
} from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../context/AppContext'
import Select from 'react-select';

const CompanyServicesQuiz = ({ onComplete, onBack }) => {
  const navigate = useNavigate()
  const { completeLevel } = useAppContext()
  
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [hasCompletedLevel, setHasCompletedLevel] = useState(false)

  // Completar el nivel cuando se termine el quiz exitosamente (solo una vez)
  useEffect(() => {
    if (isCompleted && !hasCompletedLevel) {
      // Completar el nivel 2 en el contexto
      completeLevel(2)
      setHasCompletedLevel(true)
      
      // Navegar al Achievement después de un breve retraso, igual que en PoliciesLevel
      setTimeout(() => {
        navigate('/achievement/2')
      }, 2000)
    }
  }, [isCompleted, hasCompletedLevel, completeLevel, navigate])

  // Estrellas de fondo memoizadas
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }))
  }, [])

  // Nuevas preguntas del quiz
  const quizQuestions = [
    {
      question: '¿Cuál es el año meta de la Visión de la empresa? 📅',
      options: ['2025', '2030', '2040'],
      answer: 1
    },
    {
      question: 'Nuestra misión se centra principalmente en: 🎯',
      options: ['Reducir costos de los clientes', 'Mejorar el desempeño de los clientes', 'Aumentar la publicidad de los clientes'],
      answer: 1
    },
    {
      question: 'El propósito de la empresa es brindar tranquilidad con soluciones… 🤲',
      options: ['100% digitales', 'Personalizadas', 'Tecnológicamente humanas'],
      answer: 2
    },
    {
      question: '¿Cuál de estos es un valor que implica honestidad y transparencia? 🤝',
      options: ['Empatía', 'Integridad', 'Adaptabilidad'],
      answer: 1
    },
    {
      question: 'Si un cliente cambia su necesidad a última hora, el valor más importante que aplicamos es: 🔄',
      options: ['Confiabilidad', 'Adaptabilidad', 'Integridad'],
      answer: 1
    },
    {
      question: '¿Qué diferenciador refleja trabajar de la mano del cliente para diseñar soluciones a la medida? 🛠️',
      options: ['Acompañamiento', 'Personalización', 'Adaptabilidad'],
      answer: 1
    },
    {
      question: 'La competencia “Calidad en el trabajo” consiste en: 🏅',
      options: ['Tener amplios conocimientos y generar credibilidad', 'Ser empático con clientes internos', 'Adaptarse a los cambios'],
      answer: 0
    },
    {
      question: 'Relaciona nivel ↔ competencia correcta: 🧩',
      type: 'match',
      pairs: [
        { left: 'Estratégico', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 0 },
        { left: 'Táctico', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 1 },
        { left: 'Operativo', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 2 }
      ]
    }
  ]

  const currentScenarioData = quizQuestions[currentScenario]
  const progress = ((currentScenario + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (optionId) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentScenarioData.answer
    const newAnswer = {
      scenarioId: currentScenarioData.id,
      selectedOption: selectedAnswer,
      isCorrect,
      points: isCorrect ? 100 : 0
    }

    setAnswers(prev => [...prev, newAnswer])
    
    if (isCorrect) {
      setScore(prev => prev + 100)
    }

    setShowResult(true)
  }

  const handleNextScenario = () => {
    if (currentScenario < quizQuestions.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completado
      setIsCompleted(true)
    }
  }

  const handleRetryQuiz = () => {
    // Reiniciar todo el quiz
    setCurrentScenario(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers([])
    setScore(0)
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
    }
    return colors[color] || colors.blue
  }

  // Frases aleatorias para feedback
  const correctPhrases = [
    "¡Eso es, sigue esforzándote!",
    "¡Excelente, vas por buen camino!",
    "¡Muy bien, sigue así!",
    "¡Perfecto, continúa!",
    "¡Genial, tu conocimiento destaca!"
  ];
  const incorrectPhrases = [
    "No te rindas, inténtalo de nuevo.",
    "¡Ánimo, puedes lograrlo!",
    "¡Sigue intentando, vas a mejorar!",
    "¡Vamos, la próxima será mejor!",
    "¡Motívate, cada error es aprendizaje!"
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-star-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: '2px',
                height: '2px',
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ zIndex: 10, textAlign: 'center', color: 'white', padding: '2rem', position: 'relative' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            style={{ fontSize: '6rem', marginBottom: '1.5rem' }}
          >
            🎉
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4">¡Quiz Completado!</h1>
          <p className="text-xl mb-6">Redirigiendo a tu logro...</p>
          
          <div className="text-6xl font-bold text-yellow-400 mb-4">
            {score} puntos
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-star-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: '2px',
              height: '2px',
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onTap={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer', transition: 'color 0.2s' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Volver a Servicios</span>
          </motion.button>

          <div className="flex items-center space-x-6">
            <div className="text-white text-center">
              <div className="text-2xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm">Puntos</div>
            </div>
            
            <div className="text-white text-center">
              <div className="text-lg font-semibold">{currentScenario + 1} de {quizQuestions.length}</div>
              <div className="text-sm">Preguntas</div>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              style={{ background: 'linear-gradient(to right, #facc15, #fb923c)', height: '100%', borderRadius: '9999px' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {!showResult ? (
          /* Vista de Pregunta */
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={{ maxWidth: '64rem', margin: '0 auto' }}
          >
            {/* Pregunta */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{currentScenarioData.question}</h2>
            </div>

            {/* Opciones para preguntas normales */}
            {currentScenarioData.type !== 'match' ? (
              <div className="grid gap-4 max-w-2xl mx-auto">
                {currentScenarioData.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onTap={() => handleAnswerSelect(index)}
                    style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid', transition: 'all 0.3s', textAlign: 'left', boxShadow: selectedAnswer === index ? '0 4px 24px #fde68a' : undefined, background: selectedAnswer === index ? 'rgba(253, 230, 138, 0.2)' : 'rgba(255,255,255,0.1)', borderColor: selectedAnswer === index ? '#facc15' : 'rgba(255,255,255,0.3)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button style={{ all: 'unset' }} disabled={showResult}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses('blue')}`}> 
                          <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{option}</h3>
                        </div>
                      </div>
                    </button>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Opciones para pregunta tipo match */
              <div className="grid gap-4 max-w-2xl mx-auto">
                {currentScenarioData.pairs.map((pair, idx) => (
                  <div key={idx} className="flex items-center gap-4 mb-4">
                    <span className="font-bold text-white text-lg w-32">{pair.left}</span>
                    <div className="w-full">
                      <Select
                        options={pair.right.map((rightOpt, i) => ({ value: i, label: rightOpt }))}
                        value={pair.right.map((rightOpt, i) => ({ value: i, label: rightOpt })).find(opt => answers[idx]?.selectedOption === opt.value) || null}
                        onChange={opt => {
                          setAnswers(prev => {
                            const newAnswers = [...prev]
                            newAnswers[idx] = {
                              selectedOption: opt.value,
                              isCorrect: opt.value === pair.answer
                            }
                            return newAnswers
                          })
                        }}
                        isDisabled={showResult}
                        placeholder="Selecciona..."
                        styles={{
                          control: (base) => ({
                            ...base,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                          }),
                          menu: (base) => ({
                            ...base,
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            borderRadius: '0.75rem',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                          }),
                          option: (base, state) => ({
                            ...base,
                            background: state.isFocused ? 'rgba(168,85,247,0.18)' : 'rgba(255,255,255,0.08)',
                            color: 'white',
                            borderRadius: '0.5rem',
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: 'white',
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: 'rgba(255,255,255,0.7)',
                          })
                        }}
                        theme={theme => ({
                          ...theme,
                          borderRadius: 12,
                          colors: {
                            ...theme.colors,
                            primary25: 'rgba(168,85,247,0.18)',
                            primary: '#a855f7',
                            neutral0: 'rgba(255,255,255,0.18)',
                            neutral80: 'white',
                          },
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Botón Enviar */}
            <div className="text-center mt-8">
              <motion.button
                onTap={() => {
                  if (currentScenarioData.type === 'match') {
                    // Validar todas las respuestas
                    const allAnswered = currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined)
                    if (!allAnswered) return
                    const allCorrect = currentScenarioData.pairs.every((pair, idx) => answers[idx]?.selectedOption === pair.answer)
                    setSelectedAnswer(allCorrect ? 'match-correct' : 'match-incorrect')
                    setShowResult(true)
                    if (allCorrect) setScore(prev => prev + 100)
                  } else {
                    handleSubmitAnswer()
                  }
                }}
                style={{ padding: '2rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '1.125rem', transition: 'all 0.3s', background: ((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? 'linear-gradient(to right, #22c55e, #16a34a)' : '#4b5563', color: ((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? 'white' : '#9ca3af', boxShadow: ((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? '0 4px 24px #22c55e' : undefined, cursor: ((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? 'pointer' : 'not-allowed' }}
                whileHover={((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? { scale: 1.05 } : {}}
                whileTap={((selectedAnswer !== null && currentScenarioData.type !== 'match') || (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))) ? { scale: 0.95 } : {}}
              >
                Confirmar Respuesta
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Vista de Resultado */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', minHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {/* Feedback */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              style={{ minHeight: '120px', paddingBottom: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              {currentScenarioData.type === 'match' ? (
                selectedAnswer === 'match-correct' ? (
                  <div className="text-green-400">
                    <FontAwesomeIcon icon={faCheck} className="text-6xl mb-4" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                    >
                      ¡Correcto! +100 puntos
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <FontAwesomeIcon icon={faTimes} className="text-6xl mb-4" />
                    <div className="text-2xl font-bold mb-2">Incorrecto</div>
                  </div>
                )
              ) : (
                selectedAnswer === currentScenarioData.answer ? (
                  <div className="text-green-400">
                    <FontAwesomeIcon icon={faCheck} className="text-6xl mb-4" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
                    >
                      ¡Correcto! +100 puntos
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-red-400">
                    <FontAwesomeIcon icon={faTimes} className="text-6xl mb-4" />
                    <div className="text-2xl font-bold mb-2">Incorrecto</div>
                  </div>
                )
              )}
            </motion.div>

            {/* Explicación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}
            >
              {currentScenarioData.type === 'match'
                ? (selectedAnswer === 'match-correct'
                    ? (
                        <p className="text-green-400 font-semibold mt-2">
                          {correctPhrases[Math.floor(Math.random() * correctPhrases.length)]}
                        </p>
                      )
                    : (
                        <p className="text-red-400 font-semibold mt-2">
                          {incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)]}
                        </p>
                      )
                  )
                : (selectedAnswer === currentScenarioData.answer
                    ? (
                        <p className="text-green-400 font-semibold mt-2">
                          {correctPhrases[Math.floor(Math.random() * correctPhrases.length)]}
                        </p>
                      )
                    : (
                        <p className="text-red-400 font-semibold mt-2">
                          {incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)]}
                        </p>
                      )
                  )
              }
            </motion.div>

            {/* Botón Siguiente o Reintentar */}
            <motion.button
              onTap={
                currentScenarioData.type === 'match'
                  ? (selectedAnswer === 'match-correct' ? handleNextScenario : handleRetryQuiz)
                  : (selectedAnswer === currentScenarioData.answer ? handleNextScenario : handleRetryQuiz)
              }
              style={{ fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '1rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0 auto', background: ((currentScenarioData.type === 'match' && selectedAnswer === 'match-correct') || (currentScenarioData.type !== 'match' && selectedAnswer === currentScenarioData.answer)) ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' : 'linear-gradient(to right, #ef4444, #dc2626)', color: 'white' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {((currentScenarioData.type === 'match' && selectedAnswer === 'match-correct') || (currentScenarioData.type !== 'match' && selectedAnswer === currentScenarioData.answer)) ? (
                <>
                  <span>{currentScenario < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                  <FontAwesomeIcon icon={currentScenario < quizQuestions.length - 1 ? faArrowLeft : faTrophy} className={currentScenario < quizQuestions.length - 1 ? "rotate-180" : ""} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRedo} />
                  <span>Reintentar Quiz</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CompanyServicesQuiz