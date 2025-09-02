import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';

const QuizOption = ({ option, isSelected, isCorrect, isIncorrect, onClick, disabled }) => {
  let bgColor = 'bg-white';
  let borderColor = 'border-gray-200';
  let textColor = 'text-gray-700';
  let iconColor = 'text-gray-400';
  let icon = faCircle;
  
  if (isSelected) {
    if (isCorrect) {
      bgColor = 'bg-success bg-opacity-10';
      borderColor = 'border-success';
      textColor = 'text-success';
      iconColor = 'text-success';
      icon = faCheck;
    } else if (isIncorrect) {
      bgColor = 'bg-warning bg-opacity-10';
      borderColor = 'border-warning';
      textColor = 'text-warning';
      iconColor = 'text-warning';
      icon = faTimes;
    } else {
      bgColor = 'bg-primary bg-opacity-10';
      borderColor = 'border-primary';
      textColor = 'text-primary';
      iconColor = 'text-primary';
      icon = faCheck;
    }
  }
  
  return (
    <motion.div
      className={`p-4 border-2 ${borderColor} rounded-xl ${bgColor} ${textColor} cursor-pointer flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div 
          className={`w-6 h-6 rounded-full border-2 ${isSelected ? borderColor : 'border-gray-300'} flex items-center justify-center mr-3 ${iconColor}`}
          initial={false}
          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isSelected && <FontAwesomeIcon icon={icon} size="xs" />}
        </motion.div>
        <span className="font-medium">{option}</span>
      </div>
      
      {isCorrect && (
        <motion.div 
          className="bg-success text-white text-xs px-2 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Correcto
        </motion.div>
      )}
      
      {isIncorrect && (
        <motion.div 
          className="bg-warning text-white text-xs px-2 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Incorrecto
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizOption;