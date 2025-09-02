import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Confetti = ({ count = 100 }) => {
  const [confetti, setConfetti] = useState([])
  
  useEffect(() => {
    // Generar piezas de confetti
    const pieces = []
    // Colores para el confeti (tonos rojizos y azules)
    const colors = [
      "#f44336", // Rojo
      "#e53935", // Rojo oscuro
      "#d32f2f", // Rojo más oscuro
      "#c62828", // Rojo aún más oscuro
      "#b71c1c", // Rojo muy oscuro
      "#ef5350", // Rojo claro
      "#e57373", // Rojo más claro
      "#ef9a9a", // Rojo muy claro
      "#2196f3", // Azul
      "#1e88e5", // Azul oscuro
      "#1976d2", // Azul más oscuro
      "#1565c0", // Azul aún más oscuro
      "#0d47a1", // Azul muy oscuro
      "#42a5f5", // Azul claro
      "#64b5f6", // Azul más claro
      "#90caf9", // Azul muy claro
    ]
    
    for (let i = 0; i < count; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // Posición horizontal (0-100%)
        size: Math.random() * 0.8 + 0.2, // Tamaño (0.2-1)
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5, // Retraso en la animación
        duration: Math.random() * 2 + 1, // Duración de la animación
        rotation: Math.random() * 360, // Rotación inicial
        shape: Math.random() > 0.5 ? 'circle' : 'square' // Forma
      })
    }
    
    setConfetti(pieces)
  }, [count])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size * 12}px`,
            height: `${piece.size * 12}px`,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 'circle' ? '50%' : '0',
            transform: `rotate(${piece.rotation}deg)`,
            zIndex: 10
          }}
          initial={{ y: '-10%', opacity: 1 }}
          animate={{ 
            y: '110%', 
            opacity: 0,
            rotate: `${piece.rotation + 360 * 2}deg`
          }}
          transition={{ 
            duration: piece.duration, 
            delay: piece.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}

export default Confetti