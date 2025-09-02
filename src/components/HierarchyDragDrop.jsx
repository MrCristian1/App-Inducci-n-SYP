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

// Org structure and challenges array should be at the top level inside the component
const challenges = [
  {
    id: 'organigrama',
    title: 'Organigrama Solutions and Payroll',
    director: {
      id: 'ceo',
      name: 'Junta de Socios',
      color: 'from-purple-600 to-purple-800'
    },
    positions: [
      { id: 'director-general', name: 'Director General', level: 2, correctParent: 'ceo' },
      { id: 'director-operaciones', name: 'Director de Operaciones', level: 2, correctParent: 'ceo' },
      { id: 'lider-gestion-humana', name: 'Líder de Gestión Humana', level: 4, correctParent: 'director-general' },
      { id: 'profesional-sgi', name: 'Profesional de Sistema de Gestión Integral', level: 5, correctParent: 'lider-gestion-humana' },
      { id: 'inhouse-arl', name: 'Inhouse ARL', level: 8, correctParent: 'profesional-sgi' },
      { id: 'analista-administrativo-financiero', name: 'Analista Administrativo y Financiero', level: 6, correctParent: 'director-general' },
      { id: 'asistente-administrativo-financiero', name: 'Asistente Administrativo y Financiero', level: 7, correctParent: 'director-general' },
      { id: 'outsourcing-contable', name: 'Outsourcing Contable', level: 8, correctParent: 'asistente-administrativo-financiero' },
      { id: 'asistente-comercial', name: 'Asistente Comercial', level: 7, correctParent: 'director-general' },
      { id: 'asistente-comunicacion-marketing', name: 'Asistente de Comunicación y Marketing', level: 7, correctParent: 'director-general' },
      { id: 'outsourcing-marketing', name: 'Outsourcing de Marketing', level: 8, correctParent: 'director-general' },
      { id: 'jefe-nomina', name: 'Jefe de Nómina', level: 3, correctParent: 'director-operaciones' },
      { id: 'profesional-nomina', name: 'Profesional de Nómina', level: 5, correctParent: 'jefe-nomina' },
      { id: 'analista-nomina', name: 'Analista de Nómina', level: 6, correctParent: 'jefe-nomina' },
      { id: 'asistente-nomina', name: 'Asistente de Nómina', level: 7, correctParent: 'jefe-nomina' },
      { id: 'auxiliar-nomina', name: 'Auxiliar de Nómina', level: 8, correctParent: 'jefe-nomina' },
      { id: 'lider-eor', name: 'Líder Employer of Record', level: 4, correctParent: 'director-operaciones' },
      { id: 'asistente-eor', name: 'Asistente de EOR', level: 7, correctParent: 'lider-eor' },
      { id: 'lider-administracion-personal', name: 'Líder de Administración de Personal', level: 4, correctParent: 'director-operaciones' },
      { id: 'analista-administracion-personal', name: 'Analista de Administración de Personal', level: 6, correctParent: 'lider-administracion-personal' },
      { id: 'asistente-administracion-personal', name: 'Asistente de Administración de Personal', level: 7, correctParent: 'lider-administracion-personal' },
      { id: 'outsourcing-legal', name: 'Outsourcing Legal', level: 8, correctParent: 'lider-administracion-personal' },
      { id: 'outsourcing-soporte-it', name: 'Outsourcing Soporte IT', level: 9, correctParent: 'lider-administracion-personal' },
      { id: 'lider-outsourcing-tesoreria', name: 'Líder de Outsourcing de Tesorería', level: 4, correctParent: 'director-operaciones' },
      { id: 'asistente-administrativo-financiero-op', name: 'Asistente Administrativo y Financiero', level: 7, correctParent: 'lider-outsourcing-tesoreria' }
    ],
    structure: {
      ceo: { name: 'Junta de Socios', children: ['director-general', 'director-operaciones'], level: 1 },
      'director-general': { name: 'Director General', children: ['lider-gestion-humana', 'analista-administrativo-financiero', 'asistente-administrativo-financiero', 'asistente-comercial', 'asistente-comunicacion-marketing', 'outsourcing-marketing'], level: 2 },
      'lider-gestion-humana': { name: 'Líder de Gestión Humana', children: ['profesional-sgi'], level: 4 },
      'profesional-sgi': { name: 'Profesional de Sistema de Gestión Integral', children: ['inhouse-arl'], level: 5 },
      'inhouse-arl': { name: 'Inhouse ARL', children: [], level: 8 },
      'analista-administrativo-financiero': { name: 'Analista Administrativo y Financiero', children: [], level: 6 },
      'asistente-administrativo-financiero': { name: 'Asistente Administrativo y Financiero', children: ['outsourcing-contable'], level: 7 },
      'outsourcing-contable': { name: 'Outsourcing Contable', children: [], level: 8 },
      'asistente-comercial': { name: 'Asistente Comercial', children: [], level: 7 },
      'asistente-comunicacion-marketing': { name: 'Asistente de Comunicación y Marketing', children: [], level: 7 },
      'outsourcing-marketing': { name: 'Outsourcing de Marketing', children: [], level: 8 },
      'director-operaciones': { name: 'Director de Operaciones', children: ['jefe-nomina', 'lider-eor', 'lider-administracion-personal', 'lider-outsourcing-tesoreria'], level: 2 },
      'jefe-nomina': { name: 'Jefe de Nómina', children: ['profesional-nomina', 'analista-nomina', 'asistente-nomina', 'auxiliar-nomina'], level: 3 },
      'profesional-nomina': { name: 'Profesional de Nómina', children: [], level: 5 },
      'analista-nomina': { name: 'Analista de Nómina', children: [], level: 6 },
      'asistente-nomina': { name: 'Asistente de Nómina', children: [], level: 7 },
      'auxiliar-nomina': { name: 'Auxiliar de Nómina', children: [], level: 8 },
      'lider-eor': { name: 'Líder Employer of Record', children: ['asistente-eor'], level: 4 },
      'asistente-eor': { name: 'Asistente de EOR', children: [], level: 7 },
      'lider-administracion-personal': { name: 'Líder de Administración de Personal', children: ['analista-administracion-personal', 'asistente-administracion-personal', 'outsourcing-legal', 'outsourcing-soporte-it'], level: 4 },
      'analista-administracion-personal': { name: 'Analista de Administración de Personal', children: [], level: 6 },
      'asistente-administracion-personal': { name: 'Asistente de Administración de Personal', children: [], level: 7 },
      'outsourcing-legal': { name: 'Outsourcing Legal', children: [], level: 8 },
      'outsourcing-soporte-it': { name: 'Outsourcing Soporte IT', children: [], level: 9 },
      'lider-outsourcing-tesoreria': { name: 'Líder de Outsourcing de Tesorería', children: ['asistente-administrativo-financiero-op'], level: 4 },
      'asistente-administrativo-financiero-op': { name: 'Asistente Administrativo y Financiero', children: [], level: 7 }
    }
  }
];

const HierarchyDragDrop = ({ onComplete }) => {
  // Secciones para Director General y Director de Operaciones
  const directorGeneralId = 'director-general';
  const directorOperacionesId = 'director-operaciones';
  const ceoId = 'ceo';
  // Cargos subordinados directos de cada director
  const cargosDirectorGeneral = challenges[0].structure[directorGeneralId].children.map(
    id => challenges[0].positions.find(pos => pos.id === id)
  ).filter(Boolean);
  const cargosDirectorOperaciones = challenges[0].structure[directorOperacionesId].children.map(
    id => challenges[0].positions.find(pos => pos.id === id)
  ).filter(Boolean);
  // Estado para cada sección
  const [stateDG, setStateDG] = useState({
    availablePositions: cargosDirectorGeneral,
    placedPositions: {}
  });
  const [stateDO, setStateDO] = useState({
    availablePositions: cargosDirectorOperaciones,
    placedPositions: {}
  });

  // Cargos subordinados directos de cada director

  // Estado para cada sección

  // Calcular aciertos en DG
  function getDGCorrectCount() {
    let count = 0;
    Object.entries(stateDG.placedPositions).forEach(([nodeId, arr]) => {
      arr.forEach((pos, idx) => {
        const correctOrder = challenges[0].structure[nodeId]?.children?.[idx] === pos.id;
        if (pos.correctParent === nodeId && correctOrder) count++;
      });
    });
    return count;
  }
  // Calcular aciertos en DO
  function getDOCorrectCount() {
    let count = 0;
    Object.entries(stateDO.placedPositions).forEach(([nodeId, arr]) => {
      arr.forEach((pos, idx) => {
        const correctOrder = challenges[0].structure[nodeId]?.children?.[idx] === pos.id;
        if (pos.correctParent === nodeId && correctOrder) count++;
      });
    });
    return count;
  }

  // Total de cargos a colocar: solo los disponibles para cada sección

  // Total de cargos a colocar: solo los disponibles para cada sección
  const totalDG = cargosDirectorGeneral.length;
  const totalDO = cargosDirectorOperaciones.length;
  // Progreso por aciertos
  const aciertos = getDGCorrectCount() + getDOCorrectCount();
  const totalAciertos = totalDG + totalDO;
  const progress = totalAciertos > 0 ? (aciertos / totalAciertos) * 100 : 0;
  const navigate = useNavigate()
  const { completeLevel } = useAppContext()
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [challengeResults, setChallengeResults] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [showResults, setShowResults] = useState(false)

  // State for drag & drop positions
  const [currentState, setCurrentState] = useState({
    availablePositions: challenges[currentChallenge].positions.map(pos => ({ ...pos })),
    placedPositions: {}
  })


  // Handler para drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Adaptar funciones para drag & drop por sección
  const handleDragStart = (e, position, state, setState) => {
    e.dataTransfer.setData('positionId', position.id);
  };

  const handleDrop = (e, nodeId, state, setState) => {
    e.preventDefault();
    const positionId = e.dataTransfer.getData('positionId');
    if (!positionId) return;
    // Evitar duplicados
    if (state.placedPositions[nodeId]?.some(pos => pos.id === positionId)) return;
    // Buscar el cargo en toda la lista de disponibles
    const position = state.availablePositions.find(pos => pos.id === positionId);
    if (!position) return;
    setState({
      availablePositions: state.availablePositions.filter(pos => pos.id !== positionId),
      placedPositions: {
        ...state.placedPositions,
        [nodeId]: [...(state.placedPositions[nodeId] || []), position]
      }
    });
  };

  const handleRemovePosition = (positionId, nodeId, state, setState) => {
    const position = state.placedPositions[nodeId].find(pos => pos.id === positionId);
    setState({
      availablePositions: [...state.availablePositions, position],
      placedPositions: {
        ...state.placedPositions,
        [nodeId]: state.placedPositions[nodeId].filter(pos => pos.id !== positionId)
      }
    });
  };

  const resetChallenge = () => {
    setCurrentState({
      availablePositions: challenges[currentChallenge].positions.map(pos => ({ ...pos })),
      placedPositions: {}
    })
  }
  const checkChallenge = () => {
    // Implement check logic here
  }

  const renderDropZone = (nodeId, level = 1) => {
    const node = challenges[0].structure[nodeId]
    if (!node) return null

    const placedHere = currentState.placedPositions[nodeId] || []
    const isDirector = level === 1

    return (
      <div key={nodeId} className={`mb-4 ${level > 1 ? 'ml-8' : ''}`}>
        <div
          className={`relative ${isDirector ? `bg-gradient-to-r ${challenges[0].director.color} text-white` : 'bg-gray-100 border-2 border-dashed border-gray-300'} rounded-lg p-4 min-h-[80px] transition-all duration-300`}
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
                <div
                  key={position.id}
                  className={`bg-white rounded-lg p-2 shadow-sm border-l-4 ${
                    position.correctParent === nodeId ? 'border-green-500' : 'border-red-500'
                  } cursor-pointer hover:shadow-md transition-shadow`}
                  onClick={() => handleRemovePosition(position.id, nodeId)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {position.name}
                    </span>
                    <FontAwesomeIcon 
                      icon={position.correctParent === nodeId ? faCheckCircle : faTimesCircle}
                      className={`text-sm ${position.correctParent === nodeId ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  {/* Si el cargo tiene hijos, renderiza su dropzone para los subordinados */}
                  {challenges[0].structure[position.id]?.children?.length > 0 && (
                    <div className="mt-4 ml-6">
                      {renderDropZone(position.id, level + 1)}
                    </div>
                  )}
                </div>
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
  // Dropzone sin título para los subordinados
  const renderDropZoneSinTitulo = (nodeId, state, setState, level = 1) => {
  // Agrupaciones genéricas para nomina y administración de personal
  const hijosJefeNominaIds = challenges[0].structure['jefe-nomina'].children;
  const hijosLiderAdministracionPersonalIds = challenges[0].structure['lider-administracion-personal'].children;
    const node = challenges[0].structure[nodeId];
    if (!node) return null;
    const placedHere = state.placedPositions[nodeId] || [];
    const isDirector = level === 1 || level === 2;
  // Estado local para selector de subordinado
  const [selectingSub, setSelectingSub] = useState(null);
  const [selectedSub, setSelectedSub] = useState({});
    // Todas las opciones posibles: hijos de todos los cargos con subordinados
    const hijosLiderGestionHumana = challenges[0].structure['lider-gestion-humana'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const hijosAsistenteAdministrativoFinanciero = challenges[0].structure['asistente-administrativo-financiero'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const hijosJefeNomina = challenges[0].structure['jefe-nomina'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const hijosLiderEOR = challenges[0].structure['lider-eor'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const hijosLiderAdministracionPersonal = challenges[0].structure['lider-administracion-personal'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const hijosLiderOutsourcingTesoreria = challenges[0].structure['lider-outsourcing-tesoreria'].children.map(id => challenges[0].positions.find(pos => pos.id === id)).filter(Boolean);
    const todasOpciones = [
      ...hijosLiderGestionHumana,
      ...hijosAsistenteAdministrativoFinanciero,
      // Agrupación para nomina
      {
        id: 'nomina-group',
        name: 'Cargos relacionados a nómina',
        level: '',
        correctParent: 'jefe-nomina',
        isGroup: true,
        children: hijosJefeNominaIds
      },
      ...hijosLiderEOR,
      // Agrupación para administración de personal
      {
        id: 'admin-personal-group',
        name: 'Cargos relacionados a administración de personal',
        level: '',
        correctParent: 'lider-administracion-personal',
        isGroup: true,
        children: hijosLiderAdministracionPersonalIds
      },
      ...hijosLiderOutsourcingTesoreria
    ];
    return (
      <div key={nodeId} className={`mb-4 ${level > 1 ? 'ml-8' : ''}`}>
        <div
          className={`relative ${isDirector ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white' : 'bg-gray-100 border-2 border-dashed border-gray-300'} rounded-lg p-4 min-h-[80px] transition-all duration-300`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, nodeId, state, setState)}
        >
          {isDirector && (
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-white">{node.name}</h4>
              <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">FIJO</div>
            </div>
          )}
          <div className="space-y-2">
            {placedHere.map((position, idx) => {
              const correctOrder = challenges[0].structure[nodeId]?.children?.[idx] === position.id;
              const isCorrect = position.correctParent === nodeId && correctOrder;
              const hasSubordinates = challenges[0].structure[position.id]?.children?.length > 0;
              return (
                <div
                  key={position.id}
                  className={`bg-white rounded-lg p-2 shadow-sm border-l-4 ${
                    isCorrect ? 'border-green-500' : 'border-red-500'
                  } cursor-pointer hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {position.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">Nivel {position.level}</span>
                    <FontAwesomeIcon 
                      icon={isCorrect ? faCheckCircle : faTimesCircle}
                      className={`text-sm ml-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                    />
                    {/* Botón para eliminar cargo principal */}
                    <button className="ml-2 text-xs text-red-400 hover:text-red-600" onClick={(e) => {e.stopPropagation(); handleRemovePosition(position.id, nodeId, state, setState);}}>Quitar</button>
                  </div>
                  {/* Si el cargo tiene hijos, mostrar selector en vez de dropzone recursivo */}
                  {hasSubordinates && (
                    <div className="mt-4 ml-6">
                      {!selectedSub[position.id] ? (
                        <div className="bg-gray-100 border border-dashed border-gray-400 rounded p-2 cursor-pointer text-gray-500 text-sm" onClick={(e) => {e.stopPropagation(); setSelectingSub(position.id);}}>
                          Da clic y escoge al subordinado
                        </div>
                      ) : (
                        <div className={`bg-white rounded-lg p-2 shadow-sm border-l-4 ${
                          selectedSub[position.id].isCorrect ? 'border-green-500' : 'border-red-500'
                        } flex items-center justify-between cursor-pointer`} onClick={(e) => {e.stopPropagation(); setSelectingSub(position.id);}}>
                          <span className="text-sm font-medium text-gray-700">
                            {selectedSub[position.id].name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">Nivel {selectedSub[position.id].level}</span>
                          <FontAwesomeIcon 
                            icon={selectedSub[position.id].isCorrect ? faCheckCircle : faTimesCircle}
                            className={`text-sm ml-2 ${selectedSub[position.id].isCorrect ? 'text-green-500' : 'text-red-500'}`}
                          />
                        </div>
                      )}
                      {/* Menú de selección de subordinado: mostrar todas las opciones posibles */}
                      {selectingSub === position.id && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                          <div className="bg-white border rounded-xl shadow-2xl p-6 max-w-xs w-full">
                            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Escoge el subordinado</h4>
                            <div className="space-y-2">
                              {todasOpciones.map(child => (
                                <div key={child.id} className="cursor-pointer hover:bg-gray-100 p-2 rounded text-gray-700 text-center" onClick={(e) => {
                                  e.stopPropagation();
                                  let isCorrect;
                                  if (child.isGroup) {
                                    isCorrect = child.correctParent === position.id;
                                  } else {
                                    isCorrect = child.correctParent === position.id;
                                  }
                                  setSelectedSub(prev => ({
                                    ...prev,
                                    [position.id]: {
                                      ...child,
                                      isCorrect
                                    }
                                  }));
                                  setSelectingSub(null);
                                }}>{child.name} <span className="text-xs text-gray-400">{child.level ? `Nivel ${child.level}` : ''}</span></div>
                              ))}
                            </div>
                            <button className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded font-bold" onClick={() => setSelectingSub(null)}>Cancelar</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {placedHere.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-4">
                {/* Solo el área vacía, sin título */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } 


  return (
  <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Desafío {currentChallenge + 1} de {challenges.length}: {challenges[currentChallenge].title}
          </h3>
          <div className="text-sm text-gray-600">
            {Math.round(progress)}% Aciertos
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.5s' }}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className={`bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 ${progress === 100 ? 'hover:from-purple-600 hover:to-purple-800' : 'opacity-50 cursor-not-allowed'}`}
            disabled={progress !== 100}
            onClick={() => {
              if (progress === 100) {
                completeLevel(4);
                setShowResults(false);
                navigate('/achievement/4');
              }
            }}
          >
            Reclamar Insignia
          </button>
        </div>
      </div>
      {/* Sección 1: Director General */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800">Cargos Disponibles (Director General)</h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {stateDG.availablePositions.map(position => (
              <div
                key={position.id}
                draggable
                onDragStart={(e) => handleDragStart(e, position, stateDG, setStateDG)}
                className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 border"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faGripVertical} className="text-gray-400" />
                  <div>
                    <div className="font-medium text-sm text-gray-800">{position.name}</div>
                    <div className="text-xs text-gray-500">{`Nivel ${position.level}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Estructura Organizacional (Director General)</h4>
          <div className="space-y-4">
            {renderDropZoneSinTitulo(ceoId, stateDG, setStateDG)}
            {renderDropZoneSinTitulo(directorGeneralId, stateDG, setStateDG, 2)}
          </div>
        </div>
      </div>
      {/* Sección 2: Director de Operaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800">Cargos Disponibles (Director de Operaciones)</h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {stateDO.availablePositions.map(position => (
              <div
                key={position.id}
                draggable
                onDragStart={(e) => handleDragStart(e, position, stateDO, setStateDO)}
                className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 border"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faGripVertical} className="text-gray-400" />
                  <div>
                    <div className="font-medium text-sm text-gray-800">{position.name}</div>
                    <div className="text-xs text-gray-500">{`Nivel ${position.level}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Estructura Organizacional (Director de Operaciones)</h4>
          <div className="space-y-4">
            {renderDropZoneSinTitulo(ceoId, stateDO, setStateDO)}
            {renderDropZoneSinTitulo(directorOperacionesId, stateDO, setStateDO, 2)}
          </div>
        </div>
      </div>
      {/* Modal de resultados */}
      {showResults && challengeResults.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
            {challengeResults[challengeResults.length - 1]?.isComplete ? (
              <>
                <FontAwesomeIcon icon={faTrophy} className="text-6xl text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">¡Excelente!</h3>
                {currentChallenge === challenges.length - 1 ? (
                  <>
                    <p className="text-gray-600 mb-4">¡Bien hecho! Has completado todos los desafíos de organización jerárquica</p>
                    <div className="text-3xl font-bold text-green-600 mb-6">{challengeResults[challengeResults.length - 1].percentage}%</div>
                    <button
                      onClick={() => {
                        completeLevel(4)
                        setShowResults(false)
                        setTimeout(() => {
                          navigate('/achievement/4')
                        }, 300)
                      }}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
                    >
                      Reclamar Insignia
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">Has organizado correctamente el {challenges[currentChallenge].title}</p>
                    <div className="text-3xl font-bold text-green-600">{challengeResults[challengeResults.length - 1].percentage}%</div>
                  </>
                )}
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimesCircle} className="text-6xl text-red-500 mb-4" />
                <h3 className="text-2xl font-bold text-red-600 mb-2">Casi lo logras</h3>
                <p className="text-gray-600 mb-4">Revisa la organización e inténtalo de nuevo</p>
                <div className="text-3xl font-bold text-red-600">{challengeResults[challengeResults.length - 1].percentage}%</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HierarchyDragDrop;