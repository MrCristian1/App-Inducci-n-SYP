import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faAward, faScroll, faBriefcase, faGem, faUsersCog, faSitemap } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../context/AppContext'
import Confetti from '../components/Confetti'

const Achievement = () => {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const { levelsData, isLevelUnlocked, completedLevels, completeLevel } = useAppContext()
  
  const levelIdNum = parseInt(levelId)
  const level = levelsData.find(l => l.id === levelIdNum)
  
  // Estado para las estrellas de fondo (solo para nivel 1)
  const [stars, setStars] = useState([])
  
  useEffect(() => {
    // Verificar si el nivel existe, está desbloqueado y completado
    if (!level || !isLevelUnlocked(levelIdNum) || !completedLevels.includes(levelIdNum)) {
      navigate('/map')
      return
    }
    
    // Asegurarse de que el nivel esté marcado como completado
    if (!completedLevels.includes(levelIdNum)) {
      completeLevel(levelIdNum)
    }
    
    // Generar estrellas para el nivel 1, 2, 3 y 4 (políticas, funciones empresariales, valores y jerarquía)
    if (levelIdNum === 1 || levelIdNum === 2 || levelIdNum === 3 || levelIdNum === 4) {
      const generatedStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
      setStars(generatedStars)
    }
  }, [level, levelIdNum, isLevelUnlocked, completedLevels, navigate, completeLevel])
  
  const handleContinue = () => {
    navigate('/map')
  }
  
  // Mapa de iconos para los logros
  const iconMap = {
    'scroll': faScroll,
    'briefcase': faBriefcase,
    'gem': faGem,
    'users-cog': faUsersCog,
    'sitemap': faSitemap,
    'award': faAward
  }
  
  if (!level) return null
  
  // Si es el nivel 1 (políticas), usar el estilo especial
  if (levelIdNum === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
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

        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-8xl text-yellow-400 mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={iconMap[level.achievement.icon] || faScroll} />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">¡Felicitaciones!</h2>
          <p className="text-xl text-white/80 mb-2">Has completado el nivel {level.title}</p>
          
          {/* Información del achievement */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{level.achievement.name}</h3>
            <p className="text-white/80">{level.achievement.description}</p>
          </motion.div>
          
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 border border-green-400/50"
            onClick={handleContinue}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Continuar al siguiente nivel
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // Si es el nivel 2 (funciones empresariales), usar el mismo estilo que el nivel 1
  if (levelIdNum === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
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

        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-8xl text-yellow-400 mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={iconMap[level.achievement.icon] || faBriefcase} />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">¡Felicitaciones!</h2>
          <p className="text-xl text-white/80 mb-2">Has completado el nivel {level.title}</p>
          
          {/* Información del achievement */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{level.achievement.name}</h3>
            <p className="text-white/80">{level.achievement.description}</p>
          </motion.div>
          
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 border border-green-400/50"
            onClick={handleContinue}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Continuar al siguiente nivel
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // Si es el nivel 3 (valores, misión y visión), usar el mismo estilo espacial
  if (levelIdNum === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
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

        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-8xl text-yellow-400 mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={iconMap[level.achievement.icon] || faGem} />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">¡Felicitaciones!</h2>
          <p className="text-xl text-white/80 mb-2">Has completado el nivel {level.title}</p>
          
          {/* Información del achievement */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{level.achievement.name}</h3>
            <p className="text-white/80">{level.achievement.description}</p>
          </motion.div>
          
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 border border-green-400/50"
            onClick={handleContinue}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Continuar al siguiente nivel
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // Si es el nivel 4 (jerarquía y estructura organizacional), usar el mismo estilo espacial
  if (levelIdNum === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
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

        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-8xl text-yellow-400 mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={iconMap[level.achievement.icon] || faSitemap} />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">¡Felicitaciones!</h2>
          <p className="text-xl text-white/80 mb-2">Has completado el nivel {level.title}</p>
          
          {/* Información del achievement */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{level.achievement.name}</h3>
            <p className="text-white/80">{level.achievement.description}</p>
          </motion.div>
          
          <motion.button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 border border-green-400/50"
            onClick={handleContinue}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Continuar al siguiente nivel
          </motion.button>
        </motion.div>
      </div>
    )
  }
  
  // Para otros niveles, usar el estilo original
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-light p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti />
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <motion.div 
          className="badge mx-auto mb-6"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <FontAwesomeIcon 
            icon={iconMap[level.achievement.icon] || faAward} 
            className="text-primary"
          />
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-bold text-secondary mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ¡Felicidades!
        </motion.h2>
        
        <motion.p 
          className="text-xl text-accent mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Has completado el nivel <span className="font-bold">{level.title}</span>
        </motion.p>
        
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-bold text-lg text-secondary mb-2">{level.achievement.name}</h3>
          <p className="text-gray-700">{level.achievement.description}</p>
        </motion.div>
        
        <motion.button
          className="btn-primary w-full"
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Continuar <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Achievement