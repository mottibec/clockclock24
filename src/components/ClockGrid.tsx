import React from 'react';
import { motion } from 'framer-motion';
import Digit from './Digit';

interface ClockGridProps {
  time: string; // Format: "HH:MM"
}

const ClockGrid: React.FC<ClockGridProps> = ({ time }) => {
  const digits = time.replace(':', '').split('').map(Number);
  return (
    <motion.div
      className="clock-grid"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {digits.map((digit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1
          }}
        >
          <Digit digit={digit} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ClockGrid; 