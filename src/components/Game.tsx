'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Timer from './Timer';
import OptionGroup from './OptionGroup';
import ColoredText from './ColoredText';
import { getWords } from '../lib/getWords';
import { shuffleArray } from '../lib/shuffleArray';
import { generateText } from '../lib/generateText';
import { normalizeInput } from '../lib/normalizeInput';
import ResultModal from './ResultModal';

interface GameProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

type Difficulty = 'easy' | 'medium' | 'hard';
type Language = 'english' | 'romana';

export default function Game({ user }: GameProps) {
  const [language, setLanguage] = useState<Language>('english');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [duration, setDuration] = useState(60);
  const [targetText, setTargetText] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [fullInputValue, setFullInputValue] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(duration);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const perLine = 12;

  const fetchWords = async () => {
    const data = await getWords(language, difficulty);
    const shuffled = shuffleArray(data);
    setTargetText(generateText(shuffled, perLine));
  };

  const startGame = async () => {
    setInputValue('');
    setFullInputValue('');
    setTime(duration);
    setWpm(0);
    setCorrectWords(0);
    setWrongWords(0);
    setIsRunning(true);
    setCurrentLine(0);
    setGameFinished(false);
    await fetchWords();
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const calculateWPM = (
    fullInput: string,
    targetText: string[],
    startTime: number
  ): number => {
    const typedWords = normalizeInput(fullInput).trim().split(/\s+/);
    const targetWords = normalizeInput(targetText.join(' ')).trim().split(/\s+/);

    let correctChars = 0;
    let correct = 0;

    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === targetWords[i]) {
        correctChars += typedWords[i].length + 1;
        correct++;
      }
    }

    setCorrectWords(correct);

    const elapsedTime = (Date.now() - startTime) / 60000;
    const minutes = Math.max(elapsedTime, 0.01);

    return Math.round((correctChars / 5) / minutes);
  };

  const saveTestToDatabase = useCallback(async () => {
    if (!user) return;

    try {
      await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          wpm,
          accuracy: Math.round((correctWords / (correctWords + wrongWords)) * 100),
          correctWords,
          wrongWords,
          language,
          difficulty,
          duration,
        }),
      });
    } catch (error) {
      console.error('Error saving test:', error);
    }
  }, [user, wpm, correctWords, wrongWords, language, difficulty, duration]);

  useEffect(() => {
    if (!isRunning) return;

    const currentTargetLine = normalizeInput(targetText[currentLine] || '');
    const inputTrimmed = normalizeInput(inputValue.trimEnd());

    const typedWords = inputTrimmed.split(/\s+/);
    const expectedWords = currentTargetLine.trim().split(/\s+/);

    const isLineComplete = inputValue.endsWith(' ') && typedWords.length === expectedWords.length;

    if (isLineComplete) {
      let incorrect = 0;

      for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] !== expectedWords[i]) incorrect++;
      }

      setWrongWords((prev) => prev + incorrect);
      setFullInputValue((prev) => prev + inputTrimmed + ' ');
      setInputValue('');

      setCurrentLine((prev) => {
        const next = prev + 1;
        return next < targetText.length ? next : prev;
      });
    }
  }, [inputValue, currentLine, isRunning, targetText]);

  useEffect(() => {
    if (time <= 0 && isRunning) {
      setIsRunning(false);
      setGameFinished(true);
      const wpmResult = calculateWPM(fullInputValue + inputValue, targetText, startTime);
      setWpm(wpmResult);
    }
  }, [time, isRunning, fullInputValue, inputValue, startTime, targetText]);

  useEffect(() => {
    if (gameFinished && user) {
      saveTestToDatabase();
    }
  }, [gameFinished, user, saveTestToDatabase]);

  const progressPercent = Math.min(
    (inputValue.length / (targetText[currentLine]?.length || 1)) * 100,
    100
  );

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full px-6 text-gray-800 relative"
      onClick={() => inputRef.current?.focus()}
    >
      <motion.h1
        className="text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Typing Speed Game
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <OptionGroup title="Language" options={['english', 'romana']} selected={language} onSelect={setLanguage} />
        <OptionGroup title="Difficulty" options={['easy', 'medium', 'hard']} selected={difficulty} onSelect={setDifficulty} />
        <OptionGroup title="Time" options={[15, 30, 60, 90, 120]} selected={duration} onSelect={setDuration} />
      </div>

      <div className="text-4xl font-mono leading-relaxed text-center max-w-5xl mb-6 break-words">
        <ColoredText targetLine={targetText[currentLine] || ''} inputValue={inputValue} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!isRunning}
        className="opacity-0 absolute pointer-events-none"
      />

      <div className="w-full max-w-5xl h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        />
      </div>

      <Timer time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />

      <motion.div className="flex gap-4 mt-6">
        <motion.button
          onClick={startGame}
          className="px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-semibold bg-white hover:bg-indigo-100 hover:text-indigo-700 shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300"
          whileTap={{ scale: 0.96 }}
        >
          {isRunning ? 'Restart' : 'Start Game'}
        </motion.button>

        {gameFinished && (
          <motion.button
            onClick={() => setShowResult(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-all duration-200 cursor-pointer focus:outline-none"
            whileTap={{ scale: 0.96 }}
          >
            See Results
          </motion.button>
        )}
      </motion.div>

      {showResult && (
        <ResultModal
          wpm={wpm}
          correctWords={correctWords}
          wrongWords={wrongWords}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}
