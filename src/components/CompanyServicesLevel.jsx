import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faDna, faLightbulb, faShieldAlt, faRocket, faLink, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CompanyServicesQuiz from './CompanyServicesQuiz';

const adnSections = [
  {
    title: 'Identidad Corporativa',
    icon: faDna,
    color: 'from-blue-600 to-blue-800',
    description: 'Aquí se explica el "para qué existimos" y el rumbo que seguimos.',
    content: [
      {
        label: 'Visión (2030)',
        icon: '🌟',
        text: 'Lograr la consolidación de soluciones de Outsourcing en los mercados actuales, mejorando el desempeño de los clientes, con una cultura innovadora que impulse bienestar y crecimiento de los colaboradores.',
      },
      {
        label: 'Misión',
        icon: '🎯',
        text: 'Ayudar a los clientes a mejorar su desempeño mediante diseño y acompañamiento en la implementación de soluciones personalizadas de Back Office, con tecnología e innovación.',
      },
      {
        label: 'Propósito',
        icon: '💡',
        text: 'Brindar tranquilidad para todos con soluciones tecnológicamente humanas, trabajando con integridad, confiabilidad, empatía y adaptabilidad para crear experiencias positivas.',
      },
    ],
  },
  {
    title: 'Valores Fundamentales',
    icon: faShieldAlt,
    color: 'from-green-600 to-green-800',
    description: 'Son el ADN de la organización, las reglas del juego.',
    content: [
      { label: 'Integridad', icon: '🤝', text: 'Honestidad, transparencia y ética en todo momento.' },
      { label: 'Adaptabilidad', icon: '🔄', text: 'Agilidad y aprendizaje continuo frente a cambios.' },
      { label: 'Empatía', icon: '💖', text: 'Comprender y respetar las necesidades de clientes y colaboradores.' },
      { label: 'Confiabilidad', icon: '🛡️', text: 'Responsabilidad, compromiso y cumplimiento de acuerdos.' },
    ],
  },
  {
    title: 'Diferenciadores',
    icon: faRocket,
    color: 'from-amber-600 to-amber-800',
    description: 'Lo que hace única a la empresa frente a la competencia.',
    content: [
      { label: 'Acompañamiento', icon: '👥', text: 'Interacción permanente con clientes para superar expectativas.' },
      { label: 'Adaptabilidad', icon: '🔄', text: 'Respuesta efectiva a cambios e imprevistos.' },
      { label: 'Personalización', icon: '🛠️', text: 'Diseño e implementación de soluciones a la medida.' },
    ],
  },
  {
    title: 'Competencias S&P',
    icon: faLightbulb,
    color: 'from-purple-600 to-purple-800',
    description: 'Cómo se aterrizan los valores en comportamientos observables.',
    content: [
      { label: 'Integridad → Actúa con integridad', icon: '🤝', text: 'Capacidad para mantenerse dentro de normas éticas y morales; comunicación abierta y honesta incluso en situaciones difíciles.' },
      { label: 'Confiabilidad → Demuestra competencia', icon: '🛡️', text: 'Responsabilidad en procesos y relaciones, generando confianza.' },
      { label: 'Calidad en el trabajo', icon: '🏅', text: 'Conocimiento profundo de las áreas a cargo, generando credibilidad.' },
      { label: 'Empatía → Orientación al cliente', icon: '💖', text: 'Comprender y satisfacer necesidades, resolviendo problemas con actitud positiva y proactiva.' },
      { label: 'Adaptabilidad → Adaptación al cambio', icon: '🔄', text: 'Ajustarse a contextos dinámicos, modificando conductas frente a dificultades o nueva información.' },
    ],
  },
  {
    title: 'Competencias Transversales',
    icon: faLink,
    color: 'from-teal-600 to-teal-800',
    description: 'Atributos que se esperan en todos los roles dentro de la empresa.',
    content: [
      { label: 'Actuar con integridad', icon: '🤝' },
      { label: 'Mantener calidad en el trabajo', icon: '🏅' },
      { label: 'Practicar la empatía', icon: '💖' },
      { label: 'Adaptarse al cambio', icon: '🔄' },
    ],
  },
  {
    title: 'Competencias según nivel',
    icon: faChartLine,
    color: 'from-pink-600 to-pink-800',
    description: 'Lo que se espera según el nivel de responsabilidad en la organización.',
    content: [
      { label: 'Estratégico', icon: '🧠', text: 'Desarrollo de equipos de alto desempeño, pensamiento estratégico.' },
      { label: 'Táctico', icon: '🗂️', text: 'Liderazgo, pensamiento conceptual y analítico.' },
      { label: 'Operativo', icon: '⚙️', text: 'Orientación al logro, capacidad de aprendizaje, trabajo colaborativo.' },
    ],
  },
];

import React, { useState, useMemo, useRef } from 'react';
// ...existing code...
const CompanyServicesLevel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const isFirstRender = useRef(true);

  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  const handleBackToServices = () => setShowQuiz(false);
  const handleQuizComplete = () => {};

  if (showQuiz) {
    return <CompanyServicesQuiz onBack={handleBackToServices} onComplete={handleQuizComplete} />;
  }

  const section = adnSections[activeSection];

  // Detectar si es el primer render
  let mainAnimProps;
  if (isFirstRender.current) {
    mainAnimProps = {
      initial: { opacity: 0, scale: 0.95, y: 30 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -30 },
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.7 }
    };
    isFirstRender.current = false;
  } else {
    mainAnimProps = {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
      transition: { duration: 0.35, ease: 'easeOut' }
    };
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Estrellas animadas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/map')}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors px-4 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Volver al mapa</span>
            </motion.button>
            
            <motion.div 
              className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faDna} className="text-purple-300" />
              <span className="text-white font-medium">ADN Corporativo</span>
            </motion.div>
            
            <div className="w-24"></div> {/* Espaciador para equilibrar */}
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Descubre Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ADN Corporativo</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Transformamos la gestión empresarial con soluciones innovadoras que impulsan el crecimiento y la eficiencia de tu organización
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.header>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Navegación lateral */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
              {adnSections.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.12 }}
                  className={`w-full p-4 rounded-xl text-left font-semibold flex items-center gap-3 transition-all ${
                    activeSection === idx
                      ? `text-white shadow-lg bg-gradient-to-r ${item.color}`
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setActiveSection(idx)}
                >
                  <div className={`p-2 rounded-lg ${activeSection === idx ? 'bg-white/20' : 'bg-black/20'}`}>
                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  </div>
                  <span>{item.title}</span>
                </motion.button>
              ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQuiz(true)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faStar} />
              <span>Iniciar Trivia Corporativa</span>
            </motion.button>
          </motion.div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  {...mainAnimProps}
                  className="w-full rounded-2xl p-8 min-h-[520px] flex flex-col bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg border border-white/10 shadow-2xl"
                >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                    <FontAwesomeIcon icon={section.icon} className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl text-white">{section.title}</h2>
                    <p className="text-gray-300">{section.description}</p>
                  </div>
                </div>
                
                {section.title === 'Competencias Transversales' ? (
                  <ul className="flex flex-col gap-3 mt-4">
                    {section.content.map((c, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-white text-lg bg-white/5 rounded-lg px-4 py-2"
                      >
                        <span className="text-xl">{c.icon}</span>
                        <span>{c.label}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    {section.content.map((c, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{c.icon}</span>
                          <span className="font-semibold text-white text-lg">{c.label}</span>
                        </div>
                        {c.text && <p className="text-gray-300 mt-2">{c.text}</p>}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyServicesLevel;