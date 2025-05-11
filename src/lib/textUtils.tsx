import React from "react";
import { normalizeInput } from "./normalizeInput";

export function compareWords(expected: string, actual: string): boolean {
  return normalizeInput(expected) === normalizeInput(actual);
}

export function getColoredText(expected: string, actual: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const maxLength = Math.max(expected.length, actual.length);

  for (let i = 0; i < maxLength; i++) {
    const expectedChar = expected[i] || "";
    const actualChar = actual[i] || "";

    let colorClass = "text-gray-400";
    if (actualChar) {
      colorClass = expectedChar === actualChar ? "text-black" : "text-red-500";
    }

    elements.push(
      <span key={i} className={colorClass}>
        {expectedChar}
      </span>
    );
  }

  return elements;
}
