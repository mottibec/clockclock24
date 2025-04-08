import React from 'react';

interface ClockProps {
  hourAngle: number;
  minuteAngle: number;
}

const Clock: React.FC<ClockProps> = ({
  hourAngle,
  minuteAngle,
}) => {
  const hourHandLength = 35;
  const minuteHandLength = 35;
  const center = 50;

  const hourX = center + hourHandLength * Math.cos((hourAngle - 90) * Math.PI / 180);
  const hourY = center + hourHandLength * Math.sin((hourAngle - 90) * Math.PI / 180);
  const minuteX = center + minuteHandLength * Math.cos((minuteAngle - 90) * Math.PI / 180);
  const minuteY = center + minuteHandLength * Math.sin((minuteAngle - 90) * Math.PI / 180);

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
      <line
        className="hour"
        x1={center}
        y1={center}
        x2={hourX}
        y2={hourY}
        stroke="var(--clock-hands-color)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        className="minute"
        x1={center}
        y1={center}
        x2={minuteX}
        y2={minuteY}
        stroke="var(--clock-hands-color)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Clock; 