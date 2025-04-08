import React from 'react';
import { motion } from 'framer-motion';

interface ClockProps {
  hourAngle: number;
  minuteAngle: number;
}

const Clock: React.FC<ClockProps> = ({
  hourAngle,
  minuteAngle,
}) => {
  const handLength = 35;
  const center = 50;

  const getHandCoordinates = (angle: number) => {
    return {
      x: center + handLength * Math.cos((angle - 90) * Math.PI / 180),
      y: center + handLength * Math.sin((angle - 90) * Math.PI / 180)
    };
  };

  const hourCoords = getHandCoordinates(hourAngle);
  const minuteCoords = getHandCoordinates(minuteAngle);

  return (
    <svg
      viewBox="0 0 100 100"
      className="clock"
    >
      <defs>
        <filter id="inset-shadow">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="1" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.2" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="var(--clock-face-color)"
        rx="50"
        ry="50"
        filter="url(#inset-shadow)"
      />
      <motion.line
        className="hour"
        x1={center}
        y1={center}
        x2={hourCoords.x}
        y2={hourCoords.y}
        stroke="var(--clock-hands-color)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ x2: center, y2: center }}
        animate={{ x2: hourCoords.x, y2: hourCoords.y }}
        transition={{ 
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1.2
        }}
      />
      <motion.line
        className="minute"
        x1={center}
        y1={center}
        x2={minuteCoords.x}
        y2={minuteCoords.y}
        stroke="var(--clock-hands-color)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ x2: center, y2: center }}
        animate={{ x2: minuteCoords.x, y2: minuteCoords.y }}
        transition={{ 
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1.2
        }}
      />
    </svg>
  );
};

export default Clock; 