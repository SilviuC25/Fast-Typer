export function normalizeInput(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0326\u0306\u0307\u031B\u0327\u0328]/g, "")
    .normalize("NFC");
}
