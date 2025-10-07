export function estimateComplexity(code: string): string {
  const loopRegex = /\b(for|while|do)\b/;
  const nestedLoopRegex = /(for|while)[\s\S]*?(for|while)/;
  if (nestedLoopRegex.test(code)) return 'O(n^2)';
  if (loopRegex.test(code)) return 'O(n)';
  if (/\brecursi(on|ve)\b/.test(code)) return 'O(n)';
  return 'O(1)';
}
