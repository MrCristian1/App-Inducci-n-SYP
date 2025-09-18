import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faSpinner, faRocket, faUsers, faCog, 
  faCheck, faTimes, faChartLine, faBuilding, faHandshake, 
  faTrophy, faStar, faMedal, faLightbulb 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';


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
  const [showTutorial, setShowTutorial] = useState(false);

  // Datos de los procesos y categorías
  const processes = useMemo(() => [
    { name: 'Direccionamiento estratégico', category: 'strategic', icon: faRocket, description: 'Define el rumbo y objetivos de la organización' },
    { name: 'Gestión del talento humano', category: 'support', icon: faUsers, description: 'Administra el capital humano de la empresa' },
    { name: 'Gestión administrativa y Financiera', category: 'support', icon: faBuilding, description: 'Controla los recursos financieros y operativos' },
    { name: 'Gestión Integral', category: 'support', icon: faCog, description: 'Coordina y optimiza todos los procesos organizacionales' },
    { name: 'Servicio al cliente', category: 'operational', icon: faHandshake, description: 'Gestiona las relaciones con los clientes' },
    { name: 'Gestión comercial y mercadeo', category: 'operational', icon: faChartLine, description: 'Desarrolla estrategias de ventas y marketing' },
    { name: 'Administración de nomina', category: 'operational', icon: faUsers, description: 'Procesa y gestiona los pagos al personal' },
    { name: 'Outsourcing de tesorería', category: 'operational', icon: faBuilding, description: 'Externaliza la gestión de recursos financieros' },
    { name: 'Administración de personal', category: 'operational', icon: faUsers, description: 'Administra los aspectos laborales del personal' },
    { name: 'Selección de personal', category: 'operational', icon: faUsers, description: 'Identifica y contrata el talento necesario' },
    { name: 'Employer of record', category: 'operational', icon: faHandshake, description: 'Actúa como empleador formal para terceros' }
  ], []);

  const categories = useMemo(() => ({
    strategic: { 
      name: 'Procesos Estratégicos', 
      icon: faRocket, 
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400/50',
      emoji: '🎯',
      description: 'Definen el rumbo y objetivos a largo plazo de la organización'
    },
    support: { 
      name: 'Procesos de Apoyo', 
      icon: faUsers, 
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      emoji: '🤝',
      description: 'Brindan soporte para el funcionamiento de otros procesos'
    },
    operational: { 
      name: 'Procesos Misionales', 
      icon: faCog, 
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      emoji: '⚙️',
      description: 'Generan el valor principal para los clientes y stakeholders'
    }
  }), []);

  // Animación de estrellas de fondo
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: Math.random() * 3 + 1
    }));
  }, []);

  // Efecto para mostrar el tutorial solo la primera vez


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
    setShowTutorial(true);
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
      if (score >= 7) {
        completeLevel(8);
      }
      return;
    }
    
    setIsSpinning(true);
    setSelectedCategory(null);
    setShowFeedback(false);
    
    // Simular el giro de la ruleta con animación mejorada
    const spinDuration = 2000;
    const startTime = Date.now();
    
    const spinInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        const randomIndex = Math.floor(Math.random() * availableProcesses.length);
        const selectedProcess = availableProcesses[randomIndex];
        setCurrentProcess(selectedProcess);
        setUsedProcesses(prev => [...prev, selectedProcess.name]);
        setIsSpinning(false);
      }
    }, 100);
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

  const closeTutorial = () => {
    setShowTutorial(false);
    setShowImage(false);
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Estrellas de fondo mejoradas */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full opacity-60 bg-white"
            style={{ 
              left: `${star.left}%`, 
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
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

      {/* Partículas de fondo adicionales */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Botón volver al mapa / volver */}
      <motion.button
        onClick={showQuiz ? handleBackToLevel : handleBackToMap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-6 left-6 ${showTutorial ? 'z-10' : 'z-50'} flex items-center gap-2 text-white hover:text-yellow-300 transition-colors px-4 py-2 rounded-lg`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>{showQuiz ? 'Volver' : 'Volver al mapa'}</span>
      </motion.button>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-20 px-4 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            Mapa de Procesos
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-300 mb-6">
            Conoce los procesos que impulsan a Solutions and Payroll
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto"></div>
        </motion.header>

        {/* Tutorial inicial */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-white/10 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bienvenido al Mapa de Procesos</h3>
                  <p className="text-blue-200">Aprende sobre los procesos de la empresa de forma divertida</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="text-2xl text-blue-400 mb-2">1</div>
                    <h4 className="font-semibold text-white mb-2">Gira la Ruleta</h4>
                    <p className="text-sm text-slate-300">Descubre procesos aleatorios de la empresa</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="text-2xl text-green-400 mb-2">2</div>
                    <h4 className="font-semibold text-white mb-2">Clasifica</h4>
                    <p className="text-sm text-slate-300">Selecciona la categoría correcta para cada proceso</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="text-2xl text-yellow-400 mb-2">3</div>
                    <h4 className="font-semibold text-white mb-2">Aprende</h4>
                    <p className="text-sm text-slate-300">Descubre la función de cada proceso empresarial</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-xl">
                    <div className="text-2xl text-purple-400 mb-2">4</div>
                    <h4 className="font-semibold text-white mb-2">Gana</h4>
                    <p className="text-sm text-slate-300">Consigue al menos 7/11 para completar el desafío</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={closeTutorial}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Empezar Ahora</span>
                    <FontAwesomeIcon icon={faRocket} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mapa de procesos - Imagen */}
        {showImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-6xl mb-8 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Efecto de brillo en los bordes */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl pointer-events-none"></div>
              
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={handleStartChallenge}
              className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 border border-blue-400/50 mb-4 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Efecto de brillo al pasar el mouse */}
              <div className="absolute inset-0 bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Iniciar Desafío</span>
                <FontAwesomeIcon icon={faRocket} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            

          </motion.div>
        )}

        {/* Quiz de la ruleta */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl mb-12"
            >
              {!gameCompleted ? (
                <>
                  {/* Descripción del juego */}
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-300/30 shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                  >
                    <div className="text-center text-white">
                      <h4 className="text-xl font-bold mb-4 text-blue-200 flex items-center justify-center">
                        <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                        ¿Cómo funciona el juego?
                      </h4>
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
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex justify-between items-center text-white">
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-blue-300">{score}/{totalQuestions}</div>
                        <div className="text-sm text-white/80">Puntuación</div>
                      </div>
                      
                      <div className="h-10 w-px bg-white/20 mx-2"></div>
                      
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center">
                          {streak > 0 && <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />}
                          {streak}
                        </div>
                        <div className="text-sm text-white/80">Racha</div>
                      </div>
                      
                      <div className="h-10 w-px bg-white/20 mx-2"></div>
                      
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-green-400">{Math.round((score/Math.max(totalQuestions, 1)) * 100)}%</div>
                        <div className="text-sm text-white/80">Precisión</div>
                      </div>
                      
                      <div className="h-10 w-px bg-white/20 mx-2"></div>
                      
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-purple-400">{processes.length - usedProcesses.length}</div>
                        <div className="text-sm text-white/80">Restantes</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ruleta */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-2 text-blue-400 animate-spin-slow" />
                      Ruleta de Procesos
                    </motion.h3>
                    
                    {/* Círculo de la ruleta */}
                    <motion.div 
                      className="relative w-64 h-64 mx-auto mb-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-4 border-white/30 ${isSpinning ? 'animate-spin' : ''} shadow-xl`}></div>
                      
                      <div className="absolute inset-4 bg-slate-800/90 rounded-full flex items-center justify-center border border-white/10">
                        {isSpinning ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-white" />
                          </motion.div>
                        ) : currentProcess ? (
                          <div className="text-center text-white p-4">
                            <FontAwesomeIcon icon={currentProcess.icon} className="text-4xl mb-2 text-blue-300" />
                            <div className="text-sm font-bold px-4 text-center leading-tight">
                              {currentProcess.name}
                            </div>
                            {showFeedback && (
                              <motion.p 
                                className="text-xs mt-2 text-blue-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                {currentProcess.description}
                              </motion.p>
                            )}
                          </div>
                        ) : (
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="text-sm font-bold">¡Gira la ruleta!</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Flecha indicadora */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                      </div>
                      
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/5 to-transparent"></div>
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
                        className={`relative px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
                          isSpinning || (currentProcess && !showFeedback)
                            ? 'bg-gray-500 cursor-not-allowed text-white' 
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg'
                        }`}
                      >
                        {/* Efecto de brillo al pasar el mouse */}
                        <div className="absolute inset-0 bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                        
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          {isSpinning ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <FontAwesomeIcon icon={faSpinner} />
                              </motion.span>
                              <span>Girando...</span>
                            </>
                          ) : currentProcess && !showFeedback ? (
                            <span>Selecciona una categoría</span>
                          ) : (
                            <>
                              <span>Girar Ruleta</span>
                              <FontAwesomeIcon icon={faCog} className="group-hover:rotate-90 transition-transform" />
                            </>
                          )}
                        </span>
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
                          <motion.button
                            key={key}
                            onClick={() => handleCategorySelect(key)}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-white ${categories[key].borderColor} ${categories[key].bgColor}`}
                          >
                            <div className="text-center">
                              <FontAwesomeIcon icon={category.icon} className="text-2xl mb-2" />
                              <div className="font-semibold text-sm mb-1">{category.name}</div>
                              <div className="text-xs opacity-80">{category.description}</div>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Feedback */}
                    {showFeedback && currentProcess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-6 rounded-2xl mb-6 backdrop-blur-md ${
                          currentProcess.category === selectedCategory
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-red-500/20 border-2 border-red-400'
                        }`}
                      >
                        <div className="text-center text-white">
                          <div className="text-5xl mb-3">
                            {currentProcess.category === selectedCategory ? '✅' : '❌'}
                          </div>
                          <div className="text-xl font-bold mb-2">
                            {currentProcess.category === selectedCategory ? '¡Correcto!' : '¡Incorrecto!'}
                          </div>
                          <div className="text-lg mb-3">
                            <span className="font-semibold">"{currentProcess.name}"</span> pertenece a{' '}
                            <span className={`font-bold ${currentProcess.category === selectedCategory ? 'text-green-300' : 'text-yellow-300'}`}>
                              {categories[currentProcess.category].name}
                            </span>
                          </div>
                          
                          <div className="mb-4 p-3 bg-black/20 rounded-lg">
                            <div className="text-sm text-blue-200">{currentProcess.description}</div>
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
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg text-center text-white"
                >
                  <div className="text-6xl mb-4">{score >= 7 ? '🎉' : '😞'}</div>
                  <h2 className="text-3xl font-bold mb-4">
                    {score >= 7 ? '¡Desafío Aprobado!' : '¡Desafío Completado!'}
                  </h2>
                  
                  <div className="flex justify-center items-center mb-6">
                    <div className={`text-5xl font-bold ${score >= 7 ? 'text-green-400' : 'text-red-400'}`}>
                      {score}/{processes.length}
                    </div>
                  </div>
                  
                  <div className="text-lg mb-6">
                    Precisión: <span className={`font-bold ${score >= 7 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.round((score/processes.length) * 100)}%
                    </span>
                  </div>
                  
                  <div className="text-lg mb-6 bg-black/20 p-4 rounded-xl">
                    {score >= 7 ? (
                      <span className="text-green-300 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        ¡Has superado la puntuación mínima de 7/11!
                      </span>
                    ) : (
                      <span className="text-red-300 flex items-center justify-center">
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Necesitas al menos 7/11 respuestas correctas para aprobar
                      </span>
                    )}
                  </div>
                  
                  {score >= 7 && (
                    <div className="mb-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
                      <div className="flex items-center justify-center text-yellow-300">
                        <FontAwesomeIcon icon={faTrophy} className="mr-2 text-xl" />
                        <span>¡Felicidades! Has desbloqueado un nuevo logro</span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={finishGame}
                    className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                      score >= 7 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    }`}
                  >
                    {score >= 7 ? (
                      <span className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faTrophy} />
                        <span>Ver Logro</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMedal} />
                        <span>Intentar de Nuevo</span>
                      </span>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
};

export default ProcessMapLevel;