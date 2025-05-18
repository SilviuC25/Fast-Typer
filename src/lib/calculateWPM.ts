import { normalizeInput } from "./normalizeInput";

export function calculateWPM(
  fullInput: string,
  targetText: string[],
  startTime: number
): number {
  const typedWords = normalizeInput(fullInput).trim().split(/\s+/);
  const targetWords = normalizeInput(targetText.join(" ")).trim().split(/\s+/);

  let correctWords = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === targetWords[i]) {
      correctWords++;
    }
  }

  const elapsedTime = (Date.now() - startTime) / 60000;
  const minutes = Math.max(elapsedTime, 0.01);

  return Math.round((correctWords / minutes));
}
