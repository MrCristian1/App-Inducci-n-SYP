import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faExclamationTriangle, faTemperatureHigh, faBrain, faVirus, faUserShield, faChevronRight, faCalendarDay, faArrowLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AccidentQuiz from './AccidentQuiz'; // Asegúrate de importar el componente AccidentQuiz

const riskCards = [
  {
    title: 'Riesgos Biomecánicos',
    icon: faDumbbell,
    color: 'bg-blue-500',
    description: 'Movimientos repetitivos, posturas forzadas, manipulación de cargas.'
  },
  {
    title: 'Condiciones de Seguridad',
    icon: faExclamationTriangle,
    color: 'bg-yellow-500',
    description: 'Herramientas, equipos, instalaciones y procedimientos inseguros.'
  },
  {
    title: 'Riesgos Físicos',
    icon: faTemperatureHigh,
    color: 'bg-red-500',
    description: 'Ruido, temperatura, radiación, vibración.'
  },
  {
    title: 'Riesgo Psicosocial',
    icon: faBrain,
    color: 'bg-purple-500',
    description: 'Estrés, acoso laboral, carga mental.'
  },
];

const AccidentLevel = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  // Animación de estrellas como en el nivel 1
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  // Animación para el botón de quiz
  const quizButtonVariants = {
    initial: { scale: 1, boxShadow: '0 0 0px #fbbf24' },
    animate: {
      scale: [1, 1.08, 1],
      boxShadow: [
        '0 0 0px #fbbf24',
        '0 0 16px #fbbf24',
        '0 0 0px #fbbf24'
      ],
      transition: { duration: 1.5, repeat: Infinity }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-[Segoe_UI] text-gray-100">
      {/* Fondo fijo y estrellas */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
      {/* Botón volver al mapa */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors font-semibold text-lg cursor-pointer focus:outline-none px-4 py-2 rounded-xl"
          style={{ minHeight: '48px', lineHeight: '1.5' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Volver al mapa</span>
        </button>
      </div>
      {/* Botón animado iniciar quiz */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={quizButtonVariants}
        {...{className: "absolute top-8 right-8 z-20"}}
      >
        <button
          onClick={() => setShowQuiz(true)}
          className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transition-colors text-lg animate-pulse"
          style={{ minHeight: '48px' }}
        >
          <FontAwesomeIcon icon={faPlayCircle} className="text-xl" />
          <span>Iniciar Quiz</span>
        </button>
      </motion.div>
      {/* Contenido principal o quiz */}
      {!showQuiz ? (
        <div className="relative z-10 flex flex-col items-center justify-start">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            {...{className: "w-full py-10 px-4 text-center"}}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">Guía de Seguridad Laboral</h1>
            <h2 className="text-xl md:text-2xl font-medium text-blue-300 mb-6">Identificación de riesgos y acciones ante accidentes de trabajo</h2>
          </motion.header>
          {/* Riesgos */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            {...{className: "w-full max-w-4xl px-4 mb-12"}}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Identificación de Riesgos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {riskCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  {...{className: `flex items-center gap-4 p-6 rounded-2xl shadow-xl border border-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${card.color}`}}
                  style={{ minHeight: '120px' }}
                >
                  <FontAwesomeIcon icon={card.icon} className="text-4xl md:text-5xl text-white drop-shadow-lg" />
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1">{card.title}</h4>
                    <p className="text-sm md:text-base text-white/80">{card.description}</p>
                  </div>
                </motion.div>
              ))}
              {/* Riesgos Biológicos ocupa toda la fila */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                {...{className: "col-span-1 md:col-span-2 flex items-center gap-4 p-6 rounded-2xl shadow-xl border border-white/10 bg-green-500 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"}}
                style={{ minHeight: '120px' }}
              >
                <FontAwesomeIcon icon={faVirus} className="text-4xl md:text-5xl text-white drop-shadow-lg" />
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-1">Riesgos Biológicos</h4>
                  <p className="text-sm md:text-base text-white/80">Virus, bacterias, hongos y otros agentes biológicos.</p>
                </div>
              </motion.div>
            </div>
          </motion.section>
          {/* Accidente de Trabajo */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            {...{className: "w-full max-w-3xl px-4 mb-10"}}
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-400 flex items-center gap-2">
              <FontAwesomeIcon icon={faUserShield} className="text-orange-400 text-2xl" /> Accidente de Trabajo
            </h3>
            <p className="text-lg text-white/90 mb-6">Lesión generada sobre el trabajador por causa u ocasión del trabajo</p>
            <div className="bg-white/10 rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-white mb-4">¿QUÉ TENGO QUE HACER SI SUFRO UN ACCIDENTE DE TRABAJO?</h4>
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  {...{className: "flex items-center gap-4"}}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">1</div>
                  <span className="text-white text-base md:text-lg font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserShield} className="text-blue-300 text-xl" /> Reportar al jefe inmediato o encargado del SG-SST
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  {...{className: "flex items-center gap-4"}}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">2</div>
                  <span className="text-white text-base md:text-lg font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faChevronRight} className="text-purple-300 text-xl" /> Dirigirse al centro de atención médica más cercano o el indicado por la ARL
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  {...{className: "flex items-center gap-4"}}
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">3</div>
                  <span className="text-white text-base md:text-lg font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDay} className="text-yellow-300 text-xl" /> Brindar todos los detalles de lo ocurrido para realizar el reporte
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.section>
          {/* Mensaje final */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            {...{className: "w-full max-w-2xl px-4 mb-16"}}
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <img src={'/img/Axa.png'} alt="Axa" className="w-96 max-w-full h-auto mb-4 rounded-xl shadow-lg object-contain bg-white p-4 border border-gray-200" />
            </div>
            <div className="bg-blue-600 rounded-2xl shadow-xl p-6 flex items-center justify-center">
              <span className="text-white text-lg md:text-xl font-bold text-center">
                REPORTE DE ACCIDENTES MÁXIMO 2 DÍAS HÁBILES A LA OCURRENCIA DEL EVENTO
              </span>
            </div>
          </motion.section>
        </div>
      ) : (
        <AccidentQuiz onClose={() => setShowQuiz(false)} />
      )}
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .font-[Segoe_UI] { font-family: 'Segoe UI', Arial, sans-serif; }
        }
      `}</style>
    </div>
  );
};

export default AccidentLevel;
