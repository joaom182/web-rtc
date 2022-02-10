export function generateRandomCode(size: number = 6) {
  return Math.random().toString(20).substr(3, size);
}
