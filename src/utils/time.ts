import { HandPosition, DigitLayout } from '../fonts/digitFont';

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getRandomHandPosition = (): HandPosition => ({
  hour: Math.floor(Math.random() * 360),
  minute: Math.floor(Math.random() * 360)
});

export const getRandomDigitLayout = (): DigitLayout => {
  return Array(3).fill(null).map(() => 
    Array(2).fill(null).map(() => getRandomHandPosition())
  );
};

export const getCurrentDigits = (): number[] => {
  const now = new Date();
  return [
    Math.floor(now.getHours() / 10),
    now.getHours() % 10,
    Math.floor(now.getMinutes() / 10),
    now.getMinutes() % 10
  ];
}; 