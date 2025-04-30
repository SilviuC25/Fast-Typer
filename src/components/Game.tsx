"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Timer from "@/components/Timer";
import { getWords } from "@/lib/getWords";

type Difficulty = "easy" | "medium" | "hard";
type Language = "english" | "romana";

function normalizeInput(str: string): string {
  return str.normalize("NFD").replace(/[\u0326\u0306\u0307\u031B\u0327\u0328]/g, "").normalize("NFC");
}


export default function Game() {
  const [language, setLanguage] = useState<Language>("english");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [duration, setDuration] = useState(60);
  const [words, setWords] = useState<string[]>([]);
  const [targetText, setTargetText] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(duration);
  const [startTime, setStartTime] = useState<number>(0);

  const fetchWords = async () => {
    const data = await getWords(language, difficulty);
    setWords(data);
    generateText(data);
  };

  const generateText = (words: string[]) => {
    const perLine = 12;
    const lines = [];
    for (let i = 0; i < words.length; i += perLine) {
      lines.push(words.slice(i, i + perLine).join(" "));
    }
    setTargetText(lines);
  };

  const startGame = () => {
    setInputValue("");
    setTime(duration);
    setWpm(0);
    setIsRunning(true);
    setCurrentLine(0);
    setStartTime(Date.now());
    fetchWords();
  };

  const calculateWPM = () => {
    const typedWords = normalizeInput(inputValue).trim().split(" ").filter(Boolean);
    const expectedWords = normalizeInput(targetText.join(" ")).split(" ");
  
    const correct = typedWords.filter((word, i) => word === expectedWords[i]).length;
    const elapsed = (Date.now() - startTime) / 1000 / 60;
  
    setWpm(Math.round(correct / elapsed));
  };
  

  useEffect(() => {
    const normalizedInput = normalizeInput(inputValue);
    const normalizedTarget = normalizeInput(targetText[currentLine] || "");
    if (isRunning && normalizedInput === normalizedTarget) {
      setCurrentLine((prev) => prev + 1);
      setInputValue("");
    }
  }, [inputValue]);
  

  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false);
      calculateWPM();
    }
  }, [time]);

  const getColoredText = () => {
    const text = targetText[currentLine] || "";
    const normalizedTarget = normalizeInput(text);
    const normalizedInputValue = normalizeInput(inputValue);
  
    return text.split("").map((char, idx) => {
      const expectedChar = normalizedTarget[idx];
      const typedChar = normalizedInputValue[idx];
      const isCorrect = typedChar === expectedChar;
      const color = typedChar
        ? isCorrect
          ? "text-green-600"
          : "text-red-500"
        : "text-gray-500";
      return (
        <motion.span key={idx} className={`transition-all ${color}`} layout>
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Typing Speed Game
      </motion.h1>

      <motion.div className="flex gap-4 mb-4 flex-wrap justify-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="p-2 rounded border"
        >
          <option value="english">English</option>
          <option value="romana">Română</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="p-2 rounded border"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="p-2 rounded border"
        >
          <option value={15}>15s</option>
          <option value={30}>30s</option>
          <option value={60}>60s</option>
          <option value={120}>120s</option>
        </select>
      </motion.div>

      <div className="text-xl font-mono bg-white p-4 rounded-md w-full max-w-5xl text-center mb-4">
        {getColoredText()}
      </div>

      <motion.input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!isRunning}
        className="border p-2 rounded w-full max-w-xl text-lg text-center"
        placeholder="Start typing..."
        whileFocus={{ scale: 1.02 }}
      />

      <Timer
        time={time}
        setTime={setTime}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      <motion.button
        onClick={startGame}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        whileTap={{ scale: 0.95 }}
      >
        {isRunning ? "Restart" : "Start Game"}
      </motion.button>

      {wpm > 0 && (
        <motion.p
          className="mt-4 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your speed: <strong>{wpm} WPM</strong>
        </motion.p>
      )}
    </div>
  );
}
