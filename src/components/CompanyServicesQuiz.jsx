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
  faRedo,
  faQuestionCircle
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
  const [isExiting, setIsExiting] = useState(false)

  // Completar el nivel cuando se termine el quiz exitosamente (solo una vez)
  useEffect(() => {
    if (isCompleted && !hasCompletedLevel) {
      // Completar el nivel 2 en el contexto
      completeLevel(2)
      setHasCompletedLevel(true)
      
      // Navegar al Achievement después de un breve retraso, igual que en PoliciesLevel
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          navigate('/achievement/2')
        }, 500)
      }, 2000)
    }
  }, [isCompleted, hasCompletedLevel, completeLevel, navigate])

  // Estrellas de fondo memoizadas
  const stars = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 2 + Math.random() * 5,
      delay: Math.random() * 3
    }))
  }, [])

  // Nuevas preguntas del quiz
  const quizQuestions = [
    {
      question: '¿Cuál es el año meta de la Visión de la empresa?',
      options: ['2025', '2030', '2040'],
      answer: 1,
      icon: faGlobe,
      explanation: 'Nuestra visión está proyectada hacia el año 2030, donde aspiramos a ser reconocidos como líderes en el sector.'
    },
    {
      question: 'Nuestra misión se centra principalmente en:',
      options: ['Reducir costos de los clientes', 'Mejorar el desempeño de los clientes', 'Aumentar la publicidad de los clientes'],
      answer: 1,
      icon: faRocket,
      explanation: 'El enfoque principal de nuestra misión es mejorar el desempeño de nuestros clientes a través de soluciones innovadoras.'
    },
    {
      question: 'El propósito de la empresa es brindar tranquilidad con soluciones…',
      options: ['100% digitales', 'Personalizadas', 'Tecnológicamente humanas'],
      answer: 2,
      icon: faShield,
      explanation: 'Buscamos combinar lo mejor de la tecnología con un enfoque humano para brindar tranquilidad a nuestros clientes.'
    },
    {
      question: '¿Cuál de estos es un valor que implica honestidad y transparencia?',
      options: ['Empatía', 'Integridad', 'Adaptabilidad'],
      answer: 1,
      icon: faUserTie,
      explanation: 'La integridad es el valor que representa nuestra honestidad y transparencia en todas las acciones.'
    },
    {
      question: 'Si un cliente cambia su necesidad a última hora, el valor más importante que aplicamos es:',
      options: ['Confiabilidad', 'Adaptabilidad', 'Integridad'],
      answer: 1,
      icon: faCogs,
      explanation: 'La adaptabilidad nos permite ajustarnos a los cambios y necesidades imprevistas de nuestros clientes.'
    },
    {
      question: '¿Qué diferenciador refleja trabajar de la mano del cliente para diseñar soluciones a la medida?',
      options: ['Acompañamiento', 'Personalización', 'Adaptabilidad'],
      answer: 1,
      icon: faBriefcase,
      explanation: 'La personalización es nuestro diferenciador clave que nos permite crear soluciones específicas para cada cliente.'
    },
    {
      question: 'La competencia "Calidad en el trabajo" consiste en:',
      options: ['Tener amplios conocimientos y generar credibilidad', 'Ser empático con clientes internos', 'Adaptarse a los cambios'],
      answer: 0,
      icon: faChartLine,
      explanation: 'La calidad en el trabajo se demuestra a través de conocimientos sólidos y la generación de credibilidad.'
    },
    {
      question: 'Relaciona nivel ↔ competencia correcta:',
      type: 'match',
      pairs: [
        { left: 'Estratégico', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 0 },
        { left: 'Táctico', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 1 },
        { left: 'Operativo', right: ['Pensamiento estratégico', 'Liderazgo', 'Trabajo colaborativo'], answer: 2 }
      ],
      icon: faUsers,
      explanation: 'Cada nivel organizacional requiere competencias específicas: estratégico (pensamiento), táctico (liderazgo) y operativo (colaboración).'
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
      scenarioId: currentScenario,
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

  const getColorClasses = (index) => {
    const colors = [
      'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      'from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
    ]
    return colors[index % colors.length]
  }

  // Frases aleatorias para feedback
  const correctPhrases = [
    "¡Excelente! Demuestras un gran conocimiento.",
    "¡Perfecto! Sigues avanzando con seguridad.",
    "¡Muy bien! Tu comprensión es notable.",
    "¡Correcto! Vas por el camino indicado.",
    "¡Bravo! Tu respuesta es precisa."
  ];
  
  const incorrectPhrases = [
    "Casi lo logras, sigue intentándolo.",
    "No te desanimes, cada error es aprendizaje.",
    "¡Sigue así! La próxima vez lo conseguirás.",
    "Ánimo, estás progresando con cada intento.",
    "No te rindas, el conocimiento se construye paso a paso."
  ];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
        {/* Estrellas de fondo mejoradas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          className="relative z-10 text-center text-white p-8 bg-gradient-to-b from-purple-900/30 to-slate-900/20 backdrop-blur-md rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
            ¡Quiz Completado!
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-8 text-purple-200"
          >
            Redirigiendo a tu logro...
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="text-6xl font-bold text-yellow-400 mb-6 py-4 bg-gradient-to-r from-amber-500/10 to-yellow-400/10 rounded-xl border border-amber-400/30"
          >
            {score} puntos
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full mt-4"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Fondo fijo que cubre toda la pantalla */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      {/* Estrellas de fondo mejoradas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 md:mb-8 gap-4">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="transition-transform group-hover:-translate-x-1" />
            <span>Volver a ADN</span>
          </motion.button>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-center text-white bg-purple-800/30 py-2 px-4 rounded-xl border border-purple-500/30">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">{score}</div>
              <div className="text-xs md:text-sm text-purple-200">Puntos</div>
            </div>
            
            <div className="text-center text-white bg-purple-800/30 py-2 px-4 rounded-xl border border-purple-500/30">
              <div className="text-lg md:text-xl font-semibold">{currentScenario + 1}/{quizQuestions.length}</div>
              <div className="text-xs md:text-sm text-purple-200">Preguntas</div>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-6 md:mb-8">
          <div className="bg-white/10 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/20"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <div className="text-right mt-1 text-xs text-purple-300">
            {Math.round(progress)}% completado
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            /* Vista de Pregunta */
            <motion.div
              key={`question-${currentScenario}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Encabezado de pregunta */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 p-6 bg-gradient-to-b from-purple-900/30 to-slate-900/10 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white text-2xl mb-4">
                  <FontAwesomeIcon icon={currentScenarioData.icon || faQuestionCircle} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {currentScenarioData.question}
                </h2>
                <div className="text-sm text-purple-300 mt-2">
                  Pregunta {currentScenario + 1} de {quizQuestions.length}
                </div>
              </motion.div>

              {/* Opciones para preguntas normales */}
              {currentScenarioData.type !== 'match' ? (
                <div className="grid gap-3 md:gap-4 max-w-2xl mx-auto">
                  {currentScenarioData.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-1 rounded-xl bg-gradient-to-r ${selectedAnswer === index ? 'from-yellow-400/30 to-amber-400/30' : 'from-purple-700/20 to-blue-700/20'} backdrop-blur-sm`}
                    >
                      <button
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                          selectedAnswer === index 
                            ? 'bg-gradient-to-r from-amber-500/10 to-yellow-400/10 border-2 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                            : 'bg-gradient-to-b from-purple-900/30 to-slate-900/20 border border-purple-500/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedAnswer === index 
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' 
                              : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">{option}</h3>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Opciones para pregunta tipo match */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid gap-4 max-w-2xl mx-auto"
                >
                  {currentScenarioData.pairs.map((pair, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gradient-to-b from-purple-900/30 to-slate-900/20 backdrop-blur-md rounded-xl border border-purple-500/30"
                    >
                      <span className="font-bold text-white text-lg bg-gradient-to-r from-purple-600 to-blue-500 py-1 px-3 rounded-lg min-w-[7rem] text-center sm:text-left">
                        {pair.left}
                      </span>
                      <div className="flex-1 w-full">
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
                          placeholder="Selecciona una opción..."
                          menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                          styles={{
                            control: (base) => ({
                              ...base,
                              background: 'rgba(255,255,255,0.08)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              borderRadius: '0.75rem',
                              border: '1px solid rgba(255,255,255,0.3)',
                              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                              minHeight: '48px',
                              fontSize: '1rem',
                            }),
                            menu: (base) => ({
                              ...base,
                              background: 'rgba(30, 30, 50, 0.95)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              borderRadius: '0.75rem',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                              overflow: 'hidden',
                              zIndex: 9999,
                            }),
                            menuPortal: (base) => ({
                              ...base,
                              zIndex: 9999,
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isFocused 
                                ? 'linear-gradient(to right, rgba(168,85,247,0.3), rgba(99,102,241,0.3))' 
                                : 'transparent',
                              color: 'white',
                              padding: '12px 16px',
                              ':active': {
                                background: 'linear-gradient(to right, rgba(168,85,247,0.5), rgba(99,102,241,0.5))'
                              }
                            }),
                            singleValue: (base) => ({
                              ...base,
                              color: 'white',
                              fontWeight: '500'
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
                              neutral0: 'rgba(30, 30, 50, 0.95)',
                              neutral80: 'white',
                            },
                          })}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Botón Enviar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => {
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
                  disabled={
                    (currentScenarioData.type !== 'match' && selectedAnswer === null) || 
                    (currentScenarioData.type === 'match' && !currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))
                  }
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    (currentScenarioData.type !== 'match' && selectedAnswer !== null) || 
                    (currentScenarioData.type === 'match' && currentScenarioData.pairs.every((_, idx) => answers[idx]?.selectedOption !== undefined))
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transform hover:-translate-y-0.5'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirmar Respuesta
                </button>
              </motion.div>
            </motion.div>
          ) : (
            /* Vista de Resultado */
            <motion.div
              key={`result-${currentScenario}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto text-center flex flex-col justify-center min-h-[500px]"
            >
              {/* Feedback */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 100 }}
                className="mb-8"
              >
                {currentScenarioData.type === 'match' ? (
                  selectedAnswer === 'match-correct' ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-lg shadow-green-500/30">
                        <FontAwesomeIcon icon={faCheck} className="text-4xl text-white" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-green-400 mb-2"
                      >
                        ¡Correcto! +100 puntos
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 mb-6 shadow-lg shadow-red-500/30">
                        <FontAwesomeIcon icon={faTimes} className="text-4xl text-white" />
                      </div>
                      <div className="text-2xl font-bold text-red-400 mb-2">Incorrecto</div>
                    </div>
                  )
                ) : (
                  selectedAnswer === currentScenarioData.answer ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-lg shadow-green-500/30">
                        <FontAwesomeIcon icon={faCheck} className="text-4xl text-white" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-green-400 mb-2"
                      >
                        ¡Correcto! +100 puntos
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 mb-6 shadow-lg shadow-red-500/30">
                        <FontAwesomeIcon icon={faTimes} className="text-4xl text-white" />
                      </div>
                      <div className="text-2xl font-bold text-red-400 mb-2">Incorrecto</div>
                    </div>
                  )
                )}
              </motion.div>

              {/* Explicación */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-gradient-to-b from-purple-900/30 to-slate-900/20 backdrop-blur-md rounded-2xl border border-purple-500/30 mb-8 text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faQuestionCircle} className="text-purple-400" />
                  Explicación:
                </h3>
                <p className="text-purple-200">
                  {currentScenarioData.explanation}
                </p>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/20">
                  {currentScenarioData.type === 'match'
                    ? (selectedAnswer === 'match-correct'
                        ? <p className="text-green-400 font-medium">{correctPhrases[Math.floor(Math.random() * correctPhrases.length)]}</p>
                        : <p className="text-amber-400 font-medium">{incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)]}</p>
                      )
                    : (selectedAnswer === currentScenarioData.answer
                        ? <p className="text-green-400 font-medium">{correctPhrases[Math.floor(Math.random() * correctPhrases.length)]}</p>
                        : <p className="text-amber-400 font-medium">{incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)]}</p>
                      )
                  }
                </div>
              </motion.div>

              {/* Botón Siguiente o Reintentar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
              >
                <button
                  onClick={
                    currentScenarioData.type === 'match'
                      ? (selectedAnswer === 'match-correct' ? handleNextScenario : handleRetryQuiz)
                      : (selectedAnswer === currentScenarioData.answer ? handleNextScenario : handleRetryQuiz)
                  }
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                    ((currentScenarioData.type === 'match' && selectedAnswer === 'match-correct') || 
                    (currentScenarioData.type !== 'match' && selectedAnswer === currentScenarioData.answer))
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40'
                  }`}
                >
                  {((currentScenarioData.type === 'match' && selectedAnswer === 'match-correct') || 
                    (currentScenarioData.type !== 'match' && selectedAnswer === currentScenarioData.answer)) ? (
                    <>
                      <span>{currentScenario < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                      <FontAwesomeIcon icon={currentScenario < quizQuestions.length - 1 ? faArrowLeft : faTrophy} className={currentScenario < quizQuestions.length - 1 ? "rotate-180" : ""} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faRedo} />
                      <span>Reintentar Pregunta</span>
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CompanyServicesQuiz