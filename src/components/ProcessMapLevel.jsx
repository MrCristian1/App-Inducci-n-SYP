import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner, faRocket, faUsers, faCog, faCheck, faTimes, faChartLine, faBuilding, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Confetti from './Confetti';

const ProcessMapLevel = () => {
  const navigate = useNavigate();
  const { completeLevel } = useAppContext();
  
  // Estados del juego
  const [showImage, setShowImage] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [usedProcesses, setUsedProcesses] = useState([]);

  // Datos de los procesos y categorías
  const processes = [
    { name: 'Direccionamiento estratégico', category: 'strategic', icon: faRocket },
    { name: 'Gestión del talento humano', category: 'support', icon: faUsers },
    { name: 'Gestión administrativa y Financiera', category: 'support', icon: faBuilding },
    { name: 'Gestión Integral', category: 'support', icon: faCog },
    { name: 'Servicio al cliente', category: 'operational', icon: faHandshake },
    { name: 'Gestión comercial y mercadeo', category: 'operational', icon: faChartLine },
    { name: 'Administración de nomina', category: 'operational', icon: faUsers },
    { name: 'Outsourcing de tesorería', category: 'operational', icon: faBuilding },
    { name: 'Administración de personal', category: 'operational', icon: faUsers },
    { name: 'Selección de personal', category: 'operational', icon: faUsers },
    { name: 'Employer of record', category: 'operational', icon: faHandshake }
  ];

  const categories = {
    strategic: { 
      name: 'Procesos Estratégicos', 
      icon: faRocket, 
      color: 'from-red-500 to-red-700',
      emoji: '🎯' 
    },
    support: { 
      name: 'Procesos de Apoyo', 
      icon: faUsers, 
      color: 'from-blue-500 to-blue-700',
      emoji: '🤝' 
    },
    operational: { 
      name: 'Procesos Misionales', 
      icon: faCog, 
      color: 'from-green-500 to-green-700',
      emoji: '⚙️' 
    }
  };

  // Animación de estrellas de fondo
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  const handleBackToMap = () => {
    navigate('/map');
  };

  const handleBackToLevel = () => {
    // Resetear todos los estados del quiz y volver al estado inicial
    setShowQuiz(false);
    setShowImage(true);
    setGameCompleted(false);
    setShowCelebration(false);
    setUsedProcesses([]);
    setCurrentProcess(null);
    setSelectedCategory(null);
    setShowFeedback(false);
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setIsSpinning(false);
  };

  const handleStartChallenge = () => {
    setShowImage(false);
    setShowQuiz(true);
  };

  const spinRoulette = () => {
    if (isSpinning) return;
    
    // Filtrar procesos que no han sido usados
    const availableProcesses = processes.filter(process => 
      !usedProcesses.includes(process.name)
    );
    
    // Si no hay más procesos disponibles, terminar el juego
    if (availableProcesses.length === 0) {
      setGameCompleted(true);
      setShowCelebration(true);
      completeLevel(8);
      return;
    }
    
    setIsSpinning(true);
    setSelectedCategory(null);
    setShowFeedback(false);
    
    // Simular el giro de la ruleta
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableProcesses.length);
      const selectedProcess = availableProcesses[randomIndex];
      setCurrentProcess(selectedProcess);
      setUsedProcesses(prev => [...prev, selectedProcess.name]);
      setIsSpinning(false);
    }, 2000);
  };

  const handleCategorySelect = (categoryKey) => {
    if (!currentProcess || selectedCategory) return;
    
    setSelectedCategory(categoryKey);
    setTotalQuestions(prev => prev + 1);
    
    setTimeout(() => {
      const isCorrect = currentProcess.category === categoryKey;
      if (isCorrect) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
      setShowFeedback(true);
      
      // Verificar si se han usado todos los procesos (11 procesos en total)
      if (usedProcesses.length >= processes.length - 1) {
        setTimeout(() => {
          setGameCompleted(true);
          setShowCelebration(true);
          // Solo completar el nivel si tiene 7 o más respuestas correctas
          if ((isCorrect ? score + 1 : score) >= 7) {
            completeLevel(8);
          }
        }, 2000);
      }
    }, 500);
  };

  const nextRound = () => {
    setCurrentProcess(null);
    setSelectedCategory(null);
    setShowFeedback(false);
  };

  const finishGame = () => {
    if (score >= 7) {
      navigate('/achievement/8');
    } else {
      // Reiniciar el juego si no aprobaron
      setShowQuiz(false);
      setShowImage(true);
      setGameCompleted(false);
      setShowCelebration(false);
      setUsedProcesses([]);
      setCurrentProcess(null);
      setSelectedCategory(null);
      setShowFeedback(false);
      setScore(0);
      setTotalQuestions(0);
      setStreak(0);
    }
  };

  const handleCompleteLevel = () => {
    completeLevel(8);
    setTimeout(() => {
      navigate('/achievement/8');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Botón volver al mapa / volver */}
      <button
        onClick={showQuiz ? handleBackToLevel : handleBackToMap}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>{showQuiz ? 'Volver' : 'Volver al mapa'}</span>
      </button>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-20 px-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Mapa de Procesos
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-300 mb-6">
            Conoce los procesos que impulsan a Solutions and Payroll
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"></div>
        </motion.header>

        {/* Mapa de procesos - Imagen */}
        {showImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-6xl mb-12 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg">
              <img 
                src="/img/mapa-procesos.png" 
                alt="Mapa de Procesos de Solutions and Payroll" 
                className="w-full h-auto max-w-4xl mx-auto rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        )}

        {/* Botón de iniciar desafío */}
        {showImage && (
          <motion.button
            onClick={handleStartChallenge}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 border border-blue-400/50 mb-20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Iniciar Desafío
          </motion.button>
        )}

        {/* Quiz de la ruleta */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl"
            >
              {!gameCompleted ? (
                <>
                  {/* Descripción del juego */}
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl p-6 border border-blue-300/30 shadow-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                  >
                    <div className="text-center text-white">
                      <h4 className="text-xl font-bold mb-4 text-blue-200">🎯 ¿Cómo funciona el juego?</h4>
                      <div className="text-sm text-white/90 space-y-2 max-w-3xl mx-auto">
                        <p>• <span className="font-semibold text-yellow-300">Gira la ruleta</span> para seleccionar un proceso aleatorio de la empresa</p>
                        <p>• <span className="font-semibold text-green-300">Clasifica el proceso</span> en una de las tres categorías disponibles</p>
                        <p>• <span className="font-semibold text-purple-300">Cada proceso aparece solo una vez</span> durante el desafío</p>
                        <p>• <span className="font-semibold text-orange-300">Puntuación mínima:</span> 7/11 respuestas correctas (64%) para aprobar</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Puntuación y estadísticas */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex justify-between items-center text-white">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{score}/{totalQuestions}</div>
                        <div className="text-sm text-white/80">Puntuación</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{streak}</div>
                        <div className="text-sm text-white/80">Racha</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{Math.round((score/Math.max(totalQuestions, 1)) * 100)}%</div>
                        <div className="text-sm text-white/80">Precisión</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ruleta */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold text-white text-center mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Ruleta de Procesos
                    </motion.h3>
                    
                    {/* Círculo de la ruleta */}
                    <motion.div 
                      className="relative w-64 h-64 mx-auto mb-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className={`w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center border-4 border-white/30 ${isSpinning ? 'animate-spin' : ''}`}>
                        {isSpinning ? (
                          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-white animate-pulse" />
                        ) : currentProcess ? (
                          <div className="text-center text-white">
                            <FontAwesomeIcon icon={currentProcess.icon} className="text-4xl mb-2" />
                            <div className="text-sm font-bold px-4 text-center leading-tight">
                              {currentProcess.name}
                            </div>
                          </div>
                        ) : (
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="text-sm font-bold">¡Gira la ruleta!</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Flecha indicadora */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                      </div>
                    </motion.div>

                    {/* Botón de girar */}
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <button
                        onClick={spinRoulette}
                        disabled={isSpinning || (currentProcess && !showFeedback)}
                        className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                          isSpinning || (currentProcess && !showFeedback)
                            ? 'bg-gray-500 cursor-not-allowed text-white' 
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg'
                        }`}
                      >
                        {isSpinning ? 'Girando...' : currentProcess && !showFeedback ? 'Selecciona una categoría' : 'Girar Ruleta'}
                      </button>
                    </motion.div>

                    {/* Opciones de categorías */}
                    {currentProcess && !showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                      >
                        {Object.entries(categories).map(([key, category]) => (
                          <button
                            key={key}
                            onClick={() => handleCategorySelect(key)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-white ${
                              selectedCategory === key
                                ? 'bg-blue-500/30 border-blue-400'
                                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="text-center">
                              <FontAwesomeIcon icon={category.icon} className="text-2xl mb-2" />
                              <div className="font-semibold text-sm">{category.name}</div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Feedback */}
                    {showFeedback && currentProcess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-6 rounded-xl mb-6 ${
                          currentProcess.category === selectedCategory
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-red-500/20 border-2 border-red-400'
                        }`}
                      >
                        <div className="text-center text-white">
                          <div className="text-4xl mb-2">
                            {currentProcess.category === selectedCategory ? '✅' : '❌'}
                          </div>
                          <div className="text-xl font-bold mb-2">
                            {currentProcess.category === selectedCategory ? '¡Correcto!' : '¡Incorrecto!'}
                          </div>
                          <div className="text-lg mb-3">
                            <span className="font-semibold">"{currentProcess.name}"</span> pertenece a{' '}
                            <span className="font-bold text-yellow-300">
                              {categories[currentProcess.category].name}
                            </span>
                          </div>
                          
                          {usedProcesses.length < processes.length && (
                            <button
                              onClick={nextRound}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                              Siguiente Ronda
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </>
              ) : (
                /* Pantalla de resultados finales */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg text-center text-white"
                >
                  <div className="text-6xl mb-4">{score >= 7 ? '🎉' : '😞'}</div>
                  <h2 className="text-3xl font-bold mb-4">
                    {score >= 7 ? '¡Desafío Aprobado!' : '¡Desafío Completado!'}
                  </h2>
                  <div className="text-xl mb-6">
                    Puntuación final: <span className="font-bold text-yellow-400">{score}/{processes.length}</span>
                  </div>
                  <div className="text-lg mb-6">
                    Precisión: <span className={`font-bold ${score >= 7 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.round((score/processes.length) * 100)}%
                    </span>
                  </div>
                  <div className="text-lg mb-6">
                    {score >= 7 ? (
                      <span className="text-green-300">✅ ¡Has superado la puntuación mínima de 7/11!</span>
                    ) : (
                      <span className="text-red-300">❌ Necesitas al menos 7/11 respuestas correctas para aprobar</span>
                    )}
                  </div>
                  <button
                    onClick={finishGame}
                    className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                      score >= 7 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                    }`}
                  >
                    {score >= 7 ? 'Ver Logro' : 'Intentar de Nuevo'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confetti de celebración */}
      {showCelebration && <Confetti />}
    </div>
  );
};

export default ProcessMapLevel;
