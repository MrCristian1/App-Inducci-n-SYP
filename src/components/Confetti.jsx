import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Confetti = ({ count = 100 }) => {
  const [confetti, setConfetti] = useState([])
  
  useEffect(() => {
    // Generar piezas de confetti
    const pieces = []
    // Colores para el confeti (acorde al estilo visual)
    const colors = [
      "#f7c948", // Dorado
      "#fffbe6", // Blanco cálido
      "#a78bfa", // Violeta claro
      "#7c3aed", // Violeta intenso
      "#6366f1", // Azul eléctrico
      "#e0e7ff", // Azul pastel
      "#f3f4f6", // Blanco translúcido
      "rgba(255,255,255,0.3)", // Blanco translúcido
      "rgba(247,201,72,0.5)", // Dorado translúcido
      "rgba(124,58,237,0.4)", // Violeta translúcido
    ]
    
    for (let i = 0; i < count; i++) {
      // Formas variadas
      const shapes = ['circle', 'square', 'ribbon', 'oval']
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      pieces.push({
        id: i,
        x: Math.random() * 100, // Posición horizontal (0-100%)
        size: Math.random() * 1.2 + 0.6, // Tamaño más grande (0.6-1.8)
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.7, // Retraso en la animación
        duration: Math.random() * 2.5 + 1.5, // Animación más suave (1.5-4s)
        rotation: Math.random() * 360, // Rotación inicial
        blur: Math.random() > 0.5 ? 'blur-md' : '',
        opacity: Math.random() * 0.5 + 0.5, // Opacidad entre 0.5 y 1
        shape
      })
    }
    
    setConfetti(pieces)
  }, [count])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {confetti.map((piece) => {
        let style = {
          left: `${piece.x}%`,
          width: `${piece.size * 16}px`,
          height: `${piece.size * (piece.shape === 'ribbon' ? 4 : 16)}px`,
          backgroundColor: piece.color,
          borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'oval' ? '50%/30%' : '0',
          transform: `rotate(${piece.rotation}deg)`,
          zIndex: 10,
          filter: piece.blur,
          opacity: piece.opacity
        }
        if (piece.shape === 'ribbon') {
          style.borderRadius = '8px';
          style.height = `${piece.size * 4}px`;
        }
        return (
          <motion.div
            key={piece.id}
            className="absolute top-0"
            style={style}
            initial={{ y: '-10%', opacity: piece.opacity }}
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
        )
      })}
    </div>
  )
}

export default Confetti