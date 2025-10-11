export function estimateComplexity(fn: any): string {
  const code = fn.toString();

  const loopMatches = code.match(/for\s*\(|while\s*\(/g);
  if (!loopMatches) return "O(1)";

  const lines = code.split("\n");
  let maxNested = 0;
  const stack: number[] = [];

  for (const line of lines) {
    while (stack.length && line <= stack[stack.length - 1]) stack.pop();
    if (/for\s*\(|while\s*\(/.test(line)) {
      stack.push(line);
      maxNested = Math.max(maxNested, stack.length);
    }
  }

  return `O(n^${maxNested})`;
}
