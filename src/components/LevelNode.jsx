import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons'

const LevelNode = ({ level, icon, isCompleted, isUnlocked, isActive, onClick }) => {
  return (
    <motion.div 
      className={`level-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
      onClick={() => isUnlocked && onClick()}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
    >
      <motion.div 
        className="node-circle"
        animate={isCompleted ? { 
          scale: [1, 1.2, 1],
          backgroundColor: ['#ffffff', '#2a9d8f', '#2a9d8f'],
          borderColor: ['#457b9d', '#2a9d8f', '#2a9d8f'],
          color: ['#457b9d', '#ffffff', '#ffffff']
        } : {}}
        transition={{ duration: 0.8 }}
      >
        {isCompleted ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : !isUnlocked ? (
          <FontAwesomeIcon icon={faLock} />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </motion.div>
      <div className="node-label max-w-xs">{level}</div>
    </motion.div>
  )
}

export default LevelNode