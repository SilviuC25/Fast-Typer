export type Language = "english" | "romana";
export type Difficulty = "easy" | "medium" | "hard";

export async function getWords(language: Language, difficulty: Difficulty): Promise<string[]> {
  const filePath = `/data/${language}-${difficulty}.json`;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Cannot fetch words: ${response.status}`);
    }

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading words:", error);
    return [];
  }
}
