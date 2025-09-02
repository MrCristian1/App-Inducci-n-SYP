import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Contexto para el estado global de la aplicación
import { AppProvider } from './context/AppContext'

// Páginas
import Welcome from './pages/Welcome'
import Map from './pages/Map'
import LevelContent from './pages/LevelContent'
import Achievement from './pages/Achievement'
import FinalAchievement from './pages/FinalAchievement'

function App() {
  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/map" element={<Map />} />
          <Route path="/level/:levelId" element={<LevelContent />} />
          <Route path="/achievement/:levelId" element={<Achievement />} />
          <Route path="/final-achievement" element={<FinalAchievement />} />
        </Routes>
      </AnimatePresence>
    </AppProvider>
  )
}

export default App