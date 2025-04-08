import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ClockProps {
  hourAngle: number;
  minuteAngle: number;
  animate?: boolean;
  manual?: boolean;
  onAnglesChange?: (hour: number, minute: number) => void;
}

const Clock: React.FC<ClockProps> = ({ 
  hourAngle: initialHourAngle, 
  minuteAngle: initialMinuteAngle, 
  animate = false,
  manual = false,
  onAnglesChange
}) => {
  const [hourAngle, setHourAngle] = useState(initialHourAngle);
  const [minuteAngle, setMinuteAngle] = useState(initialMinuteAngle);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDraggingRef = useRef<'hour' | 'minute' | null>(null);

  const hourHandLength = 35;
  const minuteHandLength = 35;
  const center = 50;

  const calculateAngle = (event: MouseEvent | TouchEvent) => {
    if (!svgRef.current) return 0;
    
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const svgX = clientX - rect.left;
    const svgY = clientY - rect.top;
    
    // Convert coordinates to be relative to the center of the SVG
    const relativeX = svgX - rect.width / 2;
    const relativeY = svgY - rect.height / 2;
    
    // Calculate angle in degrees
    const angle = Math.atan2(relativeY, relativeX) * 180 / Math.PI + 90;
    return (angle + 360) % 360;
  };

  const startDrag = (hand: 'hour' | 'minute') => (event: React.MouseEvent | React.TouchEvent) => {
    if (!manual) return;
    event.preventDefault();
    isDraggingRef.current = hand;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.preventDefault();
      const newAngle = calculateAngle(moveEvent);
      if (hand === 'hour') {
        setHourAngle(newAngle);
      } else {
        setMinuteAngle(newAngle);
      }
      onAnglesChange?.(hourAngle, minuteAngle);
    };

    const onEnd = () => {
      isDraggingRef.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const hourX = center + hourHandLength * Math.cos((hourAngle - 90) * Math.PI / 180);
  const hourY = center + hourHandLength * Math.sin((hourAngle - 90) * Math.PI / 180);
  const minuteX = center + minuteHandLength * Math.cos((minuteAngle - 90) * Math.PI / 180);
  const minuteY = center + minuteHandLength * Math.sin((minuteAngle - 90) * Math.PI / 180);

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`clock ${manual ? 'manual' : ''}`} 
      ref={svgRef}
    >
      <defs>
        <filter id="inset-shadow">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.15" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="white" rx="50" ry="50" />
      <circle 
        className="clock-face"
        cx="50" 
        cy="50" 
        r="42" 
        filter="url(#inset-shadow)"
      />
      <line
        className={`hour ${isDraggingRef.current === 'hour' ? 'dragging' : ''}`}
        x1={center}
        y1={center}
        x2={hourX}
        y2={hourY}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ cursor: manual ? 'grab' : 'default' }}
        onMouseDown={startDrag('hour')}
        onTouchStart={startDrag('hour')}
      />
      <line
        className={`minute ${isDraggingRef.current === 'minute' ? 'dragging' : ''}`}
        x1={center}
        y1={center}
        x2={minuteX}
        y2={minuteY}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ cursor: manual ? 'grab' : 'default' }}
        onMouseDown={startDrag('minute')}
        onTouchStart={startDrag('minute')}
      />
      <circle 
        cx="50" 
        cy="50" 
        r="1.5" 
        fill="currentColor"
      />
      {manual && (
        <>
          <text x="50" y="30" textAnchor="middle" fill="black" fontSize="8">
            {Math.round(hourAngle)}°
          </text>
          <text x="50" y="70" textAnchor="middle" fill="black" fontSize="8">
            {Math.round(minuteAngle)}°
          </text>
        </>
      )}
    </svg>
  );
};

export default Clock; 