/**
 * Aplicación principal para la plataforma de inducción
 * Maneja la navegación entre pantallas, el progreso del usuario y la interacción con los quizzes
 */

// Estado global de la aplicación
const appState = {
    currentLevel: 1,
    completedLevels: [],
    currentQuizIndex: 0,
    selectedAnswers: [],
    userProgress: 0
};

// Elementos DOM
const elements = {
    screens: {
        welcome: document.getElementById('welcome-screen'),
        map: document.getElementById('map-screen'),
        levelContent: document.getElementById('level-content-screen'),
        achievement: document.getElementById('achievement-screen')
    },
    welcome: {
        startButton: document.getElementById('start-button')
    },
    map: {
        progressPercentage: document.getElementById('progress-percentage'),
        levelNodes: document.querySelectorAll('.level-node'),
        progressPath: document.querySelector('.progress-path')
    },
    levelContent: {
        backButton: document.getElementById('back-to-map'),
        levelTitle: document.getElementById('level-title'),
        levelProgressText: document.getElementById('level-progress-text'),
        levelInfo: document.getElementById('level-info'),
        levelQuiz: document.getElementById('level-quiz'),
        quizContainer: document.getElementById('quiz-container'),
        submitButton: document.getElementById('submit-answers')
    },
    achievement: {
        icon: document.getElementById('achievement-icon'),
        levelName: document.getElementById('completed-level-name'),
        text: document.getElementById('achievement-text'),
        continueButton: document.getElementById('continue-button'),
        confetti: document.querySelector('.confetti')
    }
};

// Inicialización de la aplicación
function initApp() {
    // Cargar progreso guardado si existe
    loadProgress();
    
    // Actualizar la interfaz según el progreso
    updateProgressUI();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Generar elementos de confeti para animaciones
    generateConfetti();
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botón de inicio en la pantalla de bienvenida
    elements.welcome.startButton.addEventListener('click', () => {
        navigateToScreen('map');
    });
    
    // Botón de regreso al mapa
    elements.levelContent.backButton.addEventListener('click', () => {
        navigateToScreen('map');
    });
    
    // Botón para continuar después de un logro
    elements.achievement.continueButton.addEventListener('click', () => {
        navigateToScreen('map');
    });
    
    // Botón para enviar respuestas del quiz
    elements.levelContent.submitButton.addEventListener('click', checkQuizAnswers);
    
    // Event listeners para los nodos de nivel en el mapa
    elements.map.levelNodes.forEach(node => {
        node.addEventListener('click', () => {
            const levelId = parseInt(node.dataset.level);
            
            // Solo permitir acceso a niveles desbloqueados
            if (!node.classList.contains('locked')) {
                appState.currentLevel = levelId;
                loadLevelContent(levelId);
                navigateToScreen('levelContent');
            }
        });
    });
}

// Navegar entre pantallas
function navigateToScreen(screenName) {
    // Ocultar todas las pantallas
    Object.values(elements.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    elements.screens[screenName].classList.add('active');
    
    // Acciones específicas según la pantalla
    if (screenName === 'map') {
        updateProgressUI();
    }
}

// Cargar el contenido de un nivel específico
function loadLevelContent(levelId) {
    const level = inductionData.levels.find(level => level.id === levelId);
    
    if (!level) return;
    
    // Actualizar título y progreso
    elements.levelContent.levelTitle.textContent = level.title;
    elements.levelContent.levelProgressText.textContent = `${levelId}/${inductionData.config.totalLevels}`;
    
    // Cargar contenido informativo
    elements.levelContent.levelInfo.innerHTML = level.content;
    
    // Ocultar el quiz inicialmente
    elements.levelContent.levelQuiz.classList.add('hidden');
    
    // Configurar el botón para mostrar el quiz
    const showQuizBtn = document.getElementById('show-quiz-btn');
    if (showQuizBtn) {
        showQuizBtn.addEventListener('click', () => {
            showQuiz(levelId);
        });
    }
}

// Mostrar el quiz de un nivel
function showQuiz(levelId) {
    const level = inductionData.levels.find(level => level.id === levelId);
    
    if (!level) return;
    
    // Mostrar la sección de quiz
    elements.levelContent.levelInfo.classList.add('hidden');
    elements.levelContent.levelQuiz.classList.remove('hidden');
    
    // Reiniciar el estado del quiz
    appState.currentQuizIndex = 0;
    appState.selectedAnswers = [];
    
    // Generar las preguntas del quiz
    generateQuizQuestions(level.quiz);
}

// Generar las preguntas del quiz
function generateQuizQuestions(questions) {
    // Limpiar el contenedor de preguntas
    elements.levelContent.quizContainer.innerHTML = '';
    
    // Generar HTML para cada pregunta
    questions.forEach((question, index) => {
        const questionHTML = `
            <div class="quiz-question" data-question-index="${index}">
                <h4>${index + 1}. ${question.question}</h4>
                <div class="quiz-options">
                    ${question.options.map((option, optIndex) => `
                        <div class="quiz-option" data-option-index="${optIndex}">
                            <input type="radio" name="question-${index}" id="option-${index}-${optIndex}">
                            <label for="option-${index}-${optIndex}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        elements.levelContent.quizContainer.innerHTML += questionHTML;
    });
    
    // Agregar event listeners a las opciones
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            const questionIndex = parseInt(option.parentElement.parentElement.dataset.questionIndex);
            const optionIndex = parseInt(option.dataset.optionIndex);
            
            // Marcar la opción seleccionada
            const questionOptions = document.querySelectorAll(`.quiz-question[data-question-index="${questionIndex}"] .quiz-option`);
            questionOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Guardar la respuesta seleccionada
            appState.selectedAnswers[questionIndex] = optionIndex;
            
            // Marcar el radio button
            const radioButton = option.querySelector('input[type="radio"]');
            radioButton.checked = true;
        });
    });
}

// Verificar las respuestas del quiz
function checkQuizAnswers() {
    const level = inductionData.levels.find(level => level.id === appState.currentLevel);
    
    if (!level) return;
    
    // Verificar si se han respondido todas las preguntas
    if (appState.selectedAnswers.length < level.quiz.length) {
        alert('Por favor responde todas las preguntas antes de continuar.');
        return;
    }
    
    // Contar respuestas correctas
    let correctAnswers = 0;
    
    appState.selectedAnswers.forEach((selectedAnswer, index) => {
        const correctAnswer = level.quiz[index].correctAnswer;
        
        // Marcar visualmente las respuestas correctas e incorrectas
        const questionElement = document.querySelector(`.quiz-question[data-question-index="${index}"]`);
        const selectedOption = questionElement.querySelector(`.quiz-option[data-option-index="${selectedAnswer}"]`);
        const correctOption = questionElement.querySelector(`.quiz-option[data-option-index="${correctAnswer}"]`);
        
        if (selectedAnswer === correctAnswer) {
            selectedOption.classList.add('correct');
            correctAnswers++;
        } else {
            selectedOption.classList.add('incorrect');
            correctOption.classList.add('correct');
        }
    });
    
    // Deshabilitar interacción con el quiz
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    elements.levelContent.submitButton.disabled = true;
    
    // Verificar si el usuario ha pasado el quiz
    const requiredCorrect = inductionData.config.requiredCorrectAnswers;
    
    setTimeout(() => {
        if (correctAnswers >= requiredCorrect) {
            // Marcar el nivel como completado
            if (!appState.completedLevels.includes(appState.currentLevel)) {
                appState.completedLevels.push(appState.currentLevel);
                saveProgress();
            }
            
            // Mostrar pantalla de logro
            showAchievement(level.achievement, level.title);
        } else {
            alert(`Necesitas al menos ${requiredCorrect} respuestas correctas para avanzar. Obtenido: ${correctAnswers}. Intenta nuevamente.`);
            
            // Reiniciar el quiz
            setTimeout(() => {
                showQuiz(appState.currentLevel);
            }, 1000);
        }
    }, 1500); // Dar tiempo para ver las respuestas marcadas
}

// Mostrar la pantalla de logro
function showAchievement(achievement, levelTitle) {
    // Configurar la información del logro
    elements.achievement.icon.className = `fas ${achievement.icon}`;
    elements.achievement.levelName.textContent = levelTitle;
    elements.achievement.text.textContent = achievement.description;
    
    // Animar el confeti
    document.querySelectorAll('.confetti-piece').forEach(piece => {
        piece.style.animation = 'none';
        setTimeout(() => {
            piece.style.animation = 'confetti 3s ease-in-out forwards';
        }, 10);
    });
    
    // Mostrar la pantalla de logro
    navigateToScreen('achievement');
    
    // Si se han completado todos los niveles, mostrar el logro final
    if (appState.completedLevels.length === inductionData.config.totalLevels) {
        elements.achievement.icon.className = `fas ${inductionData.finalAchievement.icon}`;
        elements.achievement.levelName.textContent = 'todos los niveles';
        elements.achievement.text.textContent = inductionData.finalAchievement.description;
    }
}

// Actualizar la interfaz según el progreso del usuario
function updateProgressUI() {
    // Calcular el porcentaje de progreso
    const progressPercentage = Math.round((appState.completedLevels.length / inductionData.config.totalLevels) * 100);
    appState.userProgress = progressPercentage;
    
    // Actualizar el texto de progreso
    elements.map.progressPercentage.textContent = `${progressPercentage}%`;
    
    // Actualizar la barra de progreso en el mapa
    elements.map.progressPath.style.setProperty('--progress-height', `${progressPercentage}%`);
    
    // Actualizar los nodos de nivel en el mapa
    elements.map.levelNodes.forEach(node => {
        const levelId = parseInt(node.dataset.level);
        
        // Reiniciar clases
        node.classList.remove('active', 'completed', 'locked');
        
        // Aplicar clases según el estado
        if (appState.completedLevels.includes(levelId)) {
            node.classList.add('completed');
        } else if (levelId === 1 || appState.completedLevels.includes(levelId - 1)) {
            node.classList.add('active');
        } else {
            node.classList.add('locked');
        }
    });
}

// Generar elementos de confeti para animaciones
function generateConfetti() {
    const confettiContainer = elements.achievement.confetti;
    
    // Limpiar el contenedor
    confettiContainer.innerHTML = '';
    
    // Generar piezas de confeti
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        // Posición aleatoria
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 20}%`;
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        piece.style.width = `${size}px`;
        piece.style.height = `${size}px`;
        
        // Forma aleatoria (cuadrado o círculo)
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Color aleatorio (usando los colores de la empresa)
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', 'var(--success-color)'];
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Retraso aleatorio
        piece.style.animationDelay = `${Math.random() * 2}s`;
        
        confettiContainer.appendChild(piece);
    }
}

// Guardar el progreso del usuario en localStorage
function saveProgress() {
    const progressData = {
        completedLevels: appState.completedLevels,
        userProgress: appState.userProgress
    };
    
    localStorage.setItem('inductionProgress', JSON.stringify(progressData));
}

// Cargar el progreso guardado
function loadProgress() {
    const savedProgress = localStorage.getItem('inductionProgress');
    
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        appState.completedLevels = progressData.completedLevels || [];
        appState.userProgress = progressData.userProgress || 0;
    }
}

// Iniciar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initApp);