import React from 'react';
import { motion } from 'framer-motion';
import Clock from './Clock';
import { HandPosition, digitFont } from '../fonts/digitFont';

interface DigitProps {
  digit: number;
  animate?: boolean;
  manual?: boolean;
}

const Digit: React.FC<DigitProps> = ({ digit, animate = false, manual = false }) => {
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
                animate={animate}
                manual={manual}
                onAnglesChange={(h, m) => {
                  if (manual) {
                    console.log(`Digit ${digit}, Clock ${rowIndex}-${colIndex}:`, h, m);
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default Digit; 