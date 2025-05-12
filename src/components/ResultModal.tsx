'use client';

import { motion } from 'framer-motion';

interface ResultModalProps {
  wpm: number;
  correctWords: number;
  wrongWords: number;
  onClose: () => void;
}

const ResultModal = ({ wpm, correctWords, wrongWords, onClose }: ResultModalProps) => {
  const accuracy = ((correctWords / (correctWords + wrongWords)) * 100).toFixed(2);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="group relative p-8 rounded-xl bg-white overflow-hidden shadow-lg max-w-lg w-full transition-transform duration-500 transform hover:scale-105"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 z-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-indigo-600 before:animate-drawBorder"></div>

        {/* Modal content */}
        <div className="relative z-10 text-center text-indigo-900">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Game Over</h2>
          <p>Your speed: <strong>{wpm} WPM</strong></p>
          <p>Correct words: <strong>{correctWords}</strong></p>
          <p>Wrong words: <strong>{wrongWords}</strong></p>
          <p>Accuracy: <strong>{accuracy}%</strong></p>

          <div className="flex justify-center mt-6">
            <motion.button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300"
              whileHover={{ scale: 1.1 }}
            >
              Play Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultModal;
