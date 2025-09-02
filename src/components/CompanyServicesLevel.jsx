import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { 
  faCalculator, 
  faUsers, 
  faShield, 
  faSearch, 
  faBriefcase,
  faStar,
  faTrophy,
  faArrowRight,
  faClock,
  faCheckCircle,
  faAward,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import CompanyServicesQuiz from './CompanyServicesQuiz'

const CompanyServicesLevel = ({ level, onStartQuiz }) => {
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)

  // Datos de los servicios
  const services = [
    {
      id: 1,
      name: "Outsourcing de Nómina",
      icon: faCalculator,
      color: "blue",
      emoji: "💰",
      description: "Gestión completa y automatizada de nóminas empresariales con cumplimiento legal garantizado.",
      problem: "Las empresas pierden tiempo valioso y recursos en procesos manuales de nómina propensos a errores.",
      solution: "Automatizamos todo el proceso de nómina con tecnología avanzada, garantizando precisión y cumplimiento legal.",
      benefits: [
        { icon: faClock, text: "Ahorro de tiempo del 80%" },
        { icon: faCheckCircle, text: "Precisión del 99.9%" },
        { icon: faShield, text: "Cumplimiento legal garantizado" },
        { icon: faArrowRight, text: "Reducción de costos operativos" }
      ],
      stats: [
        { label: "Empresas atendidas", value: "500+" },
        { label: "Empleados procesados", value: "25,000+" },
        { label: "Precisión", value: "99.9%" },
        { label: "Tiempo ahorrado", value: "80%" }
      ]
    },
    {
      id: 2,
      name: "Outsourcing de RRHH",
      icon: faUsers,
      color: "green",
      emoji: "👥",
      description: "Gestión integral de recursos humanos desde reclutamiento hasta desarrollo de talento.",
      problem: "Los departamentos de RRHH se sobrecargan con tareas administrativas perdiendo foco en el desarrollo estratégico.",
      solution: "Nos encargamos de todas las funciones de RRHH permitiendo que las empresas se enfoquen en su core business.",
      benefits: [
        { icon: faUsers, text: "Gestión integral de talento" },
        { icon: faArrowRight, text: "Mejora en retención del 40%" },
        { icon: faAward, text: "Procesos estandarizados" },
        { icon: faClock, text: "Respuesta en 24 horas" }
      ],
      stats: [
        { label: "Procesos de selección", value: "1,200+" },
        { label: "Tasa de retención", value: "95%" },
        { label: "Tiempo de contratación", value: "15 días" },
        { label: "Satisfacción cliente", value: "98%" }
      ]
    },
    {
      id: 3,
      name: "Employer of Record - EOR",
      icon: faShield,
      color: "purple",
      emoji: "🛡️",
      description: "Solución completa para contratación internacional sin establecer entidades legales locales.",
      problem: "Expandirse internacionalmente requiere establecer entidades legales costosas y complejas en cada país.",
      solution: "Actuamos como empleador legal permitiendo contratación global rápida y sin complicaciones legales.",
      benefits: [
        { icon: faShield, text: "Protección legal completa" },
        { icon: faArrowRight, text: "Expansión en 48 horas" },
        { icon: faCheckCircle, text: "Cumplimiento local garantizado" },
        { icon: faAward, text: "Soporte multipaís" }
      ],
      stats: [
        { label: "Países disponibles", value: "50+" },
        { label: "Tiempo de setup", value: "48h" },
        { label: "Cumplimiento legal", value: "100%" },
        { label: "Empleados globales", value: "5,000+" }
      ]
    },
    {
      id: 4,
      name: "Reclutamiento y Selección",
      icon: faSearch,
      color: "orange",
      emoji: "🔍",
      description: "Proceso especializado de búsqueda y selección de talento con metodologías avanzadas.",
      problem: "Encontrar el talento adecuado toma meses y los procesos tradicionales no garantizan la mejor selección.",
      solution: "Utilizamos metodologías avanzadas y tecnología para identificar y atraer el mejor talento en tiempo récord.",
      benefits: [
        { icon: faSearch, text: "Búsqueda especializada" },
        { icon: faArrowRight, text: "Tiempo reducido 60%" },
        { icon: faAward, text: "Candidatos pre-validados" },
        { icon: faCheckCircle, text: "Garantía de reemplazo" }
      ],
      stats: [
        { label: "Posiciones cubiertas", value: "800+" },
        { label: "Tiempo promedio", value: "21 días" },
        { label: "Tasa de éxito", value: "92%" },
        { label: "Candidatos evaluados", value: "15,000+" }
      ]
    },
    {
      id: 5,
      name: "Outsourcing de Tesorería",
      icon: faBriefcase,
      color: "teal",
      emoji: "💼",
      description: "Gestión financiera y de tesorería empresarial con control total y transparencia.",
      problem: "La gestión de tesorería requiere expertise especializado y sistemas costosos que muchas empresas no poseen.",
      solution: "Ofrecemos gestión completa de tesorería con tecnología de punta y profesionales especializados.",
      benefits: [
        { icon: faBriefcase, text: "Gestión profesional" },
        { icon: faArrowRight, text: "Optimización de flujos" },
        { icon: faShield, text: "Control y transparencia" },
        { icon: faAward, text: "Reportería avanzada" }
      ],
      stats: [
        { label: "Capital gestionado", value: "$50M+" },
        { label: "Empresas atendidas", value: "150+" },
        { label: "Ahorro promedio", value: "25%" },
        { label: "Precisión reportes", value: "100%" }
      ]
    }
  ]

  // Auto-rotación cada 5 segundos
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoRotating, services.length])

  const handleServiceClick = (index) => {
    setActiveService(index)
    setIsAutoRotating(false)
    // Reactivar auto-rotación después de 10 segundos
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }

  const handleBackToServices = () => {
    setShowQuiz(false)
  }

  const handleQuizComplete = () => {
    // Ya no necesitamos hacer nada aquí, el quiz maneja su propia navegación
    // El quiz completará el nivel y navegará al Achievement automáticamente
  }

  const getColorClasses = (color, variant = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-500',
        gradient: 'from-blue-500 to-blue-600'
      },
      green: {
        bg: 'bg-green-500',
        hover: 'hover:bg-green-600',
        text: 'text-green-600',
        border: 'border-green-500',
        gradient: 'from-green-500 to-green-600'
      },
      purple: {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-500',
        gradient: 'from-purple-500 to-purple-600'
      },
      orange: {
        bg: 'bg-orange-500',
        hover: 'hover:bg-orange-600',
        text: 'text-orange-600',
        border: 'border-orange-500',
        gradient: 'from-orange-500 to-orange-600'
      },
      teal: {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-teal-600',
        border: 'border-teal-500',
        gradient: 'from-teal-500 to-teal-600'
      }
    }
    return colors[color] || colors.blue
  }

  const currentService = services[activeService]

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

  if (showQuiz) {
    return (
      <CompanyServicesQuiz 
        onBack={handleBackToServices}
        onComplete={handleQuizComplete}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
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
            <div></div> {/* Spacer para centrar el título */}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Servicios Empresariales
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformamos la gestión empresarial con soluciones innovadoras que impulsan el crecimiento y la eficiencia de tu organización
          </p>
        </motion.div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sidebar con cards de servicios */}
          <div className="lg:col-span-1 space-y-4">
            {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color)
            const isActive = index === activeService

            return (
              <motion.div
                key={service.id}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? `${colorClasses.bg} shadow-2xl scale-105` 
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                }`}
                onClick={() => handleServiceClick(index)}
                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : colorClasses.bg}`}>
                    <FontAwesomeIcon 
                      icon={service.icon} 
                      className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white'}`} 
                    />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-200'}`}>
                      {service.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
          </div>

          {/* Panel detallado principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                {/* Header del servicio */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-6xl">{currentService.emoji}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {currentService.name}
                    </h2>
                    <p className="text-gray-300 text-lg">
                      {currentService.description}
                    </p>
                  </div>
                </div>

                {/* Problema/Solución */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-red-400 font-semibold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        Problema
                      </h3>
                      <p className="text-gray-300">{currentService.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Solución
                      </h3>
                      <p className="text-gray-300">{currentService.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Beneficios clave */}
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-yellow-400 mr-2" />
                    Beneficios Clave
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentService.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <FontAwesomeIcon icon={benefit.icon} className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-200">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-4">Estadísticas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentService.stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-white/10 rounded-lg">
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={handleStartQuiz}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faTrophy} className="w-6 h-6" />
                  <span>Iniciar Simulador de Conocimientos</span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyServicesLevel