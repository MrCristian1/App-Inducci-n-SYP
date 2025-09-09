<span className="text-white font-semibold mr-2">Un accidente de trabajo es una</span>
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


const dragItems = [
  { id: 1, text: 'Levantar cajas pesadas', category: 'biomecanico' },
  { id: 2, text: 'Ruido de maquinaria', category: 'fisico' },
  { id: 3, text: 'Estrés por sobrecarga', category: 'psicosocial' },
  { id: 4, text: 'Exposición a virus', category: 'biologico' },
  { id: 5, text: 'Escaleras en mal estado', category: 'seguridad' },
  { id: 6, text: 'Trabajar encorvado', category: 'biomecanico' },
];
const dropZones = [
  { id: 'biomecanico', label: '🏋️ Riesgos Biomecánicos', color: 'from-blue-400/60 to-blue-600/60' },
  { id: 'fisico', label: '🌡️ Riesgos Físicos', color: 'from-purple-400/60 to-purple-600/60' },
  { id: 'psicosocial', label: '🧠 Riesgos Psicosociales', color: 'from-pink-400/60 to-pink-600/60' },
  { id: 'biologico', label: '🦠 Riesgos Biológicos', color: 'from-green-400/60 to-green-600/60' },
  { id: 'seguridad', label: '⚠️ Condiciones de Seguridad', color: 'from-yellow-400/60 to-yellow-600/60' },
];
const stepsData = [
  'Reportar inmediatamente al jefe o encargado SG-SST',
  'Ir al centro médico indicado por la ARL',
  'Dar detalles completos del accidente',
];

const initialState = {
  dragAnswers: {},
  slider: 2,
  orderSteps: [],
  fillText: ['', '', ''],
  analysisText: '',
  current: 0,
  score: 0,
  completed: false,
  stepClicks: [],
};

const totalQuestions = 5;

// Pasos desordenados para la sección 3
const shuffledSteps = [stepsData[2], stepsData[0], stepsData[1]];

const AccidentQuiz = ({ onClose }) => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [showOrderError, setShowOrderError] = useState(false);
  const [showFillError, setShowFillError] = useState(false);
  const correctOrder = stepsData;

  // Barra de progreso animada
  const progress = ((state.current + 1) / totalQuestions) * 100;

  // Drag & Drop handlers
  const [dragged, setDragged] = useState(null);
  const handleDragStart = (item) => setDragged(item);
  const handleDrop = (zoneId) => {
    if (dragged && !state.dragAnswers[dragged.id]) {
      setState(s => ({ ...s, dragAnswers: { ...s.dragAnswers, [dragged.id]: zoneId } }));
    }
    setDragged(null);
  };

  // Drag & drop para ordenar pasos en sección 3
  const [draggedStepIdx, setDraggedStepIdx] = useState(null);
  const handleStepDragStart = (idx) => setDraggedStepIdx(idx);
  const handleStepDrop = (idx) => {
    if (draggedStepIdx === null || draggedStepIdx === idx) return;
    const newOrder = [...state.stepClicks];
    const [removed] = newOrder.splice(draggedStepIdx, 1);
    newOrder.splice(idx, 0, removed);
    setState(s => ({ ...s, stepClicks: newOrder }));
    setDraggedStepIdx(null);
  };
  const handleStepDragOver = (e) => e.preventDefault();

  // Validación y puntuación
  const validateQuiz = () => {
    let score = 0;
    // Pregunta 1: Drag & Drop
    score += Object.keys(state.dragAnswers).length === dragItems.length ? 1 : 0;
    // Pregunta 2: Slider
    score += state.slider === 2 ? 1 : 0;
    // Pregunta 3: Secuencia
    const correctOrder = stepsData.join('|');
    score += state.stepClicks.join('|') === correctOrder ? 1 : 0;
    // Pregunta 4: Completar texto (solo acepta el orden exacto y palabras exactas)
    const correctFill = ['lesión', 'trabajador', 'trabajo'];
    const isFillCorrect =
      state.fillText.length === 3 &&
      state.fillText[0].trim().toLowerCase() === 'lesión' &&
      state.fillText[1].trim().toLowerCase() === 'trabajador' &&
      state.fillText[2].trim().toLowerCase() === 'trabajo';
    score += isFillCorrect ? 1 : 0;
    // Pregunta 5: Análisis textual
    const keywords = ['biomecánico', 'físico', 'psicosocial', 'biológico', 'seguridad', 'ruido', 'postura', 'cables', 'presión'];
    const found = keywords.filter(k => state.analysisText.toLowerCase().includes(k)).length;
    score += found >= 3 ? 1 : 0;
    setState(s => ({ ...s, score, completed: true }));
  };

  // Navegación
  const resetDragSection = () => {
    setState(s => ({
      ...s,
      dragAnswers: {},
    }));
    setShowRetryModal(false);
  };
  const changeQuestion = (dir) => {
    // Si estamos en la sección de arrastrar y se va a avanzar
    if (state.current === 0 && dir === 1) {
      // Verificar si hay algún error
      const allAnswered = Object.keys(state.dragAnswers).length === dragItems.length;
      const anyWrong = dragItems.some(item => state.dragAnswers[item.id] && state.dragAnswers[item.id] !== item.category);
      if (allAnswered && anyWrong) {
        setShowRetryModal(true);
        return;
      }
    }
    setState(s => ({ ...s, current: Math.max(0, Math.min(totalQuestions - 1, s.current + dir)) }));
  };

  // Reinicio
  const restartQuiz = () => setState(initialState);

  // Glassmorphism styled slider
  const GlassSlider = styled(Slider)(({ theme }) => ({
    color: '#7c3aed',
    height: 8,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 28,
      width: 28,
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(8px)',
      border: '2px solid #7c3aed',
      boxShadow: '0 4px 16px rgba(124,58,237,0.2)',
    },
    '& .MuiSlider-track': {
      background: 'linear-gradient(90deg, #60a5fa88, #a78bfa88)',
      border: 'none',
      height: 8,
      borderRadius: 8,
    },
    '& .MuiSlider-rail': {
      background: 'rgba(255,255,255,0.2)',
      height: 8,
      borderRadius: 8,
    },
    '& .MuiSlider-valueLabel': {
      background: 'rgba(255,255,255,0.7)',
      color: '#7c3aed',
      borderRadius: 8,
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(124,58,237,0.1)',
    },
  }));

  // Renderizar preguntas
  const renderStep = () => {
    switch (state.current) {
      case 0:
        // Drag & Drop
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow text-center">Arrastra cada riesgo a su categoría correspondiente</h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
              {/* Draggables */}
              <div className="flex flex-col gap-4 w-80 md:w-80">
                {dragItems.map(item => {
                  // Feedback visual para draggables
                  const droppedZone = state.dragAnswers[item.id];
                  let feedbackColor = '';
                  if (droppedZone) {
                    if (droppedZone === item.category) {
                      feedbackColor = 'bg-green-500 border-green-400 text-white';
                    } else {
                      feedbackColor = 'bg-red-500 border-red-400 text-white';
                    }
                  }
                  return (
                    <div
                      key={item.id}
                      draggable={!state.dragAnswers[item.id]}
                      onDragStart={() => handleDragStart(item)}
                      className={`p-3 rounded-xl shadow-lg ${droppedZone ? '' : 'bg-white/30 backdrop-blur-md border-blue-200'} border font-semibold cursor-move transition-all duration-300 ${feedbackColor} ${state.dragAnswers[item.id] ? 'opacity-70' : 'hover:scale-105 hover:border-blue-400'}`}
                      style={{ opacity: state.dragAnswers[item.id] ? 0.7 : 1 }}
                    >
                      {item.text}
                    </div>
                  );
                })}
              </div>
              {/* Drop zones */}
              <div className="flex flex-col gap-4 w-80 md:w-80">
                {dropZones.map(zone => (
                  <div
                    key={zone.id}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDrop(zone.id)}
                    className={`p-4 rounded-xl shadow-xl font-bold text-white text-lg flex items-center gap-2 transition-all duration-300 border-2 bg-gradient-to-r ${zone.color} ${dragged ? 'scale-105' : ''} backdrop-blur-md`}
                    style={{ minHeight: '56px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                  >
                    {zone.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" disabled>Anterior</button>
              <button className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-blue-200 ${Object.keys(state.dragAnswers).length !== dragItems.length ? 'opacity-50' : 'hover:scale-105'}`} onClick={() => changeQuestion(1)} disabled={Object.keys(state.dragAnswers).length !== dragItems.length}>Siguiente</button>
            </div>
            <div className="mt-4 text-sm text-green-400 font-bold">{Object.keys(state.dragAnswers).length === dragItems.length && '¡Todos los riesgos ubicados correctamente!'}</div>
          </motion.div>
        );
      case 1:
        // Slider
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-purple-200 drop-shadow text-center">Tiempo de Reporte de Accidentes</h3>
            <p className="mb-4 text-blue-100 text-center">¿Cuál es el tiempo <span className="font-bold text-orange-400">MÁXIMO</span> para reportar un accidente de trabajo?</p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-[450px] max-w-full mt-8">
                <GlassSlider
                  min={1}
                  max={10}
                  value={state.slider}
                  onChange={(_, val) => setState(s => ({ ...s, slider: Number(val) }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 1, label: '1 día' }, { value: 5, label: '5 días' }, { value: 10, label: '10 días' }]}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-purple-400 mt-2 drop-shadow">{state.slider} días hábiles</span>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-purple-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-purple-200 hover:scale-105" onClick={() => changeQuestion(1)}>Siguiente</button>
            </div>
          </motion.div>
        );
      case 2:
        // Escenario interactivo
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-orange-200 drop-shadow text-center">Escenario de Emergencia</h3>
            <div className="mb-2">
              <span className="block text-white text-center text-lg font-semibold">Acabas de sufrir una caída en tu lugar de trabajo y sientes dolor en la espalda...</span>
            </div>
            <div className="flex justify-center mb-6">
              <img src="/img/caida.jpg" alt="Caída en el trabajo" className="w-64 h-auto rounded-xl shadow-lg object-contain border border-orange-200 bg-white/20" />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-4 text-center text-white font-semibold">Arrastra y ordena los pasos según el procedimiento correcto:</p>
              <div className="flex flex-row gap-6 justify-center items-center mb-6">
                {state.stepClicks.length === 0
                  ? shuffledSteps.map((step, idx) => (
                    <div
                      key={step}
                      draggable
                      onDragStart={() => {
                        setState(s => ({ ...s, stepClicks: shuffledSteps }));
                      }}
                      className="bg-white/30 backdrop-blur-md border border-orange-200 rounded-xl shadow-lg px-6 py-4 min-w-[180px] text-center font-semibold text-white cursor-move text-base hover:scale-105 transition-all duration-300"
                    >
                      {step}
                    </div>
                  ))
                  : state.stepClicks.map((step, idx) => (
                    <div
                      key={step}
                      draggable
                      onDragStart={() => handleStepDragStart(idx)}
                      onDrop={() => handleStepDrop(idx)}
                      onDragOver={handleStepDragOver}
                      className={`relative bg-white/30 backdrop-blur-md border border-orange-200 rounded-xl shadow-lg px-6 py-4 min-w-[180px] text-center font-semibold text-white cursor-move text-base hover:scale-105 transition-all duration-300 ${draggedStepIdx === idx ? 'ring-4 ring-orange-400' : ''}`}
                      style={{ zIndex: draggedStepIdx === idx ? 10 : 1 }}
                    >
                      <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-orange-400/80 text-white flex items-center justify-center font-bold shadow text-lg border-2 border-white">{idx + 1}</span>
                      {step}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-orange-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button
                className={`bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-orange-200 ${(state.stepClicks.length !== stepsData.length || state.stepClicks.includes(undefined)) ? 'opacity-50' : 'hover:scale-105'}`}
                onClick={() => {
                  if (state.stepClicks.length === stepsData.length && state.stepClicks.every((step, idx) => step === correctOrder[idx])) {
                    changeQuestion(1);
                  } else {
                    setShowOrderError(true);
                  }
                }}
                disabled={state.stepClicks.length !== stepsData.length || state.stepClicks.includes(undefined)}
              >
                Siguiente
              </button>
            </div>
            {/* Modal de error de orden */}
            {showOrderError && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/30 backdrop-blur-lg border border-orange-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Orden incorrecto!</h4>
                  <p className="text-white mb-6 text-center font-semibold">El orden de los pasos no es correcto.<br />Intenta de nuevo.</p>
                  <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-orange-200 hover:scale-105 transition" onClick={() => setShowOrderError(false)}>Reintentar</button>
                </div>
              </div>
            )}
          </motion.div>
        );
      case 3:
        // Completar texto
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow">Completa la Definición</h3>
            <div className="flex gap-2 items-center mb-4 bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg border border-blue-200">
              <input type="text" value={state.fillText[0]} onChange={e => setState(s => ({ ...s, fillText: [e.target.value, state.fillText[1], state.fillText[2]] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-blue-900 font-bold shadow" placeholder="Escribe aquí..." />
              <span className="text-blue-100">generada sobre el</span>
              <input type="text" value={state.fillText[1]} onChange={e => setState(s => ({ ...s, fillText: [state.fillText[0], e.target.value, state.fillText[2]] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-blue-900 font-bold shadow" placeholder="Escribe aquí..." />
              <span className="text-blue-100">por causa u ocasión del</span>
              <input type="text" value={state.fillText[2]} onChange={e => setState(s => ({ ...s, fillText: [state.fillText[0], state.fillText[1], e.target.value] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-blue-900 font-bold shadow" placeholder="Escribe aquí..." />
            </div>
            <div className="bg-blue-100/30 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 text-blue-700 mb-4 border border-blue-200 shadow"><span>💡</span>Recuerda: lesión, trabajador, trabajo</div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-blue-900 px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105" onClick={() => changeQuestion(1)}>Siguiente</button>
            </div>
          </motion.div>
        );
      case 4:
        // Análisis textual
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow text-center">Identifica los Riesgos</h3>
            <div className="bg-blue-100/30 backdrop-blur-md rounded-xl p-4 mb-4 flex flex-col items-center gap-2 text-white border border-blue-200 shadow mx-auto max-w-md">
              <img src="img/situacion-nivel6.png" alt="Situación nivel 6" className="w-32 h-auto mb-4 rounded-xl shadow" />
              <span>🏢</span>Oficina con empleados en computadoras 8 horas, sillas sin apoyo lumbar, pantallas brillantes, ruido de aires acondicionados, cables sueltos, presión por metas
            </div>
            <textarea value={state.analysisText} onChange={e => setState(s => ({ ...s, analysisText: e.target.value }))} className="w-full h-32 border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl p-4 mb-4 text-blue-900 font-bold shadow" placeholder="Escribe tu análisis aquí..." />
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-green-200 hover:scale-105" onClick={() => {
                const wordCount = state.analysisText.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount < 5) {
                  setShowFillError(true);
                } else if (wordCount >= 6) {
                  navigate('/achievement/6');
                } else {
                  validateQuiz();
                }
              }}>Finalizar</button>
            </div>
            {/* Modal de error de análisis corto */}
            {showFillError && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/30 backdrop-blur-lg border border-blue-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Tú análisis es muy corto!</h4>
                  <p className="text-white mb-6 text-center font-semibold">Por favor escribe al menos 5 palabras en tu análisis.</p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105 transition" onClick={() => setShowFillError(false)}>Reintentar</button>
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        // Resultados
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-2xl mb-4 text-green-300 drop-shadow">¡Quiz completado!</h3>
            <p className="mb-6 text-blue-100">Tu puntaje: <span className="font-bold text-green-400">{state.score}/5</span> ({Math.round((state.score / totalQuestions) * 100)}%)</p>
            <button className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-green-200 hover:scale-105" onClick={restartQuiz}>Reiniciar Quiz</button>
            <button className="ml-4 bg-white/30 backdrop-blur-md text-blue-900 px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={onClose}>Cerrar</button>
          </motion.div>
        );
    }
  };

  return (
    <>
      {/* Header y barra de progreso */}
      <div className="mb-8 mt-32">
        <h2 className="text-3xl font-bold text-blue-200 mb-2 text-center drop-shadow">Quiz Interactivo de Seguridad Laboral</h2>
        <p className="text-lg text-blue-100 text-center mb-4">Pon a prueba tus conocimientos con diferentes tipos de preguntas</p>
        <div className="mx-auto w-2/3 max-w-xl h-3 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-blue-400/40 rounded-full mb-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            {...{ className: "h-full bg-blue-400/80 rounded-full" }}
          />
        </div>
        <div className="w-full flex justify-center">
          <span className="text-sm text-blue-200 font-bold mt-2">{state.current + 1} / {totalQuestions}</span>
        </div>
      </div>
      {/* Pregunta actual */}
      <div className="space-y-6">
        {/* Modal de reintento */}
        {showRetryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white/30 backdrop-blur-lg border border-blue-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
              <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Ups! Hay errores</h4>
              <p className="text-white mb-6 text-center font-semibold">Algunos riesgos no están en la categoría correcta.<br />¿Quieres intentarlo de nuevo?</p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105 transition" onClick={resetDragSection}>Reintentar</button>
            </div>
          </div>
        )}
        {/* Drag & Drop */
          state.current === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
              <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow text-center">Arrastra cada riesgo a su categoría correspondiente</h3>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                {/* Draggables */}
                <div className="flex flex-col gap-4 w-80 md:w-80">
                  {dragItems.map(item => {
                    // Feedback visual para draggables
                    const droppedZone = state.dragAnswers[item.id];
                    let feedbackColor = '';
                    if (droppedZone) {
                      if (droppedZone === item.category) {
                        feedbackColor = 'bg-green-500 border-green-400 text-white';
                      } else {
                        feedbackColor = 'bg-red-500 border-red-400 text-white';
                      }
                    }
                    return (
                      <div
                        key={item.id}
                        draggable={!state.dragAnswers[item.id]}
                        onDragStart={() => handleDragStart(item)}
                        className={`p-3 rounded-xl shadow-lg ${droppedZone ? '' : 'bg-white/30 backdrop-blur-md border-blue-200'} border font-semibold cursor-move transition-all duration-300 ${feedbackColor} ${state.dragAnswers[item.id] ? 'opacity-70' : 'hover:scale-105 hover:border-blue-400'}`}
                        style={{ opacity: state.dragAnswers[item.id] ? 0.7 : 1 }}
                      >
                        {item.text}
                      </div>
                    );
                  })}
                </div>
                {/* Drop zones */}
                <div className="flex flex-col gap-4 w-80 md:w-80">
                  {dropZones.map(zone => (
                    <div
                      key={zone.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDrop(zone.id)}
                      className={`p-4 rounded-xl shadow-xl font-bold text-white text-lg flex items-center gap-2 transition-all duration-300 border-2 bg-gradient-to-r ${zone.color} ${dragged ? 'scale-105' : ''} backdrop-blur-md`}
                      style={{ minHeight: '56px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                    >
                      {zone.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" disabled>Anterior</button>
                <button className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-blue-200 ${Object.keys(state.dragAnswers).length !== dragItems.length ? 'opacity-50' : 'hover:scale-105'}`} onClick={() => changeQuestion(1)} disabled={Object.keys(state.dragAnswers).length !== dragItems.length}>Siguiente</button>
              </div>
              <div className="mt-4 text-sm text-green-400 font-bold">{Object.keys(state.dragAnswers).length === dragItems.length && '¡Todos los riesgos ubicados correctamente!'}</div>
            </motion.div>
          )}
        {/* Slider */}
        {state.current === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-purple-200 drop-shadow text-center">Tiempo de Reporte de Accidentes</h3>
            <p className="mb-4 text-blue-100 text-center">¿Cuál es el tiempo <span className="font-bold text-orange-400">MÁXIMO</span> para reportar un accidente de trabajo?</p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-[450px] max-w-full mt-8">
                <GlassSlider
                  min={1}
                  max={10}
                  value={state.slider}
                  onChange={(_, val) => setState(s => ({ ...s, slider: Number(val) }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 1, label: '1 día' }, { value: 5, label: '5 días' }, { value: 10, label: '10 días' }]}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-purple-400 mt-2 drop-shadow">{state.slider} días hábiles</span>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-purple-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-purple-200 hover:scale-105" onClick={() => changeQuestion(1)}>Siguiente</button>
            </div>
          </motion.div>
        )}
        {/* Escenario interactivo */}
        {state.current === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-xl mb-4 text-orange-200 drop-shadow text-center">Escenario de Emergencia</h3>
            <div className="mb-2">
              <span className="block text-white text-center text-lg font-semibold">Acabas de sufrir una caída en tu lugar de trabajo y sientes dolor en la espalda...</span>
            </div>
            <div className="flex justify-center mb-6">
              <img src="/img/caida.jpg" alt="Caída en el trabajo" className="w-64 h-auto rounded-xl shadow-lg object-contain border border-orange-200 bg-white/20" />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-4 text-center text-white font-semibold">Arrastra y ordena los pasos según el procedimiento correcto:</p>
              <div className="flex flex-row gap-6 justify-center items-center mb-6">
                {state.stepClicks.length === 0
                  ? shuffledSteps.map((step, idx) => (
                    <div
                      key={step}
                      draggable
                      onDragStart={() => {
                        setState(s => ({ ...s, stepClicks: shuffledSteps }));
                      }}
                      className="bg-white/30 backdrop-blur-md border border-orange-200 rounded-xl shadow-lg px-6 py-4 min-w-[180px] text-center font-semibold text-white cursor-move text-base hover:scale-105 transition-all duration-300"
                    >
                      {step}
                    </div>
                  ))
                  : state.stepClicks.map((step, idx) => (
                    <div
                      key={step}
                      draggable
                      onDragStart={() => handleStepDragStart(idx)}
                      onDrop={() => handleStepDrop(idx)}
                      onDragOver={handleStepDragOver}
                      className={`relative bg-white/30 backdrop-blur-md border border-orange-200 rounded-xl shadow-lg px-6 py-4 min-w-[180px] text-center font-semibold text-white cursor-move text-base hover:scale-105 transition-all duration-300 ${draggedStepIdx === idx ? 'ring-4 ring-orange-400' : ''}`}
                      style={{ zIndex: draggedStepIdx === idx ? 10 : 1 }}
                    >
                      <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-orange-400/80 text-white flex items-center justify-center font-bold shadow text-lg border-2 border-white">{idx + 1}</span>
                      {step}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-orange-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button
                className={`bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-orange-200 ${(state.stepClicks.length !== stepsData.length || state.stepClicks.includes(undefined)) ? 'opacity-50' : 'hover:scale-105'}`}
                onClick={() => {
                  if (state.stepClicks.length === stepsData.length && state.stepClicks.every((step, idx) => step === correctOrder[idx])) {
                    changeQuestion(1);
                  } else {
                    setShowOrderError(true);
                  }
                }}
                disabled={state.stepClicks.length !== stepsData.length || state.stepClicks.includes(undefined)}
              >
                Siguiente
              </button>
            </div>
            {/* Modal de error de orden */}
            {showOrderError && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/30 backdrop-blur-lg border border-orange-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Orden incorrecto!</h4>
                  <p className="text-white mb-6 text-center font-semibold">El orden de los pasos no es correcto.<br />Intenta de nuevo.</p>
                  <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-orange-200 hover:scale-105 transition" onClick={() => setShowOrderError(false)}>Reintentar</button>
                </div>
              </div>
            )}
          </motion.div>
        )}
        {/* Completar texto */}
        {state.current === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fade-in">
            <div className="flex flex-col items-center justify-center w-full">
              <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow text-center">Completa la Definición</h3>
              <div className="flex flex-col items-center w-full">
                <div>
                  <div className="flex flex-wrap justify-center gap-2 items-center w-full max-w-md mx-auto mt-8">
                    <span className="text-blue-100">Un accidente de trabajo es una</span>
                    <input type="text" value={state.fillText[0]} onChange={e => setState(s => ({ ...s, fillText: [e.target.value, state.fillText[1], state.fillText[2]] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-white font-bold shadow text-center" placeholder="Escribe aquí..." />
                    <span className="text-blue-100">generada sobre el</span>
                    <input type="text" value={state.fillText[1]} onChange={e => setState(s => ({ ...s, fillText: [state.fillText[0], e.target.value, state.fillText[2]] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-white font-bold shadow text-center" placeholder="Escribe aquí..." />
                    <span className="text-blue-100">por causa u ocasión del</span>
                    <input type="text" value={state.fillText[2]} onChange={e => setState(s => ({ ...s, fillText: [state.fillText[0], state.fillText[1], e.target.value] }))} className="border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl px-4 py-2 w-32 text-white font-bold shadow text-center" placeholder="Escribe aquí..." />
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 mt-12 w-full justify-center">
                    {/* ...existing code... */}
                    <span>💡</span>
                    <span className="text-white font-semibold">Recuerda: lesión, trabajador, trabajo</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105"
                  onClick={() => {
                    const correctFill = ['lesión', 'trabajador', 'trabajo'];
                    const isFillCorrect =
                      state.fillText.length === 3 &&
                      state.fillText[0].trim().toLowerCase() === 'lesión' &&
                      state.fillText[1].trim().toLowerCase() === 'trabajador' &&
                      state.fillText[2].trim().toLowerCase() === 'trabajo';
                    if (isFillCorrect) {
                      changeQuestion(1);
                    } else {
                      setShowFillError(true);
                    }
                  }}
                >
                  Siguiente
                </button>
                {/* Modal de error de definición */}
                {showFillError && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white/30 backdrop-blur-lg border border-blue-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
                      <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Respuesta incorrecta!</h4>
                      <p className="text-white mb-6 text-center font-semibold">La definición no es correcta.<br />Verifica el orden y las palabras.</p>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105 transition" onClick={() => setShowFillError(false)}>Reintentar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {/* Análisis textual */}
        {state.current === 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fade-in">
            <h3 className="font-bold text-xl mb-4 text-blue-200 drop-shadow text-center">Identifica los Riesgos</h3>
            <div className="mb-2 w-full max-w-4xl text-center mx-auto">Una oficina donde hay empleados trabajando en computadoras 8 horas al día, con sillas sin apoyo lumbar, pantallas muy brillantes, aires acondicionados que hacen mucho ruido, cables sueltos en el piso, y un ambiente de mucha presión por cumplir metas.</div>
            <div className="flex flex-col items-center mx-auto max-w-md">
              <img src="/img/situacion-nivel6.png" alt="Situación nivel 6" className="w-[500px] h-auto mb-4 rounded-xl shadow-lg object-contain border border-blue-200 bg-white/20" />
            </div>
            <div className="flex justify-center w-full">
              <textarea value={state.analysisText} onChange={e => setState(s => ({ ...s, analysisText: e.target.value }))} className="h-32 border border-blue-200 bg-white/40 backdrop-blur-md rounded-xl p-4 mb-4 text-white font-bold shadow max-w-2xl w-full" placeholder="Escribe tu análisis aquí..." />
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={() => changeQuestion(-1)}>Anterior</button>
              <button className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-green-200 hover:scale-105" onClick={() => {
                const wordCount = state.analysisText.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount < 5) {
                  setShowFillError(true);
                } else if (wordCount > 6) {
                  navigate('/achievement/6');
                } else {
                  validateQuiz();
                }
              }}>Finalizar</button>
            </div>
            {/* Modal de error de análisis corto */}
            {showFillError && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/30 backdrop-blur-lg border border-blue-200 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow">¡Tú análisis es muy corto!</h4>
                  <p className="text-white mb-6 text-center font-semibold">Por favor escribe al menos 5 palabras en tu análisis.</p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-xl font-bold shadow-lg border border-blue-200 hover:scale-105 transition" onClick={() => setShowFillError(false)}>Reintentar</button>
                </div>
              </div>
            )}
          </motion.div>

        )}
        {/* Resultados */}
        {state.current === 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} {...{ className: "fade-in" }}>
            <h3 className="font-bold text-2xl mb-4 text-green-300 drop-shadow">¡Quiz completado!</h3>
            <p className="mb-6 text-blue-100">Tu puntaje: <span className="font-bold text-green-400">{state.score}/5</span> ({Math.round((state.score / totalQuestions) * 100)}%)</p>
            <button className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg border border-green-200 hover:scale-105" onClick={restartQuiz}>Reiniciar Quiz</button>
            <button className="ml-4 bg-white/30 backdrop-blur-md text-blue-900 px-6 py-2 rounded-xl font-bold border border-blue-200 shadow" onClick={onClose}>Cerrar</button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default AccidentQuiz;
