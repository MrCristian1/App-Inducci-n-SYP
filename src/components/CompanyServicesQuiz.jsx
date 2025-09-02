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

  // Escenarios empresariales
  const scenarios = [
    {
      id: 1,
      emoji: "🚀",
      title: "Startup en Crecimiento Acelerado",
      description: "TechStart ha crecido de 5 a 50 empleados en 6 meses. El CEO está abrumado calculando nóminas manualmente y necesita una solución urgente para gestionar salarios, prestaciones y deducciones de manera eficiente.",
      correctAnswer: 0,
      options: [
        {
          id: 0,
          text: "Outsourcing de Nómina",
          icon: faCalculator,
          color: "blue",
          explanation: "Perfecto para startups que necesitan automatizar procesos de nómina sin invertir en infraestructura interna."
        },
        {
          id: 1,
          text: "Outsourcing de RRHH",
          icon: faUsers,
          color: "green",
          explanation: "Aunque útil, no resuelve específicamente el problema urgente de cálculo de nóminas."
        },
        {
          id: 2,
          text: "Reclutamiento y Selección",
          icon: faSearch,
          color: "orange",
          explanation: "No es la prioridad actual, ya que el problema es gestionar la nómina de empleados existentes."
        }
      ]
    },
    {
      id: 2,
      emoji: "🌎",
      title: "Expansión Internacional",
      description: "GlobalTech USA quiere contratar 20 desarrolladores en Colombia pero no tiene entidad legal local. Necesitan cumplir con regulaciones laborales colombianas sin establecer una subsidiaria.",
      correctAnswer: 1,
      options: [
        {
          id: 0,
          text: "Outsourcing de Nómina",
          icon: faCalculator,
          color: "blue",
          explanation: "Solo maneja nómina, pero no resuelve la falta de entidad legal en Colombia."
        },
        {
          id: 1,
          text: "Employer of Record (EOR)",
          icon: faShield,
          color: "purple",
          explanation: "¡Exacto! EOR permite contratar legalmente en Colombia sin establecer una entidad local."
        },
        {
          id: 2,
          text: "Outsourcing de Tesorería",
          icon: faBriefcase,
          color: "teal",
          explanation: "Maneja finanzas pero no resuelve el problema de contratación legal internacional."
        }
      ]
    },
    {
      id: 3,
      emoji: "⚙️",
      title: "Búsqueda de Talento Especializado",
      description: "ManufacturingPro necesita urgentemente 5 ingenieros mecánicos con experiencia en automatización industrial. Han publicado ofertas por 3 meses sin encontrar candidatos calificados.",
      correctAnswer: 2,
      options: [
        {
          id: 0,
          text: "Outsourcing de RRHH",
          icon: faUsers,
          color: "green",
          explanation: "Maneja procesos generales de RRHH, pero no se especializa en búsqueda de talento específico."
        },
        {
          id: 1,
          text: "Employer of Record (EOR)",
          icon: faShield,
          color: "purple",
          explanation: "Útil para contratación internacional, pero no para encontrar candidatos especializados."
        },
        {
          id: 2,
          text: "Reclutamiento y Selección",
          icon: faSearch,
          color: "orange",
          explanation: "¡Perfecto! Especialistas en encontrar talento específico con las competencias exactas requeridas."
        }
      ]
    },
    {
      id: 4,
      emoji: "💰",
      title: "Gestión Financiera Compleja",
      description: "RetailChain maneja múltiples cuentas bancarias, pagos a 500+ proveedores, y flujos de caja complejos. El CFO necesita optimizar la gestión financiera y tener reportes en tiempo real.",
      correctAnswer: 2,
      options: [
        {
          id: 0,
          text: "Outsourcing de Nómina",
          icon: faCalculator,
          color: "blue",
          explanation: "Solo maneja nómina de empleados, no la gestión financiera integral de la empresa."
        },
        {
          id: 1,
          text: "Reclutamiento y Selección",
          icon: faSearch,
          color: "orange",
          explanation: "Se enfoca en talento humano, no en gestión financiera y tesorería."
        },
        {
          id: 2,
          text: "Outsourcing de Tesorería",
          icon: faBriefcase,
          color: "teal",
          explanation: "¡Exacto! Optimiza flujos de caja, gestiona múltiples cuentas y proporciona reportes financieros en tiempo real."
        }
      ]
    },
    {
      id: 5,
      emoji: "👥",
      title: "Departamento de RRHH Saturado",
      description: "CorporatePlus tiene 200 empleados y su equipo de RRHH de 3 personas está abrumado con reclutamiento, capacitaciones, evaluaciones de desempeño y gestión de beneficios. Necesitan apoyo integral.",
      correctAnswer: 0,
      options: [
        {
          id: 0,
          text: "Outsourcing de RRHH",
          icon: faUsers,
          color: "green",
          explanation: "¡Perfecto! Proporciona gestión integral de talento humano, liberando al equipo interno para tareas estratégicas."
        },
        {
          id: 1,
          text: "Employer of Record (EOR)",
          icon: faShield,
          color: "purple",
          explanation: "Se enfoca en contratación internacional, no en gestión integral de RRHH existente."
        },
        {
          id: 2,
          text: "Outsourcing de Tesorería",
          icon: faBriefcase,
          color: "teal",
          explanation: "Maneja finanzas, pero no resuelve la saturación del departamento de RRHH."
        }
      ]
    }
  ]

  const currentScenarioData = scenarios[currentScenario]
  const progress = ((currentScenario + 1) / scenarios.length) * 100

  const handleAnswerSelect = (optionId) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentScenarioData.correctAnswer
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
    if (currentScenario < scenarios.length - 1) {
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
          className="relative z-10 text-center text-white p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-8xl mb-6"
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
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
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
              <div className="text-lg font-semibold">{currentScenario + 1} de {scenarios.length}</div>
              <div className="text-sm">Escenarios</div>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {!showResult ? (
          /* Vista de Escenario */
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl mx-auto"
          >
            {/* Escenario */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentScenarioData.emoji}</div>
              <h2 className="text-3xl font-bold text-white mb-4">{currentScenarioData.title}</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {currentScenarioData.description}
              </p>
            </div>

            {/* Opciones */}
            <div className="grid gap-4 max-w-2xl mx-auto">
              {currentScenarioData.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedAnswer === option.id
                      ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/30'
                      : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={showResult}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(option.color)}`}>
                      <FontAwesomeIcon icon={option.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{option.text}</h3>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botón Enviar */}
            <div className="text-center mt-8">
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
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
            className="max-w-3xl mx-auto text-center"
          >
            {/* Feedback */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-8"
            >
              {selectedAnswer === currentScenarioData.correctAnswer ? (
                <div className="text-green-400">
                  <FontAwesomeIcon icon={faCheck} className="text-6xl mb-4" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold mb-2"
                  >
                    ¡Correcto! +100 puntos
                  </motion.div>
                </div>
              ) : (
                <div className="text-red-400">
                  <FontAwesomeIcon icon={faTimes} className="text-6xl mb-4" />
                  <div className="text-2xl font-bold mb-2">Incorrecto</div>
                </div>
              )}
            </motion.div>

            {/* Explicación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
            >
              {selectedAnswer === currentScenarioData.correctAnswer ? (
                // Mostrar respuesta correcta cuando acierta
                <>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(currentScenarioData.options[currentScenarioData.correctAnswer].color)}`}>
                      <FontAwesomeIcon 
                        icon={currentScenarioData.options[currentScenarioData.correctAnswer].icon} 
                        className="w-6 h-6 text-white" 
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400">
                      ¡Exacto!
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg">
                    {currentScenarioData.options[currentScenarioData.correctAnswer].explanation}
                  </p>
                </>
              ) : (
                // Mostrar respuesta seleccionada cuando se equivoca
                 <>
                   <div className="flex items-start space-x-4 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(currentScenarioData.options[selectedAnswer].color)}`}>
                        <FontAwesomeIcon 
                          icon={currentScenarioData.options[selectedAnswer].icon} 
                          className="w-6 h-6 text-white" 
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {currentScenarioData.options[selectedAnswer].text}
                        </p>
                        <h3 className="text-xl font-bold text-red-400 text-left">
                           ¡Recuerda!
                         </h3>
                      </div>
                    </div>
                   <p className="text-gray-300 text-lg">
                     {currentScenarioData.options[selectedAnswer].explanation}
                   </p>
                 </>)}
            </motion.div>

            {/* Botón Siguiente o Reintentar */}
            <motion.button
              onClick={selectedAnswer === currentScenarioData.correctAnswer ? handleNextScenario : handleRetryQuiz}
              className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 mx-auto ${
                selectedAnswer === currentScenarioData.correctAnswer
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {selectedAnswer === currentScenarioData.correctAnswer ? (
                <>
                  <span>{currentScenario < scenarios.length - 1 ? 'Siguiente Escenario' : 'Ver Resultados'}</span>
                  <FontAwesomeIcon icon={currentScenario < scenarios.length - 1 ? faArrowLeft : faTrophy} className={currentScenario < scenarios.length - 1 ? "rotate-180" : ""} />
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