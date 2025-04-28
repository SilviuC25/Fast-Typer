"use client";
import { useEffect, useState } from "react";
import Timer from "@/components/Timer";

// Fetch random words from an API
export default function Game() {
  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(""); // Track all typed characters
  const [time, setTime] = useState(60); // Start time at 60 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [targetText, setTargetText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0); // Track the start time of the game

  // Fetch words from API when starting the game
  const fetchWords = async () => {
    try {
      const response = await fetch("https://random-word-api.vercel.app/api?words=30&alphabetize=true");
      const data = await response.json();
      setWords(data);
      generateText(data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  // Split words into lines
  const generateText = (words: string[]) => {
    const wordsPerLine = 12; // We use 12 words per line to make the text longer and fit better
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    setTargetText(lines); // Set target text as the lines
  };

  // Function to start the game
  function startGame() {
    setInputValue(""); // Reset input
    setTime(60); // Set timer to 60 seconds when starting the game
    setWpm(0); // Reset WPM
    setIsRunning(true); // Start the game
    setCurrentLine(0); // Reset current line
    setCorrectWordsCount(0); // Reset correct words count
    setStartTime(Date.now()); // Set the start time
    fetchWords(); // Fetch new words when starting the game
  }

  // Function to calculate WPM
  function calculateWPM() {
    const wordsTyped = inputValue.trim().split(" ").filter(word => word !== "").length;
    const correctWords = targetText.slice(0, currentLine + 1).join(" ").split(" ").slice(0, wordsTyped).filter((word, index) => word === inputValue.split(" ")[index]).length;

    setCorrectWordsCount(correctWords);

    const elapsedTime = (Date.now() - startTime) / 1000;
    const minutes = elapsedTime / 60;
    setWpm(Math.round(correctWords / minutes));
  }

  useEffect(() => {
    if (isRunning && inputValue === targetText[currentLine]) {
      setCurrentLine((prev) => prev + 1);
      setInputValue("");
    }
  }, [inputValue, currentLine, targetText, isRunning]);

  function getColoredText() {
    const currentLineText = targetText[currentLine];
    return currentLineText.split("").map((char, index) => {
      let color = "opacity-60 text-gray-800";
      if (inputValue[index] === char) {
        color = "opacity-100 text-gray-800";
      } else if (inputValue[index] !== undefined) {
        color = "opacity-100 text-red-500";
      }

      return (
        <span key={index} className={`transition-all ${color}`}>
          {char}
        </span>
      );
    });
  }

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      calculateWPM();
    }
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Typing Speed Game</h1>

      <div className="w-full max-w-5xl text-center text-2xl font-mono p-4 mb-6 text-gray-800">
        {targetText.length > 0 ? (
          <div>
            <div className="mb-4 w-full">
              <p className="text-xl font-mono opacity-70">
                {getColoredText()}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading words...</p>
        )}
      </div>

      <div className="w-full max-w-5xl text-center text-2xl font-mono p-4 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isRunning}
          className="mt-4 p-2 border rounded w-full max-w-lg text-xl"
          placeholder="Start typing here"
        />
      </div>

      <Timer time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />

      <button
        onClick={startGame}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg text-xl"
      >
        {isRunning ? "Restart" : "Start Game"}
      </button>

      {wpm > 0 && <p className="mt-4 text-lg text-gray-800">Your speed: {wpm} WPM</p>}
    </div>
  );
}
