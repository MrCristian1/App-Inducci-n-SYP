import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { levelsData, companyConfig, finalAchievement } from '../data/appData'

const AppContext = createContext()

// Definir el hook fuera para mantener la referencia consistente
const useAppContext = () => useContext(AppContext)
export { useAppContext }

export const AppProvider = ({ children }) => {
  // Estado para el progreso del usuario
  const [completedLevels, setCompletedLevels] = useState([])
  const [currentLevel, setCurrentLevel] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [userName, setUserName] = useState('')
  
  // Calcular el porcentaje de progreso
  const progressPercentage = Math.round((completedLevels.length / levelsData.length) * 100)
  
  // Verificar si todos los niveles están completados
  const allLevelsCompleted = completedLevels.length === levelsData.length
  
  // Cargar el progreso guardado al iniciar
  useEffect(() => {
    const savedProgress = localStorage.getItem('inductionProgress')
    if (savedProgress) {
      const { completed, current, userName: savedUserName } = JSON.parse(savedProgress)
      setCompletedLevels(completed || [])
      setCurrentLevel(current || null)
      setUserName(savedUserName || '')
    }
  }, [])
  
  // Guardar el progreso cuando cambie
  useEffect(() => {
    localStorage.setItem('inductionProgress', JSON.stringify({
      completed: completedLevels,
      current: currentLevel,
      userName: userName
    }))
  }, [completedLevels, currentLevel, userName])
  
  // Marcar un nivel como completado
  const completeLevel = useCallback((levelId) => {
    if (!completedLevels.includes(levelId)) {
      const newCompletedLevels = [...completedLevels, levelId]
      setCompletedLevels(newCompletedLevels)
    }
  }, [completedLevels])
  
  // Verificar si un nivel está desbloqueado
  const isLevelUnlocked = useCallback((levelId) => {
    // El primer nivel siempre está desbloqueado
    if (levelId === 1) return true
    
    // Los demás niveles se desbloquean en orden
    const isUnlocked = completedLevels.includes(levelId - 1) || completedLevels.includes(levelId)
    return isUnlocked
  }, [completedLevels])
  
  // Seleccionar una respuesta de quiz
  const selectQuizAnswer = useCallback((questionIndex, optionIndex) => {
    setQuizAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }))
  }, [])
  
  // Verificar respuestas del quiz
  const checkQuizAnswers = useCallback((levelId) => {
    const level = levelsData.find(level => level.id === levelId)
    if (!level || !level.quiz) return { correct: 0, total: 0, passed: false }
    
    let correctAnswers = 0
    const totalQuestions = level.quiz.length
    
    level.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    // Se considera aprobado si tiene al menos 70% de respuestas correctas
    const passed = (correctAnswers / totalQuestions) >= 0.7
    
    // Si aprobó, marcar el nivel como completado
    if (passed) {
      completeLevel(levelId)
    }
    
    return { correct: correctAnswers, total: totalQuestions, passed }
  }, [quizAnswers, completeLevel])
  
  // Reiniciar las respuestas del quiz (memoizado para evitar recreaciones)
  const resetQuizAnswers = useCallback(() => {
    setQuizAnswers({})
  }, [])
  
  // Reiniciar todo el progreso (memoizado para evitar recreaciones)
  const resetProgress = useCallback(() => {
    setCompletedLevels([])
    setCurrentLevel(null)
    setQuizAnswers({})
    setUserName('')
    localStorage.removeItem('inductionProgress')
  }, [])
  
  const value = {
    companyConfig,
    levelsData,
    currentLevel,
    setCurrentLevel,
    completedLevels,
    progressPercentage,
    allLevelsCompleted,
    isLevelUnlocked,
    completeLevel,
    quizAnswers,
    selectQuizAnswer,
    checkQuizAnswers,
    resetQuizAnswers,
    resetProgress,
    finalAchievement,
    userName,
    setUserName
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}