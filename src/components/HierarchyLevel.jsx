import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSitemap, 
  faGamepad, 
  faArrowRight,
  faStar,
  faCheck,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import OrganizationalChart from './OrganizationalChart'
import HierarchyDragDrop from './HierarchyDragDrop'

const HierarchyLevel = ({ onComplete }) => {
  const navigate = useNavigate()
  const [currentPhase, setCurrentPhase] = useState('chart') // 'chart' o 'challenge'
  const [challengeCompleted, setChallengeCompleted] = useState(false)

  // Generar estrellas animadas para el fondo
  const generateStars = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-70"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))
  }

  const handleChallengeComplete = () => {
    setChallengeCompleted(true)
    setTimeout(() => {
      onComplete && onComplete()
    }, 3000)
  }

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase)
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Estrellas animadas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {generateStars()}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                onClick={() => navigate('/map')}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors px-4 py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Volver al mapa</span>
              </button>
            </motion.div>
            <div className="flex items-center justify-center space-x-4">
              <FontAwesomeIcon icon={faSitemap} className="text-4xl text-white" />
              <h1 className="text-4xl font-bold text-white">
                Jerarquía y Estructura Organizacional
              </h1>
            </div>
            <div className="w-24"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mt-4">
            Explora nuestra estructura organizacional de forma interactiva y pon a prueba tus conocimientos
          </p>
        </motion.div>

        {/* Navegación de fases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-2 flex space-x-2">
            <button
              onClick={() => handlePhaseChange('chart')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                currentPhase === 'chart'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <FontAwesomeIcon icon={faSitemap} />
              <span>Organigrama Interactivo</span>
            </button>
            
            <button
              onClick={() => handlePhaseChange('challenge')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                currentPhase === 'challenge'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <FontAwesomeIcon icon={faGamepad} />
              <span>Desafío Drag & Drop</span>
              {challengeCompleted && (
                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Contenido de las fases */}
        <AnimatePresence mode="wait">
          {currentPhase === 'chart' && (
            <motion.div
              key="chart"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <OrganizationalChart />
              </div>
              
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handlePhaseChange('challenge')}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                    Continuar al Desafío
                  </button>
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentPhase === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <HierarchyDragDrop onComplete={handleChallengeComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de progreso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: '1rem', padding: '1rem' }}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${currentPhase === 'chart' ? 'bg-purple-400' : 'bg-gray-400'}`} />
            <div className={`w-3 h-3 rounded-full ${currentPhase === 'challenge' ? 'bg-purple-400' : 'bg-gray-400'}`} />
            <div className={`w-3 h-3 rounded-full ${challengeCompleted ? 'bg-green-400' : 'bg-gray-400'}`} />
          </div>
          <div className="text-white text-xs mt-2 text-center">
            {currentPhase === 'chart' ? 'Explorando' : challengeCompleted ? 'Completado' : 'Desafío'}
          </div>
        </motion.div>

        {/* Mensaje de finalización */}
        <AnimatePresence>
          {challengeCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                style={{ background: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '28rem', width: '100%', margin: '0 1rem', textAlign: 'center' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block', marginBottom: '1rem' }}
                >
                  <FontAwesomeIcon icon={faStar} className="text-6xl text-yellow-500" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ¡Nivel Completado!
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Has dominado la estructura organizacional de Solutions and Payroll. 
                  ¡Excelente trabajo!
                </p>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-4">
                  <p className="font-semibold">
                    Preparándose para continuar...
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HierarchyLevel