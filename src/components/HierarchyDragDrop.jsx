import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGripVertical, 
  faCheckCircle, 
  faTimesCircle, 
  faTrophy, 
  faRedo 
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const HierarchyDragDrop = ({ onComplete }) => {
  const navigate = useNavigate()
  const { completeLevel } = useAppContext()
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [challengeResults, setChallengeResults] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  const challenges = [
    {
      id: 'administrativa',
      title: 'Área Administrativa',
      director: {
        id: 'dir-admin',
        name: 'Dirección Administrativa',
        color: 'from-blue-500 to-blue-700'
      },
      positions: [
        { id: 'analista-talento', name: 'Analista de Talento Humano', level: 3, correctParent: 'ger-talento' },
        { id: 'coord-capacitacion', name: 'Coordinador de Capacitación', level: 3, correctParent: 'ger-talento' },
        { id: 'contador', name: 'Contador', level: 3, correctParent: 'ger-financiera' },
        { id: 'analista-financiero', name: 'Analista Financiero', level: 3, correctParent: 'ger-financiera' },
        { id: 'sin-subordinados-juridica', name: 'Sin subordinados directos', level: 3, correctParent: 'coord-juridica', isSpecial: true }
      ],
      structure: {
        'dir-admin': {
          name: 'Dirección Administrativa',
          children: ['ger-talento', 'ger-financiera', 'coord-juridica'],
          level: 1
        },
        'ger-talento': {
          name: 'Gerencia de Talento Humano',
          children: ['analista-talento', 'coord-capacitacion'],
          level: 2
        },
        'ger-financiera': {
          name: 'Gerencia Financiera',
          children: ['contador', 'analista-financiero'],
          level: 2
        },
        'coord-juridica': {
          name: 'Coordinación Jurídica',
          children: [],
          level: 2
        }
      }
    },
    {
      id: 'comercial',
      title: 'Área Comercial',
      director: {
        id: 'dir-comercial',
        name: 'Dirección Comercial',
        color: 'from-orange-500 to-orange-700'
      },
      positions: [
        { id: 'ejecutivo-ventas', name: 'Ejecutivo de Ventas', level: 3, correctParent: 'ger-ventas' },
        { id: 'analista-ventas', name: 'Analista de Ventas', level: 3, correctParent: 'ger-ventas' },
        { id: 'especialista-digital', name: 'Especialista Digital', level: 3, correctParent: 'ger-marketing' },
        { id: 'analista-marca', name: 'Analista de Marca', level: 3, correctParent: 'ger-marketing' },
        { id: 'analista-experiencia', name: 'Analista de Experiencia del Cliente', level: 3, correctParent: 'ger-experiencia' }
      ],
      structure: {
        'dir-comercial': {
          name: 'Dirección Comercial',
          children: ['ger-ventas', 'ger-marketing', 'ger-experiencia'],
          level: 1
        },
        'ger-ventas': {
          name: 'Gerencia de Ventas',
          children: ['ejecutivo-ventas', 'analista-ventas'],
          level: 2
        },
        'ger-marketing': {
          name: 'Gerencia de Marketing',
          children: ['especialista-digital', 'analista-marca'],
          level: 2
        },
        'ger-experiencia': {
          name: 'Gerencia de Experiencia del Cliente',
          children: ['analista-experiencia'],
          level: 2
        }
      }
    },
    {
      id: 'operaciones',
      title: 'Área de Operaciones',
      director: {
        id: 'dir-operaciones',
        name: 'Dirección de Operaciones',
        color: 'from-indigo-500 to-indigo-700'
      },
      positions: [
        { id: 'supervisor-produccion', name: 'Supervisor de Producción', level: 3, correctParent: 'ger-produccion' },
        { id: 'tecnico-mantenimiento', name: 'Técnico de Mantenimiento', level: 3, correctParent: 'ger-produccion' },
        { id: 'supervisor-almacen', name: 'Supervisor de Almacén', level: 3, correctParent: 'coord-logistica' },
        { id: 'sin-subordinados-calidad', name: 'Sin subordinados directos', level: 3, correctParent: 'analista-calidad', isSpecial: true }
      ],
      structure: {
        'dir-operaciones': {
          name: 'Dirección de Operaciones',
          children: ['ger-produccion', 'coord-logistica', 'analista-calidad'],
          level: 1
        },
        'ger-produccion': {
          name: 'Gerencia de Producción',
          children: ['supervisor-produccion', 'tecnico-mantenimiento'],
          level: 2
        },
        'coord-logistica': {
          name: 'Coordinación de Logística',
          children: ['supervisor-almacen'],
          level: 2
        },
        'analista-calidad': {
          name: 'Analista de Calidad',
          children: [],
          level: 2
        }
      }
    }
  ]

  const [challengeStates, setChallengeStates] = useState(
    challenges.map(challenge => ({
      id: challenge.id,
      availablePositions: [...challenge.positions],
      placedPositions: {},
      isComplete: false
    }))
  )

  const currentChallengeData = challenges[currentChallenge]
  const currentState = challengeStates[currentChallenge]

  const handleDragStart = (e, position) => {
    setDraggedItem(position)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    
    if (!draggedItem) return

    const newStates = [...challengeStates]
    const currentStateIndex = currentChallenge
    
    // Remover de posiciones disponibles
    newStates[currentStateIndex].availablePositions = 
      newStates[currentStateIndex].availablePositions.filter(p => p.id !== draggedItem.id)
    
    // Agregar a posiciones colocadas
    if (!newStates[currentStateIndex].placedPositions[targetId]) {
      newStates[currentStateIndex].placedPositions[targetId] = []
    }
    newStates[currentStateIndex].placedPositions[targetId].push(draggedItem)
    
    setChallengeStates(newStates)
    setDraggedItem(null)
  }

  const handleRemovePosition = (positionId, parentId) => {
    const newStates = [...challengeStates]
    const currentStateIndex = currentChallenge
    
    // Encontrar la posición en las colocadas
    const position = newStates[currentStateIndex].placedPositions[parentId]
      .find(p => p.id === positionId)
    
    if (position) {
      // Remover de posiciones colocadas
      newStates[currentStateIndex].placedPositions[parentId] = 
        newStates[currentStateIndex].placedPositions[parentId].filter(p => p.id !== positionId)
      
      // Agregar de vuelta a disponibles
      newStates[currentStateIndex].availablePositions.push(position)
      
      setChallengeStates(newStates)
    }
  }

  const checkChallenge = () => {
    const currentStateData = challengeStates[currentChallenge]
    let correct = 0
    let total = currentChallengeData.positions.length

    // Verificar cada posición colocada
    Object.entries(currentStateData.placedPositions).forEach(([parentId, positions]) => {
      positions.forEach(position => {
        if (position.correctParent === parentId) {
          correct++
        }
      })
    })

    const isComplete = correct === total
    const result = {
      challengeId: currentChallengeData.id,
      correct,
      total,
      isComplete,
      percentage: Math.round((correct / total) * 100)
    }

    setChallengeResults(prev => [...prev, result])

    if (isComplete) {
      setCompletedChallenges(prev => [...prev, currentChallenge])
      
      if (currentChallenge < challenges.length - 1) {
        // Mostrar modal de éxito y luego cambiar al siguiente desafío
        setShowResults(true)
        setTimeout(() => {
          setShowResults(false)
          setCurrentChallenge(currentChallenge + 1)
        }, 2500)
      } else {
        // Todos los desafíos completados - mostrar solo el modal con botón de reclamar insignia
        setShowResults(true)
      }
    } else {
      // Solo mostrar modal de error
      setShowResults(true)
      setTimeout(() => setShowResults(false), 3000)
    }
  }

  const resetChallenge = () => {
    const newStates = [...challengeStates]
    newStates[currentChallenge] = {
      id: currentChallengeData.id,
      availablePositions: [...currentChallengeData.positions],
      placedPositions: {},
      isComplete: false
    }
    setChallengeStates(newStates)
  }

  const renderDropZone = (nodeId, level = 1) => {
    const node = currentChallengeData.structure[nodeId]
    if (!node) return null

    const placedHere = currentState.placedPositions[nodeId] || []
    const isDirector = level === 1

    return (
      <div key={nodeId} className={`mb-4 ${level > 1 ? 'ml-8' : ''}`}>
        <div
          className={`relative ${isDirector ? `bg-gradient-to-r ${currentChallengeData.director.color} text-white` : 'bg-gray-100 border-2 border-dashed border-gray-300'} rounded-lg p-4 min-h-[80px] transition-all duration-300`}
          onDragOver={!isDirector ? handleDragOver : undefined}
          onDrop={!isDirector ? (e) => handleDrop(e, nodeId) : undefined}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-bold text-sm ${isDirector ? 'text-white' : 'text-gray-700'}`}>
              {node.name}
            </h4>
            {isDirector && (
              <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                FIJO
              </div>
            )}
          </div>

          {!isDirector && (
            <div className="space-y-2">
              {placedHere.map(position => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-lg p-2 shadow-sm border-l-4 ${
                    position.correctParent === nodeId ? 'border-green-500' : 'border-red-500'
                  } cursor-pointer hover:shadow-md transition-shadow ${
                    position.isSpecial ? 'bg-amber-50' : ''
                  }`}
                  onClick={() => handleRemovePosition(position.id, nodeId)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      position.isSpecial ? 'text-amber-800' : 'text-gray-700'
                    }`}>
                      {position.name}
                    </span>
                    <FontAwesomeIcon 
                      icon={position.correctParent === nodeId ? faCheckCircle : faTimesCircle}
                      className={`text-sm ${position.correctParent === nodeId ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                </motion.div>
              ))}
              
              {placedHere.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-4">
                  Arrastra aquí los cargos subordinados
                </div>
              )}
            </div>
          )}
        </div>

        {/* Renderizar nodos hijos */}
        {node.children.map(childId => renderDropZone(childId, level + 1))}
      </div>
    )
  }

  const progress = (completedChallenges.length / challenges.length) * 100

  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Desafío {currentChallenge + 1} de {challenges.length}: {currentChallengeData.title}
          </h3>
          <div className="text-sm text-gray-600">
            {Math.round(progress)}% Completado
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posiciones disponibles */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold text-gray-800">Cargos Disponibles</h4>
            <button
              onClick={resetChallenge}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={faRedo} className="mr-1" />
              Reiniciar
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {currentState.availablePositions.map(position => (
              <motion.div
                key={position.id}
                draggable
                onDragStart={(e) => handleDragStart(e, position)}
                className={`${
                  position.isSpecial 
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300' 
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                } rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 border`}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05, rotate: 2 }}
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faGripVertical} className="text-gray-400" />
                  <div>
                    <div className={`font-medium text-sm ${
                      position.isSpecial ? 'text-amber-800' : 'text-gray-800'
                    }`}>
                      {position.name}
                    </div>
                    <div className={`text-xs ${
                      position.isSpecial ? 'text-amber-600' : 'text-gray-500'
                    }`}>
                      {position.isSpecial ? 'Opción especial' : `Nivel ${position.level}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {currentState.availablePositions.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <FontAwesomeIcon icon={faCheckCircle} className="text-4xl mb-2" />
                <p>¡Todos los cargos han sido colocados!</p>
              </div>
            )}
          </div>
        </div>

        {/* Estructura organizacional */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Estructura Organizacional</h4>
          
          <div className="space-y-4">
            {renderDropZone(currentChallengeData.director.id)}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={checkChallenge}
              disabled={currentState.availablePositions.length > 0}
              className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                currentState.availablePositions.length === 0
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Verificar Organización
            </button>
          </div>
        </div>
      </div>

      {/* Modal de resultados */}
      <AnimatePresence>
        {showResults && challengeResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center"
            >
              {challengeResults[challengeResults.length - 1].isComplete ? (
                <>
                  <FontAwesomeIcon icon={faTrophy} className="text-6xl text-yellow-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    ¡Excelente!
                  </h3>
                  {currentChallenge === challenges.length - 1 ? (
                    <>
                      <p className="text-gray-600 mb-4">
                        ¡Bien hecho! Has completado todos los desafíos de organización jerárquica
                      </p>
                      <div className="text-3xl font-bold text-green-600 mb-6">
                        {challengeResults[challengeResults.length - 1].percentage}%
                      </div>
                      <motion.button
                          onClick={() => {
                            completeLevel(4)
                            setShowResults(false)
                            setTimeout(() => {
                              navigate('/achievement/4')
                            }, 300)
                          }}
                        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reclamar Insignia
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">
                        Has organizado correctamente el {currentChallengeData.title}
                      </p>
                      <div className="text-3xl font-bold text-green-600">
                        {challengeResults[challengeResults.length - 1].percentage}%
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faTimesCircle} className="text-6xl text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-red-600 mb-2">
                    Casi lo logras
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Revisa la organización e inténtalo de nuevo
                  </p>
                  <div className="text-3xl font-bold text-red-600">
                    {challengeResults[challengeResults.length - 1].percentage}%
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HierarchyDragDrop