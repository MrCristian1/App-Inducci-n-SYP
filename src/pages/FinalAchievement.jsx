import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faArrowLeft, faRedo, faTrophy, faGraduationCap, faMedal } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../context/AppContext';
import Confetti from '../components/Confetti';
import logo from '../../img/syp.png';

const FinalAchievement = () => {
  const navigate = useNavigate();
  const { allLevelsCompleted, finalAchievement, resetProgress, companyConfig, completedLevels } = useAppContext();
  
  useEffect(() => {
    // Verificar si todos los niveles están completados
    if (!allLevelsCompleted) {
      navigate('/map');
      return;
    }
    
    // Asegurarse de que la navegación funcione correctamente
    // después de completar todos los niveles
    console.log('Todos los niveles completados:', completedLevels);
  }, [allLevelsCompleted, navigate, completedLevels]);
  
  const handleBackToMap = () => {
    navigate('/map');
  };
  
  const handleRestart = () => {
    resetProgress();
    navigate('/');
  };

  // Iconos para la animación
  const icons = [faTrophy, faGraduationCap, faMedal, faAward];
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-primary to-secondary p-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className={`absolute ${index % 2 === 0 ? 'text-primary-light' : 'text-secondary-light'}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -100, 
                opacity: 0.7,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: [0.7, 0.8, 0.7, 0.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 15 + 10, 
                repeat: Infinity, 
                delay: Math.random() * 5,
                ease: "linear"
              }}
              style={{ fontSize: `${Math.random() * 40 + 20}px` }}
            >
              <FontAwesomeIcon icon={icon} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <Confetti count={200} />
      
      <motion.div 
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 text-center relative z-10 border-4 border-primary"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {/* Logo */}
        <motion.div 
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </motion.div>

        {/* Mensaje de felicitación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gradient-to-r from-primary-light to-secondary-light p-6 rounded-xl shadow-md"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ¡Felicidades!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-6">
            Has completado tu inducción
          </h2>
          <p className="text-lg text-primary-dark mb-8">
            Has obtenido el logro <span className="font-bold text-secondary">{finalAchievement?.name || "Logro Final"}</span>
          </p>
          <p className="text-primary mb-12">{finalAchievement?.description || "Has completado con éxito todo el recorrido de inducción. ¡Ahora estás listo para formar parte de nuestro equipo!"}</p>
        </motion.div>
        
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.button
            className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            onClick={handleBackToMap}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
            Volver al Mapa
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            onClick={handleRestart}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faRedo} className="text-xl" />
            Reiniciar Inducción
          </motion.button>
        </motion.div>
        
        <motion.div
          className="mt-10 pt-6 border-t border-gray-100 text-primary-dark text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FinalAchievement;