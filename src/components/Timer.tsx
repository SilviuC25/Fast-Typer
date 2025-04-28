import { useEffect } from "react";

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({ time, setTime, isRunning, setIsRunning }: TimerProps) {
  useEffect(() => {
    if (isRunning && time > 0) {
      const timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clear the interval when the time is up or game is stopped
      return () => clearInterval(timerInterval);
    } else if (time === 0) {
      setIsRunning(false); // Stop the game when time runs out
    }
  }, [isRunning, time, setTime, setIsRunning]);

  return (
    <div className="text-4xl font-bold mt-4 text-gray-800">
      Time Left: {time}s
    </div>
  );
}
