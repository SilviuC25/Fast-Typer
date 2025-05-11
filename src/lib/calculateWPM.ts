import { normalizeInput } from "./normalizeInput";

export function calculateWPM(
  fullInput: string,
  targetText: string[],
  startTime: number
): number {
  // Normalizăm inputul și textul țintă
  const typedWords = normalizeInput(fullInput).trim().split(/\s+/);
  const targetWords = normalizeInput(targetText.join(" ")).trim().split(/\s+/);

  let correctWords = 0;

  // Compara fiecare cuvânt tastat cu cel din textul țintă
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === targetWords[i]) {
      correctWords++;
    }
  }

  // Calculăm timpul în minute
  const elapsedTime = (Date.now() - startTime) / 60000; // în minute
  const minutes = Math.max(elapsedTime, 0.01); // prevenim divizarea la 0

  // Calculăm WPM
  return Math.round((correctWords / minutes));
}
