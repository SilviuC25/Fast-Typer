"use client";

import { normalizeInput } from "@/lib/normalizeInput";

export default function ColoredText({
  targetLine,
  inputValue,
}: {
  targetLine: string;
  inputValue: string;
}) {
  const normalizedTarget = normalizeInput(targetLine);
  const normalizedInput = normalizeInput(inputValue);

  const maxLength = Math.max(normalizedTarget.length, normalizedInput.length);

  return (
    <>
      {Array.from({ length: maxLength }).map((_, i) => {
        const expectedChar = normalizedTarget[i];
        const typedChar = normalizedInput[i];

        let className = "text-gray-400";
        let charToDisplay = expectedChar;

        if (typedChar !== undefined && expectedChar !== undefined) {
          className = typedChar === expectedChar ? "text-black" : "text-red-500";
        } else if (typedChar !== undefined && expectedChar === undefined) {
          className = "text-red-500";
          charToDisplay = typedChar;
        }

        return (
          <span key={i} className={className}>
            {charToDisplay || " "}
          </span>
        );
      })}
    </>
  );
}
