import React, { useEffect } from 'react';

interface TimerProps {
  time: number;
  setTime: (time: number) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ time, setTime, isRunning, setIsRunning }) => {
  useEffect(() => {
    if (!isRunning) return;

    if (time <= 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [time, isRunning, setTime, setIsRunning]);

  return (
    <div className="text-2xl font-bold text-indigo-600">
      {time}s
    </div>
  );
};

export default Timer;
