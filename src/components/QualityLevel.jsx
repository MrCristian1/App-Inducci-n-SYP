import React, { useMemo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBullseye, faScroll, faClipboardList, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const QualityLevel = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [currentGameWord, setCurrentGameWord] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const maxWrongGuesses = 6;
  
  // Generar estrellas animadas
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  const timelineData = [
    {
      id: 1,
      icon: faBullseye,
      emoji: '🎯',
      title: 'Objetivos del Sistema de Gestión de la Calidad',
      summary: 'Tres pilares fundamentales para el éxito organizacional',
      position: 'left',
      content: {
        objectives: [
          {
            title: 'Mejoramiento Continuo',
            description: 'Cerrar eficazmente las acciones de mejora para lograr el mejoramiento continuo de los procesos'
          },
          {
            title: 'Fidelización de Clientes',
            description: 'Garantizar el cumplimiento de los compromisos adquiridos para lograr la fidelización de nuestros clientes'
          },
          {
            title: 'Gestión Interna',
            description: 'Garantizar el cumplimiento de la gestión interna para soportar adecuadamente la operación'
          }
        ]
      }
    },
    {
      id: 2,
      icon: faScroll,
      emoji: '📜',
      title: 'Certificación ISO 9001:2015',
      summary: 'Historia de implementación y beneficios obtenidos',
      position: 'right',
      content: {
        year: '2015',
        description: 'En el año 2015 se toma la decisión de implementar el Sistema de Gestión de la Calidad bajo los lineamientos de la Norma ISO 9001:2015; buscando la mejora continua del servicio; con el fin de generar confianza en los clientes y consolidar a la compañía para los desafíos que representa enfrentarse a un mercado donde prima la competitividad y la globalización.',
        benefits: [
          'Mejora continua del servicio',
          'Generación de confianza en los clientes',
          'Consolidación empresarial',
          'Preparación para mercados competitivos',
          'Adaptación a la globalización'
        ]
      }
    },
    {
      id: 3,
      icon: faClipboardList,
      emoji: '📋',
      title: 'Buenas Prácticas Documentales',
      summary: 'Estándares y procedimientos para la documentación',
      position: 'left',
      content: {
        documentalPractices: [
          {
            category: 'Documentos y registros',
            description: 'Asegurar que estén identificados, actualizados, disponibles y protegidos, no se pueden modificar sin autorización del líder del proceso'
          },
          {
            category: 'Acceso y conservación',
            description: 'Garantizar que solo personal autorizado tenga acceso a las carpetas y a las versiones vigentes'
          },
          {
            category: 'Eliminación controlada',
            description: 'Asegurar el retiro o anulación de documentos obsoletos para evitar su uso indebido'
          },
          {
            category: 'Espacios en blanco',
            description: 'Todos los espacios en formatos deben ser diligenciados, en caso de no requerirse se debe escribir "No aplica"'
          },
          {
            category: 'Soporte de evidencia',
            description: 'Todo registro debe ser legible, verificable y conservarse como evidencia del cumplimiento del sistema'
          }
        ],
        typography: {
          font: 'Calibri',
          textSize: '11.5',
          titleSize: '14',
          lineHeight: '1.0',
          color: 'Negro'
        }
      }
    }
  ];

  // Datos del juego de ahorcado
  const gameWords = [
    {
      word: "MEJORA CONTINUA",
      hint: "Cerrar eficazmente las acciones de mejora para lograr el mejoramiento continuo de los procesos",
      explanation: "La mejora continua es uno de los tres pilares fundamentales del Sistema de Gestión de Calidad.",
      badge: "🏅 Guardián de la Calidad"
    },
    {
      word: "CERTIFICACION",
      hint: "Proceso que valida el cumplimiento de estándares internacionales de calidad",
      explanation: "La certificación ISO 9001:2015 nos permite demostrar nuestro compromiso con la calidad.",
      badge: "🎖️ Experto en Certificación"
    },
    {
      word: "EVIDENCIA",
      hint: "Todo registro debe ser legible, verificable y conservarse como prueba del cumplimiento del sistema",
      explanation: "La evidencia documenta que los procesos se ejecutan según los estándares establecidos.",
      badge: "📂 Maestro de Documentos"
    },
    {
      word: "FIDELIZACION",
      hint: "Garantizar el cumplimiento de los compromisos adquiridos con nuestros clientes",
      explanation: "La fidelización es clave para mantener relaciones duraderas con nuestros clientes.",
      badge: "💝 Campeón de Clientes"
    },
    {
      word: "ELIMINACION CONTROLADA",
      hint: "Asegurar el retiro o anulación de documentos obsoletos para evitar su uso indebido",
      explanation: "El control de documentos obsoletos previene errores y mantiene la información actualizada.",
      badge: "🔒 Experto en Control de Acceso"
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Funciones del juego
  const startNewGame = () => {
    setCurrentGameWord(Math.floor(Math.random() * gameWords.length));
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameWon(false);
    setGameLost(false);
    setShowHint(false);
  };

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter) || gameWon || gameLost) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    const currentWord = gameWords[currentGameWord].word;
    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= maxWrongGuesses) {
        setGameLost(true);
      }
    } else {
      // Verificar si ganó
      const wordLetters = currentWord.replace(/\s/g, '').split('');
      if (wordLetters.every(l => newGuessedLetters.includes(l))) {
        setGameWon(true);
      }
    }
  };

  const displayWord = () => {
    const word = gameWords[currentGameWord].word;
    return word.split('').map(letter => {
      if (letter === ' ') return ' ';
      return guessedLetters.includes(letter) ? letter : '_';
    }).join(' ');
  };

  const resetGame = () => {
    setShowGame(false);
    startNewGame();
  };

  // Inicializar el juego cuando se monte el componente
  useEffect(() => {
    startNewGame();
  }, []);

  // Renderizar el juego
  const renderGame = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header del juego */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">🎮 Juego de Calidad</h2>
            <p className="text-white/80">Adivina las palabras clave del Sistema de Gestión de Calidad</p>
          </div>

          {/* Candado/Progreso */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">
              {wrongGuesses === 0 && "🔓"}
              {wrongGuesses === 1 && "🔐"}
              {wrongGuesses === 2 && "🔒"}
              {wrongGuesses >= 3 && wrongGuesses < 5 && "⛓️"}
              {wrongGuesses >= 5 && "🔴"}
            </div>
            <div className="text-white/70">
              Intentos restantes: {maxWrongGuesses - wrongGuesses}
            </div>
          </div>

          {/* Palabra a adivinar */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white tracking-wider font-mono">
              {showGame && gameWords[currentGameWord] ? displayWord() : ''}
            </div>
          </div>

          {/* Pista */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500/20 text-yellow-200 px-4 py-2 rounded-xl border border-yellow-500/30 hover:bg-yellow-500/30 transition-all"
            >
              {showHint ? '🔍 Ocultar Pista' : '💡 Ver Pista'}
            </button>
            {showHint && gameWords[currentGameWord] && (
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/80 italic">"{gameWords[currentGameWord].hint}"</p>
              </div>
            )}
          </div>

          {/* Alfabeto */}
          {!gameWon && !gameLost && (
            <div className="grid grid-cols-6 md:grid-cols-9 gap-2 mb-6">
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => guessLetter(letter)}
                  disabled={guessedLetters.includes(letter)}
                  className={`
                    w-10 h-10 rounded-xl font-bold transition-all duration-300
                    ${guessedLetters.includes(letter)
                      ? gameWords[currentGameWord]?.word.includes(letter)
                        ? 'bg-green-500/30 text-green-200 border-green-400/50'
                        : 'bg-red-500/30 text-red-200 border-red-400/50'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                    }
                    border backdrop-blur-sm
                  `}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}

          {/* Mensaje de victoria */}
          {gameWon && gameWords[currentGameWord] && (
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">¡Excelente!</h3>
              <div className="bg-green-500/20 p-4 rounded-xl border border-green-500/30 mb-4">
                <p className="text-green-200 mb-2">{gameWords[currentGameWord].badge}</p>
                <p className="text-white/80 text-sm italic">"{gameWords[currentGameWord].explanation}"</p>
              </div>
            </div>
          )}

          {/* Mensaje de derrota */}
          {gameLost && gameWords[currentGameWord] && (
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">¡Sigue intentando!</h3>
              <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/30 mb-4">
                <p className="text-red-200 mb-2">La respuesta era: <strong>{gameWords[currentGameWord].word}</strong></p>
                <p className="text-white/80 text-sm italic">"{gameWords[currentGameWord].explanation}"</p>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {gameWon && (
              <button
                onClick={() => navigate('/achievement/7')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105"
              >
                🏆 Reclamar Logro
              </button>
            )}
            {gameLost && (
              <button
                onClick={startNewGame}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all"
              >
                🎮 Jugar de Nuevo
              </button>
            )}
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
            >
              ← Volver al Timeline
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-[Calibri] text-gray-100">
      {/* Fondo y estrellas */}
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
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors font-semibold text-lg cursor-pointer focus:outline-none px-4 py-2 rounded-xl animate-slide-in-left"
          style={{ minHeight: '48px', lineHeight: '1.5', animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Volver al mapa</span>
        </button>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-32 pb-16 px-4">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in-down">
            Sistema de Gestión de Calidad
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            ISO 9001:2015 - Comprometidos con la excelencia y mejora continua
          </p>
        </div>

        {/* Timeline vertical */}
        <div className="max-w-6xl mx-auto relative">
          {/* Línea central del timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 opacity-60 h-full rounded-full animate-timeline-draw"></div>
          
          {/* Tarjetas del timeline */}
          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center ${item.position === 'left' ? 'justify-start' : 'justify-end'} ${item.position === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
                style={{ 
                  animationDelay: `${0.6 + index * 0.3}s`, 
                  animationFillMode: 'both' 
                }}
              >
                {/* Tarjeta */}
                <div className={`w-full md:w-5/12 ${item.position === 'right' ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-purple-500/20">
                    {/* Header de la tarjeta */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{item.emoji}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/70 text-sm">{item.summary}</p>
                        </div>
                        <div>
                          <FontAwesomeIcon 
                            icon={expandedCard === item.id ? faChevronUp : faChevronDown} 
                            className="text-white/70"
                          />
                        </div>
                      </div>
                      
                      <button 
                        className="mt-4 w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white py-2 px-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                        onClick={() => toggleCard(item.id)}
                      >
                        {expandedCard === item.id ? 'Cerrar detalles' : 'Ver detalles'}
                      </button>
                    </div>

                    {/* Contenido expandible */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedCard === item.id 
                          ? 'max-h-screen opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className={`p-6 space-y-6 transform transition-all duration-300 ${
                        expandedCard === item.id 
                          ? 'translate-y-0 opacity-100' 
                          : '-translate-y-4 opacity-0'
                      }`}>
                          {/* Contenido para Objetivos */}
                          {item.id === 1 && (
                            <div className="grid gap-4">
                              {item.content.objectives.map((obj, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                                >
                                  <h4 className="font-bold text-white mb-2">{obj.title}</h4>
                                  <p className="text-white/80 text-sm">{obj.description}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Contenido para Certificación */}
                          {item.id === 2 && (
                            <div className="space-y-4">
                              <div className="text-center">
                                <p className="text-white/80 mb-6">{item.content.description}</p>
                                <img 
                                  src="/img/iso9001.png" 
                                  alt="ISO 9001:2015 Certification" 
                                  className="max-w-xs w-full h-auto rounded-lg shadow-2xl mx-auto mb-6 animate-fade-in-up"
                                  style={{
                                    animationDelay: '0.3s',
                                    animationFillMode: 'both'
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-white mb-3">Beneficios obtenidos:</h4>
                                <ul className="space-y-2">
                                  {item.content.benefits.map((benefit, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center text-white/80 text-sm"
                                    >
                                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Contenido para Buenas Prácticas */}
                          {item.id === 3 && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-bold text-white mb-4">Prácticas Documentales:</h4>
                                <div className="grid gap-3">
                                  {item.content.documentalPractices.map((practice, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white/5 p-3 rounded-lg border border-white/10"
                                    >
                                      <h5 className="font-semibold text-white text-sm mb-1">{practice.category}</h5>
                                      <p className="text-white/70 text-xs">{practice.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white mb-3">Estándares Tipográficos:</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="text-white/80">
                                    <span className="font-semibold">Tipografía:</span> {item.content.typography.font}
                                  </div>
                                  <div className="text-white/80">
                                    <span className="font-semibold">Tamaño texto:</span> {item.content.typography.textSize}
                                  </div>
                                  <div className="text-white/80">
                                    <span className="font-semibold">Títulos:</span> {item.content.typography.titleSize}
                                  </div>
                                  <div className="text-white/80">
                                    <span className="font-semibold">Interlineado:</span> {item.content.typography.lineHeight}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                  </div>
                </div>

                {/* Nodo del timeline */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white/20 shadow-lg z-10 animate-scale-in"
                  style={{ 
                    animationDelay: `${0.8 + index * 0.3}s`, 
                    animationFillMode: 'both' 
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white/30 flex items-center justify-center">
                    <FontAwesomeIcon icon={item.icon} className="text-white text-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Iniciar Juego */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowGame(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-soft"
            style={{ 
              animationDelay: '2s', 
              animationFillMode: 'both' 
            }}
          >
            🎮 Iniciar Juego de Calidad
          </button>
        </div>
      </div>

      {/* Renderizar el juego si está activo */}
      {showGame && renderGame()}

      {/* Animaciones personalizadas */}
      <style>{`
        @keyframes star-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideOutToTop {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        .animate-star-pulse {
          animation: star-pulse 3s infinite;
        }
        
        .animate-slide-in {
          animation: slideInFromTop 0.3s ease-out forwards;
        }
        
        .animate-slide-out {
          animation: slideOutToTop 0.3s ease-in forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        
        @keyframes timelineDraw {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            height: 100%;
            opacity: 0.6;
          }
        }
        
        .animate-timeline-draw {
          animation: timelineDraw 1.5s ease-out 0.5s both;
        }
        
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-pulse-soft {
          animation: pulseSoft 2s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .font-[Calibri] { font-family: 'Calibri', Arial, sans-serif; }
        }
      `}</style>
    </div>
  );
};

export default QualityLevel;
