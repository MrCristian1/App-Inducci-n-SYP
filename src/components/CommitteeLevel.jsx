import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../context/AppContext';
import { 
  faClipboardCheck, faSearch, faLightbulb, 
  faShieldAlt, faUsers, faComments, faHandshake, faStar, 
  faMedal, faIdCard, faBuilding, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const committees = [
  {
    name: 'COPASST',
    period: '2024 – 2026',
    description: 'Comité Paritario de Seguridad y Salud en el Trabajo',
    members: {
      workers: [
        { name: 'Tatiana Chavarro', img: '../../../img/Tatiana.png' },
        { name: 'Dayan Manjarres', img: '../../../img/Dayana.png' },
        { name: 'Germán Hincapié', img: '../../../img/German.png' },
      ],
      employer: [
        { name: 'Luisa Díaz', img: '../../../img/Luisa.png' },
        { name: 'Jennifer Cervantes', img: '../../../img/Jennifer.png' },
        { name: 'Ricardo Arámbulo', img: '../../../img/Ricardo.png' },
        { name: 'Eduard Forero', img: '../../../img/Eduard.png' },
      ],
    },
    functions: [
      { icon: faClipboardCheck, text: 'Hacer seguimiento al plan de trabajo anual.' },
      { icon: faSearch, text: 'Realizar la investigación y análisis de las causas de los accidentes de trabajo y enfermedades laborales.' },
      { icon: faLightbulb, text: 'Proponer y participar en actividades de capacitación en seguridad y salud en el trabajo.' },
      { icon: faShieldAlt, text: 'Proponer a la Dirección General la adopción de medidas y actividades para procurar, mantener y promover ambientes de trabajo seguros y saludables.' },
      { icon: faUsers, text: 'Realizar inspecciones periódicas en los lugares de trabajo.' },
    ],
  },
  {
    name: 'CCL',
    period: '2024 – 2026',
    description: 'Comité de Convivencia Laboral',
    members: {
      workers: [
        { name: 'Giovanna Gio', img: '../../../img/Giovanna.png' },
        { name: 'Yuly Peña', img: '../../../img/Yuly.png' },
        { name: 'Fabián Morales', img: '../../../img/Fabian.png' },
        { name: 'Rocío Guacamene', img: '../../../img/Rocio.png' },
      ],
      employer: [
        { name: 'Luisa Díaz', img: '../../../img/Luisa.png' },
        { name: 'Ricardo Arámbulo', img: '../../../img/Ricardo.png' },
        { name: 'Alfonso Fonseca', img: '../../../img/Alfonso.png' },
      ],
    },
    functions: [
      { icon: faComments, text: 'Escuchar a las partes involucradas de manera individual sobre los hechos que dieron lugar a la queja.' },
      { icon: faHandshake, text: 'Adelantar reuniones para crear espacios de diálogo entre las partes, promoviendo compromisos mutuos y soluciones efectivas a las controversias.' },
      { icon: faSearch, text: 'Examinar de manera confidencial los casos en los que se formulen quejas o reclamos que pudieran tipificar conductas o circunstancias de acoso laboral dentro de la empresa.' },
      { icon: faClipboardCheck, text: 'Recibir y dar trámite a las quejas sobre situaciones que puedan constituir acoso laboral, así como a las pruebas que las soporten.' },
      { icon: faLightbulb, text: 'Formular un plan de mejora concertado entre las partes, con el fin de construir, renovar y promover la convivencia laboral, garantizando siempre el principio de confidencialidad.' },
    ],
  },
];

const quizQuestions = [
  {
    type: 'case',
    question: 'Un trabajador ha reportado que está siendo objeto de burlas y comentarios despectivos por parte de sus compañeros de trabajo de manera constante.',
    options: [
      { committee: 'COPASST', text: 'Comité Paritario de Seguridad y Salud en el Trabajo' },
      { committee: 'CCL', text: 'Comité de Convivencia Laboral' }
    ],
    answer: 'CCL',
    explanation: 'Este es un caso que debe ser manejado por el CCL, ya que involucra una situación que podría constituir acoso laboral. El CCL es el encargado de examinar confidencialmente los casos relacionados con la convivencia y el acoso laboral.'
  },
  {
    type: 'case',
    question: 'Se ha presentado un incidente en el área de producción donde un equipo ha presentado fallas que podrían poner en riesgo la seguridad de los trabajadores.',
    options: [
      { committee: 'COPASST', text: 'Comité Paritario de Seguridad y Salud en el Trabajo' },
      { committee: 'CCL', text: 'Comité de Convivencia Laboral' }
    ],
    answer: 'COPASST',
    explanation: 'Este caso corresponde al COPASST, ya que está relacionado con la seguridad en el trabajo y la prevención de accidentes. El COPASST debe investigar y proponer medidas para mantener ambientes de trabajo seguros.'
  },
  {
    type: 'dragdrop',
    question: 'Arrastra cada integrante al comité al que pertenece',
    members: [
      { name: 'Tatiana Chavarro', committee: 'COPASST', img: '../../../img/Tatiana.png' },
      { name: 'Giovanna Gio', committee: 'CCL', img: '../../../img/Giovanna.png' },
      { name: 'Dayan Manjarres', committee: 'COPASST', img: '../../../img/Dayana.png' },
      { name: 'Yuly Peña', committee: 'CCL', img: '../../../img/Yuly.png' },
      { name: 'Germán Hincapié', committee: 'COPASST', img: '../../../img/German.png' },
      { name: 'Fabián Morales', committee: 'CCL', img: '../../../img/Fabian.png' }
    ],
    committees: ['COPASST', 'CCL']
  }
];

const sectionTabs = [
  { key: 'members', label: 'Miembros', icon: faIdCard },
  { key: 'functions', label: 'Funciones', icon: faBuilding },
  { key: 'quiz', label: 'Quiz', icon: faStar }
];

const StarField = () => {
  const [stars] = useState(Array(50).fill().map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
  })));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-star-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const CommitteeLevel = ({ onComplete }) => {
  const navigate = useNavigate();
  const { completeLevel } = useAppContext();
  const [section, setSection] = useState('members');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [droppedMembers, setDroppedMembers] = useState({
    COPASST: [],
    CCL: []
  });

  const handleTab = (tab) => {
    setSection(tab);
  };

  const handleSelect = (index) => {
    if (selected !== null) return;
    
    setSelected(index);
    const currentQuestion = quizQuestions[quizIndex];

    if (currentQuestion.type === 'case') {
      const isCorrect = currentQuestion.options[index].committee === currentQuestion.answer;
      if (isCorrect) {
        setStreak(streak + 1);
        setScore(score + (100 + (streak * 20)));
      } else {
        setStreak(0);
      }
    }
  };

  const handleDrop = (member, committee) => {
    if (quizQuestions[quizIndex].type !== 'dragdrop') return;

    // Evitar duplicados
    if (droppedMembers[committee].some(m => m.name === member.name)) return;

    setDroppedMembers(prev => ({
      ...prev,
      [committee]: [...prev[committee], member]
    }));

    const isCorrect = member.committee === committee;
    if (isCorrect) {
      setScore(score + 50);
    }
  };

  const handleRemoveMember = (memberName, committee) => {
    setDroppedMembers(prev => ({
      ...prev,
      [committee]: prev[committee].filter(m => m.name !== memberName)
    }));
  };

  const handleSubmit = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelected(null);
      if (quizQuestions[quizIndex + 1].type === 'dragdrop') {
        setDroppedMembers({ COPASST: [], CCL: [] });
      }
    } else {
      if (score >= 300) {
        // Si alcanzó el puntaje mínimo, completar el nivel y redirigir al achievement
        completeLevel(5);
        setTimeout(() => {
          onComplete();
          navigate('/achievement/5');
        }, 300);
      } else {
        setShowResult(true);
        setSection('result');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <StarField />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto py-10 px-10 animate-fade-in">
        {/* Botón Volver al Mapa */}
        <button
          onClick={() => navigate('/map')}
          className="absolute top-8 left-8 text-white hover:text-yellow-400 transition-colors flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Volver al Mapa</span>
        </button>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          {sectionTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 backdrop-blur-md border border-white/20 text-lg hover:scale-105 active:scale-95 ${
                section === tab.key 
                  ? 'bg-purple-500/30 text-purple-300 ring-2 ring-purple-400' 
                  : 'bg-white/10 text-white/80 hover:bg-purple-500/20'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sección de Miembros */}
        {section === 'members' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {committees.map(com => (
              <div
                key={com.name}
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-[1.02] min-w-[700px] animate-slide-up"
              >
                <h2 className="text-2xl font-bold text-purple-300 mb-2">
                  {com.name} 
                  <span className="text-white/60 text-base ml-2">{com.period}</span>
                </h2>
                <p className="text-white/80 mb-4">{com.description}</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">Representantes de los trabajadores</h3>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {com.members.workers.map((m, idx) => (
                        <div
                          key={m.name}
                          className="flex flex-col items-center gap-2 transform transition-all duration-200 hover:scale-105 animate-fade-in-up"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="w-24 h-24 rounded-full bg-purple-500/30 flex items-center justify-center shadow-md overflow-hidden">
                            <img 
                              src={m.img} 
                              alt={m.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-white/90 text-base text-center">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-violet-300 mb-4">Representantes del empleador</h3>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {com.members.employer.map((m, idx) => (
                        <div
                          key={m.name}
                          className="flex flex-col items-center gap-2 transform transition-all duration-200 hover:scale-105 animate-fade-in-up"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="w-24 h-24 rounded-full bg-violet-500/30 flex items-center justify-center shadow-md overflow-hidden">
                            <img 
                              src={m.img} 
                              alt={m.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-white/90 text-base text-center">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sección de Funciones */}
        {section === 'functions' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {committees.map(com => (
              <div
                key={com.name}
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-[1.02] min-w-[700px] animate-slide-up"
              >
                <h2 className="text-2xl font-bold text-purple-300 mb-2">{com.name}</h2>
                <p className="text-white/80 mb-4">{com.description}</p>
                <div className="flex flex-col gap-4">
                  {com.functions.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 bg-white/5 rounded-xl p-5 shadow transform transition-all duration-200 hover:scale-[1.02] hover:bg-purple-900/20 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-purple-300 text-3xl bg-purple-500/30">
                        <FontAwesomeIcon icon={f.icon} />
                      </div>
                      <div className="flex-1 flex items-center min-h-[3.5rem]">
                        <p className="text-white/90 text-base leading-relaxed w-full text-left">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sección de Quiz */}
        {section === 'quiz' && !showResult && (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl transform transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Quiz</h2>
            <div className="w-full mb-4">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-white/80">Puntaje: </span>
                <span className="text-purple-300 font-bold">{score}</span>
                {streak > 1 && (
                  <span className="ml-4 text-purple-400">🔥 Racha: {streak}</span>
                )}
              </div>
              <div className="text-white/80">
                Mínimo para pasar: <span className="text-purple-300 font-bold">300</span>
              </div>
            </div>

            {quizQuestions[quizIndex].type === 'case' ? (
              <>
                <div className="bg-white/5 rounded-xl p-6 mb-6 shadow-lg border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">📋 Caso de Estudio</h3>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">{quizQuestions[quizIndex].question}</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  {quizQuestions[quizIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`px-6 py-4 rounded-xl font-bold shadow-md transition-all duration-200 text-lg hover:scale-[1.02] active:scale-95 ${
                        selected === idx 
                          ? (opt.committee === quizQuestions[quizIndex].answer
                              ? 'bg-green-400 text-white' 
                              : 'bg-red-400 text-white'
                            ) 
                          : 'bg-white/10 text-white/80 hover:bg-purple-500/30 hover:text-purple-300'
                      }`}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-lg font-bold">{opt.committee}</span>
                        <span className="text-sm opacity-80">{opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {selected !== null && (
                  <div className="mt-6 text-center transition-all duration-300 transform animate-fade-in">
                    <div className={`text-lg font-semibold ${
                      quizQuestions[quizIndex].options[selected].committee === quizQuestions[quizIndex].answer
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {quizQuestions[quizIndex].options[selected].committee === quizQuestions[quizIndex].answer ? '¡Correcto!' : 'Incorrecto'}
                    </div>
                    <div className="text-white/80 mt-2 text-lg">{quizQuestions[quizIndex].explanation}</div>
                    <button
                      className="mt-4 px-6 py-2 rounded-xl bg-purple-500 text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                      onClick={handleSubmit}
                    >
                      {quizIndex < quizQuestions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                    </button>
                  </div>
                )}
              </>
            ) : quizQuestions[quizIndex].type === 'dragdrop' ? (
              <div className="bg-white/5 rounded-xl p-6 shadow-lg border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">🔄 Organiza los Integrantes</h3>
                <p className="text-white/90 text-lg leading-relaxed mb-6">{quizQuestions[quizIndex].question}</p>
                <div className="grid grid-cols-2 gap-6">
                  {quizQuestions[quizIndex].committees.map(committee => (
                    <div key={committee} className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-purple-300 font-bold mb-4 text-center">{committee}</h4>
                      <div 
                        className="min-h-[200px] bg-white/5 rounded-lg p-2"
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => {
                          e.preventDefault();
                          const member = JSON.parse(e.dataTransfer.getData('text'));
                          handleDrop(member, committee);
                        }}
                      >
                        {droppedMembers[committee].map(member => (
                          <div 
                            key={member.name}
                            className="px-4 py-2 mb-2 bg-purple-500/20 rounded-lg text-white flex items-center gap-3 animate-fade-in"
                            onClick={() => handleRemoveMember(member.name, committee)}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={member.img} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{member.name}</span>
                            <button className="text-white/60 hover:text-white ml-auto">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <h4 className="text-purple-300 font-bold mb-4 text-center">Integrantes</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {quizQuestions[quizIndex].members.filter(member => 
                      !Object.values(droppedMembers).flat().some(m => m.name === member.name)
                    ).map(member => (
                      <div
                        key={member.name}
                        className="px-4 py-2 bg-purple-500/20 rounded-lg text-white cursor-move hover:bg-purple-500/30 transition-colors flex items-center gap-3"
                        draggable
                        onDragStart={e => {
                          e.dataTransfer.setData('text', JSON.stringify(member));
                        }}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={member.img} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {member.name}
                      </div>
                    ))}
                  </div>
                </div>
                {droppedMembers.COPASST.length + droppedMembers.CCL.length === quizQuestions[quizIndex].members.length && (
                  <div className="mt-6 flex justify-center">
                    <button
                      className="px-6 py-2 rounded-xl bg-purple-500 text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                      onClick={handleSubmit}
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Sección de Resultados */}
        {section === 'result' && (
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl flex flex-col items-center transform transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">Resultados</h2>
            <div className="mb-4 text-white/80 text-lg">
              Puntaje final: <span className="text-purple-300 font-bold">{score}</span>
            </div>
            <div className="mb-6">
              {score >= 400 ? (
                <span className="text-green-400 font-bold text-xl flex items-center gap-2">
                  <FontAwesomeIcon icon={faMedal} /> ¡Medalla de oro!
                </span>
              ) : score >= 300 ? (
                <span className="text-purple-400 font-bold text-xl flex items-center gap-2">
                  <FontAwesomeIcon icon={faMedal} /> ¡Medalla de plata!
                </span>
              ) : (
                <span className="text-gray-300 font-bold text-xl flex items-center gap-2">
                  <FontAwesomeIcon icon={faMedal} /> ¡Sigue practicando!
                </span>
              )}
            </div>
            <button
              className="px-6 py-2 rounded-xl bg-purple-500 text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={onComplete}
            >
              Completar nivel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommitteeLevel;
