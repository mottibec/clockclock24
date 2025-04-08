import React from 'react';
import { motion } from 'framer-motion';
import Clock from './Clock';
import { HandPosition, digitFont } from '../fonts/digitFont';

interface DigitProps {
  digit: number;
}

const Digit: React.FC<DigitProps> = ({ digit }) => {
  // Get the layout for the current digit from the digit font
  const layout: HandPosition[][] = digitFont[digit.toString()] || 
    Array(3).fill(null).map(() => 
      Array(2).fill({ hour: 0, minute: 0 })
    );

  return (
    <motion.div 
      className="digit"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="digit-row">
          {row.map((clock, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: (rowIndex * 2 + colIndex) * 0.1
              }}
            >
              <Clock
                hourAngle={clock.hour}
                minuteAngle={clock.minute}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default Digit; 