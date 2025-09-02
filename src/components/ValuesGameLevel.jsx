import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHeart, 
  faArrowLeft, 
  faTrophy, 
  faStar,
  faCheckCircle,
  faTimesCircle,
  faLightbulb,
  faHandshake,
  faShield,
  faUsers,
  faEye,
  faBullseye
} from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../context/AppContext'
import Confetti from './Confetti'

const ValuesGameLevel = () => {
  const navigate = useNavigate()
  const { completeLevel } = useAppContext()
  
  // Estados del juego
  const [gamePhase, setGamePhase] = useState('values') // 'values' | 'mission-vision'
  const [draggedItem, setDraggedItem] = useState(null)
  const [completedValues, setCompletedValues] = useState(new Set())
  const [completedMissionVision, setCompletedMissionVision] = useState(new Set())
  const [showFeedback, setShowFeedback] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Datos del juego - Fase 1: Valores con descripciones completas
  const valuesData = [
    {
      id: 'integridad',
      name: 'Integridad',
      icon: faShield,
      riddle: 'Como un escudo transparente que protege la verdad, este valor nos guía a actuar con honestidad en cada decisión.',
      description: 'Actuamos con honestidad, transparencia y ética en todo lo que hacemos, siendo coherentes y consistentes con nuestros principios al momento de tomar decisiones.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'confiabilidad',
      name: 'Confiabilidad',
      icon: faHandshake,
      riddle: 'Como una promesa que siempre se cumple, este valor construye puentes sólidos entre nosotros y nuestros clientes.',
      description: 'Construimos relaciones significativas fundamentadas en la confianza. Somos responsables, comprometidos y cumplimos nuestros acuerdos respetando la privacidad y confidencialidad en todo lo que hacemos.',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'empatia',
      name: 'Empatía',
      icon: faHeart,
      riddle: 'Como un espejo del alma, este valor nos permite ver el mundo a través de los ojos de otros.',
      description: 'Nos interesamos en comprender las necesidades y expectativas de nuestros clientes para diseñar soluciones efectivas que generen valor. Somos un equipo diverso, nos respetamos, valoramos y ayudamos a crecer entre todos.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 'adaptabilidad',
      name: 'Adaptabilidad',
      icon: faLightbulb,
      riddle: 'Como el agua que toma la forma de su recipiente, este valor nos permite fluir con los cambios del entorno.',
      description: 'Somos ágiles y nos adaptamos a los cambios y desafíos del entorno, encontrando en el aprendizaje continuo y la innovación fuentes de inspiración para responder a la evolución de las necesidades de nuestros clientes y colaboradores.',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  // Datos del juego - Fase 2: Misión y Visión
  const missionVisionData = [
    {
      id: 'mision',
      name: 'Misión',
      icon: faBullseye,
      content: 'Ayudamos a nuestros clientes a mejorar su desempeño a través del diseño y acompañamiento en la implementación de soluciones personalizadas de Back office, apalancados en tecnología e innovación. La satisfacción de nuestros clientes y bienestar de nuestros colaboradores son nuestra prioridad. Construimos relaciones de largo plazo y somos aliados en la gestión de nuestros clientes, con un equipo de trabajo que se adapta a los cambios del entorno.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'vision',
      name: 'Visión',
      icon: faEye,
      content: 'En el 2030 lograremos consolidar nuestras soluciones de Outsourcing en los mercados actuales mejorando el desempeño de nuestros clientes, apalancados en una cultura innovadora que impulsa el bienestar y el crecimiento de nuestros colaboradores.',
      color: 'from-cyan-400 to-cyan-600'
    }
  ]

  // Calcular progreso
  useEffect(() => {
    const totalItems = valuesData.length + missionVisionData.length
    const completedItems = completedValues.size + completedMissionVision.size
    setProgress((completedItems / totalItems) * 100)
    
    if (completedItems === totalItems && !gameCompleted) {
      setGameCompleted(true)
      setShowCelebration(true)
      completeLevel(3)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [completedValues, completedMissionVision, gameCompleted, completeLevel])

  // Handlers de drag and drop
  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    
    if (!draggedItem) return

    const isCorrect = draggedItem.id === targetId
    
    if (isCorrect) {
      if (gamePhase === 'values') {
        setCompletedValues(prev => new Set([...prev, targetId]))
        
        // Mensaje específico para cada valor con su descripción completa
        const valueDescriptions = {
          'integridad': 'Actuamos con honestidad, transparencia y ética en todo lo que hacemos, siendo coherentes y consistentes con nuestros principios al momento de tomar decisiones.',
          'confiabilidad': 'Construimos relaciones significativas fundamentadas en la confianza. Somos responsables, comprometidos y cumplimos nuestros acuerdos respetando la privacidad y confidencialidad en todo lo que hacemos.',
          'empatia': 'Nos interesamos en comprender las necesidades y expectativas de nuestros clientes para diseñar soluciones efectivas que generen valor. Somos un equipo diverso, nos respetamos, valoramos y ayudamos a crecer entre todos.',
          'adaptabilidad': 'Somos ágiles y nos adaptamos a los cambios y desafíos del entorno, encontrando en el aprendizaje continuo y la innovación fuentes de inspiración para responder a la evolución de las necesidades de nuestros clientes y colaboradores.'
        }
        
        setShowFeedback({
          type: 'success',
          message: valueDescriptions[targetId] || '¡Excelente! Has encontrado la respuesta correcta.',
          item: draggedItem
        })
      } else {
        setCompletedMissionVision(prev => new Set([...prev, targetId]))
        setShowFeedback({
          type: 'success',
          message: '¡Excelente! Has encontrado la respuesta correcta.',
          item: draggedItem
        })
      }
    } else {
      setShowFeedback({
        type: 'error',
        message: 'Inténtalo de nuevo. Lee cuidadosamente la pista.',
        item: draggedItem
      })
    }
    
    setDraggedItem(null)
    setTimeout(() => setShowFeedback(null), 4000) // Aumentado el tiempo para leer la descripción
  }

  const handleNextPhase = () => {
    if (completedValues.size === valuesData.length) {
      setGamePhase('mission-vision')
    }
  }

  const renderValuesPhase = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Acertijos */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          <FontAwesomeIcon icon={faLightbulb} className="mr-3 text-yellow-400" />
          Descifra los Acertijos
        </h3>
        {valuesData.map((value) => (
          <motion.div
            key={`riddle-${value.id}`}
            className={`p-6 rounded-xl bg-gradient-to-r ${value.color} text-white shadow-lg
              ${completedValues.has(value.id) ? 'opacity-50' : 'hover:scale-105'}
              transition-all duration-300`}
            whileHover={!completedValues.has(value.id) ? { scale: 1.02 } : {}}
          >
            <div className="flex items-center mb-3">
              <FontAwesomeIcon icon={value.icon} className="text-2xl mr-3" />
              <span className="font-bold text-lg">Acertijo {valuesData.indexOf(value) + 1}</span>
            </div>
            <p className="text-sm leading-relaxed italic">"{value.riddle}"</p>
            {completedValues.has(value.id) && (
              <div className="mt-3 flex items-center text-green-200">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                <span className="text-sm font-medium">¡Resuelto!</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Valores arrastrables */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          <FontAwesomeIcon icon={faHeart} className="mr-3 text-red-400" />
          Arrastra los Valores
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {valuesData.map((value) => (
            !completedValues.has(value.id) && (
              <motion.div
                key={`draggable-${value.id}`}
                draggable
                onDragStart={(e) => handleDragStart(e, value)}
                className={`p-4 rounded-xl bg-gradient-to-r ${value.color} text-white 
                  cursor-move shadow-lg hover:shadow-xl transform hover:scale-105 
                  transition-all duration-300 text-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={value.icon} className="text-3xl mb-2" />
                <p className="font-bold text-lg">{value.name}</p>
              </motion.div>
            )
          ))}
        </div>

        {/* Zonas de drop */}
        <div className="mt-8 space-y-3">
          <h4 className="text-lg font-semibold text-white text-center">Zonas de Respuesta</h4>
          {valuesData.map((value) => (
            <motion.div
              key={`drop-${value.id}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, value.id)}
              className={`p-4 border-2 border-dashed rounded-xl min-h-[80px] 
                flex items-center justify-center transition-all duration-300
                ${completedValues.has(value.id) 
                  ? 'border-green-400 bg-green-400/20' 
                  : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20'
                }`}
            >
              {completedValues.has(value.id) ? (
                <div className="flex items-center text-green-300">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-xl" />
                  <span className="font-bold">{value.name}</span>
                </div>
              ) : (
                <span className="text-white/60">Suelta aquí el valor para el Acertijo {valuesData.indexOf(value) + 1}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMissionVisionPhase = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          <FontAwesomeIcon icon={faBullseye} className="mr-3 text-yellow-400" />
          Misión y Visión Corporativa
        </h3>
        <p className="text-white/80 text-lg">Conecta cada concepto con su definición correspondiente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conceptos arrastrables */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white text-center">Conceptos</h4>
          {missionVisionData.map((item) => (
            !completedMissionVision.has(item.id) && (
              <motion.div
                key={`concept-${item.id}`}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`p-6 rounded-xl bg-gradient-to-r ${item.color} text-white 
                  cursor-move shadow-lg hover:shadow-xl transform hover:scale-105 
                  transition-all duration-300 text-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-4xl mb-3" />
                <p className="font-bold text-2xl">{item.name}</p>
              </motion.div>
            )
          ))}
        </div>

        {/* Definiciones */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white text-center">Definiciones</h4>
          {missionVisionData.map((item) => (
            <motion.div
              key={`definition-${item.id}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item.id)}
              className={`p-6 border-2 border-dashed rounded-xl min-h-[200px] 
                flex flex-col justify-center transition-all duration-300
                ${completedMissionVision.has(item.id) 
                  ? 'border-green-400 bg-green-400/20' 
                  : 'border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20'
                }`}
            >
              {completedMissionVision.has(item.id) ? (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4 text-green-300">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-2xl" />
                    <span className="font-bold text-xl">{item.name}</span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{item.content}</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-white/60 mb-4">Suelta aquí el concepto correcto</p>
                  <p className="text-white text-sm leading-relaxed">{item.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  // Memoizar las posiciones y propiedades de animación de las estrellas
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }))
  }, [])

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Estrellas con efecto de pulsación */}
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => navigate('/map')}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Volver al mapa</span>
            </motion.button>
            <div></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-white/20 mb-6"
          >
            <FontAwesomeIcon icon={faHeart} className="mr-3 text-2xl" />
            <span className="font-bold text-2xl">
              {gamePhase === 'values' ? 'Valores Corporativos' : 'Misión y Visión'}
            </span>
          </motion.div>

          {/* Barra de progreso */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-white/80 text-sm mb-2">
              <span>Progreso del juego</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Contenido del juego */}
        <AnimatePresence mode="wait">
          <motion.div
            key={gamePhase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {gamePhase === 'values' ? renderValuesPhase() : renderMissionVisionPhase()}
          </motion.div>
        </AnimatePresence>

        {/* Botón para cambiar de fase */}
        {gamePhase === 'values' && completedValues.size === valuesData.length && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={handleNextPhase}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full 
                font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 
                transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-3 rotate-180" />
              Continuar a Misión y Visión
            </motion.button>
          </motion.div>
        )}

        {/* Botón de finalización */}
        {gameCompleted && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={() => navigate('/map')}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-full 
                font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 
                transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faTrophy} className="mr-3" />
              ¡Juego Completado! Volver al Mapa
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal de feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`bg-white rounded-2xl p-8 max-w-lg mx-4 text-center shadow-2xl
                ${showFeedback.type === 'success' ? 'border-4 border-green-400' : 'border-4 border-red-400'}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <FontAwesomeIcon 
                icon={showFeedback.type === 'success' ? faCheckCircle : faTimesCircle}
                className={`text-6xl mb-4 ${showFeedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
              />
              <h3 className={`text-2xl font-bold mb-4 ${showFeedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {showFeedback.type === 'success' ? '¡Correcto!' : '¡Inténtalo de nuevo!'}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">{showFeedback.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti de celebración */}
      {showCelebration && <Confetti />}
    </motion.div>
  )
}

export default ValuesGameLevel