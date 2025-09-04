import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowLeft, 
  faStar, 
  faCheck, 
  faTimes,
  faBook,
  faUserShield,
  faClipboardCheck,
  faHardHat,
  faShield,
  faBuilding
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Confetti from './Confetti'

const ValuesGameLevel = () => {
  const navigate = useNavigate();
  const { completeLevel } = useAppContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  const sectionData = [
    {
      title: 'Normatividad de SST',
      icon: faBook,
      items: [
        'DECRETO 1072 DE 2015 - Decreto Único Reglamentario del Sector Trabajo',
        'RESOLUCIÓN 0312 DE 2019 - Define los Estándares Mínimos del SG-SST'
      ]
    },
    {
      title: 'Objetivos del SG-SST',
      icon: faShield,
      items: [
        'Identificar los peligros, evaluar y valorar los riesgos y establecer los controles',
        'Proteger la seguridad y salud de todos los trabajadores mediante mejora continua',
        'Cumplir la normatividad nacional vigente en materia de riesgos laborales'
      ]
    },
    {
      title: 'Funciones de la Dirección',
      icon: faBuilding,
      items: [
        'Disponer de recursos humanos, técnicos y financieros necesarios',
        'Participar en revisiones periódicas y establecimiento de objetivos',
        'Elaboración e implementación de Política y Objetivos de SST',
        'Cumplir requisitos legales y contractuales en SST',
        'Designar a los responsables del SG-SST',
        'Solicitar que se presenten informes sobre desempeño del SG-SST para su revisión',
        'Participar en auditorias internas al SG-SST',
        'Definir y hacer seguimiento a objetivos y metas del SST'
      ]
    },
    {
      title: 'Funciones de los Trabajadores',
      icon: faUserShield,
      items: [
        'Procurar el cuidado integral de su salud',
        'Suministrar información clara y veraz sobre su estado de salud',
        'Cumplir normas, reglamentos e instrucciones de SGSST',
        'Informar sobre peligros y riesgos en el trabajo',
        'Participar en capacitaciones de seguridad y salud',
        'Contribuir al cumplimiento de objetivos del SG-SST',
        'Informar accidentes y participar en investigaciones'
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "Uno de los objetivos principales del SG-SST es ________",
      options: [
        "Mejorar la seguridad y salud de los trabajadores",
        "Reducir costos de producción",
        "Aumentar la productividad",
        "Minimizar el personal requerido"
      ],
      correctAnswer: 0,
      explanation: "El SG-SST tiene como objetivo principal proteger la seguridad y salud de todos los trabajadores mediante la mejora continua."
    },
    {
      question: "Es una función de la dirección en el SG-SST:",
      options: [
        "Informar sobre accidentes menores",
        "Disponer de recursos necesarios para implementar el sistema",
        "Participar en capacitaciones básicas",
        "Mantener limpio el espacio de trabajo"
      ],
      correctAnswer: 1,
      explanation: "La dirección debe disponer oportunamente de los recursos humanos, técnicos y financieros necesarios para la implementación efectiva del sistema."
    },
    {
      question: "Los trabajadores deben ________ en el SG-SST:",
      options: [
        "Solo asistir a las capacitaciones",
        "Únicamente reportar accidentes graves",
        "Procurar el cuidado integral de su salud",
        "Evitar participar en las investigaciones"
      ],
      correctAnswer: 2,
      explanation: "Es responsabilidad fundamental de los trabajadores procurar el cuidado integral de su salud."
    },
    {
      question: "La normatividad principal del SG-SST incluye:",
      options: [
        "Ley 100 de 1993",
        "Decreto 1072 de 2015",
        "Ley 50 de 1990",
        "Decreto 2020 de 2019"
      ],
      correctAnswer: 1,
      explanation: "El Decreto 1072 de 2015 es el Decreto Único Reglamentario del Sector Trabajo y es fundamental para el SG-SST."
    },
    {
      question: "Una responsabilidad clave de los trabajadores es:",
      options: [
        "Elaborar políticas de SST",
        "Asignar recursos financieros",
        "Informar sobre peligros y riesgos",
        "Definir estándares mínimos"
      ],
      correctAnswer: 2,
      explanation: "Los trabajadores deben informar oportunamente sobre los peligros y riesgos latentes en su sitio de trabajo."
    }
  ];

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setGameCompleted(false);
    setShowCelebration(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === quizQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 20);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (!isCorrect) {
        // Si la respuesta es incorrecta, volver a la primera pregunta
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
      } else if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameCompleted(true);
        setShowCelebration(true);
        if (score >= 60) {
          completeLevel(3);
          setShowLoading(true);
          setTimeout(() => {
            setShowLoading(false);
            navigate('/achievement/3');
          }, 2000);
        }
      }
    }, 2000);
  };

  // Memoizar las estrellas del fondo
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Estrellas animadas */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8">
          {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <motion.button
              onClick={() => showQuiz ? setShowQuiz(false) : navigate('/map')}
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{showQuiz ? 'Volver a información' : 'Volver al mapa'}</span>
            </motion.button>
            <div className="text-white text-lg">
              Puntuación: <span className="font-bold text-yellow-400">{score}</span>
            </div>
          </div>
          
          <motion.h1 
            className="text-4xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2 
            }}
          >
            SISTEMA DE GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO
          </motion.h1>
        </div>

        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <>
              {/* Información del SG-SST */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                {sectionData.map((section, index) => (
                  <motion.div
                    key={section.title}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6"
                    initial={{ 
                      opacity: 0,
                      x: index % 2 === 0 ? -50 : 50,
                      y: 20
                    }}
                    animate={{ 
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.2 
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <FontAwesomeIcon icon={section.icon} className="text-2xl text-yellow-400 mr-3" />
                      <h3 className="text-xl font-bold text-white">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-white/80 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              {/* Botón Iniciar Prueba */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl 
                    font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 
                    transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Prueba
                </motion.button>
              </motion.div>
            </>
          ) : (
            /* Contenido del Quiz */
                        <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              {/* Pregunta actual */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
                </h3>
                <p className="text-xl text-white/90 mb-8">
                  {quizQuestions[currentQuestionIndex].question}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.button
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                          selectedAnswer === null 
                            ? 'bg-white/10 hover:bg-white/20 text-white' 
                            : selectedAnswer === index
                              ? index === quizQuestions[currentQuestionIndex].correctAnswer
                                ? 'bg-green-500/20 border-2 border-green-500 text-green-300'
                                : 'bg-red-500/20 border-2 border-red-500 text-red-300'
                              : 'bg-white/5 text-white/50'
                        }`}
                        whileHover={selectedAnswer === null ? { scale: 1.02, x: 10 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center">
                          <span className="text-lg">{option}</span>
                          {selectedAnswer === index && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <FontAwesomeIcon 
                                icon={index === quizQuestions[currentQuestionIndex].correctAnswer ? faCheck : faTimes}
                                className={`ml-auto ${
                                  index === quizQuestions[currentQuestionIndex].correctAnswer 
                                    ? 'text-green-400' 
                                    : 'text-red-400'
                                }`}
                              />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Barra de progreso */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-8">
                <motion.div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* Modal de retroalimentación */}
        <AnimatePresence>
          {showFeedback && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFeedback(false)}
          >
            <motion.div
              className={`bg-slate-900/90 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-md mx-4 text-center ${
                selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                  ? 'ring-4 ring-green-400/50'
                  : 'ring-4 ring-red-400/50'
              }`}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon 
                icon={selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer ? faCheck : faTimes}
                className={`text-6xl mb-4 ${
                  selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                    ? 'text-green-500/90'
                    : 'text-red-500/90'
                }`}
              />
              <h3 className={`text-2xl font-bold mb-4 ${
                selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                  ? '¡Correcto!'
                  : '¡Debes repasar la información!'}
              </h3>
              <p className="text-white/80">
                {quizQuestions[currentQuestionIndex].explanation}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Confetti para celebración */}
        {showCelebration && <Confetti />}
        {/* Animación de carga visual al finalizar el quiz */}
        <AnimatePresence>
          {showLoading && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-slate-900/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <svg className="animate-spin h-16 w-16 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span className="text-white text-xl font-bold">¡Logro desbloqueado! Redirigiendo...</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default ValuesGameLevel;