export default function greatestCommonDivisor(num1, num2) {
  if (num1 === 0 || num2 === 0) return Math.abs(num1 - num2);
  // Negative numbers break the whole (replace the larger number thing)
  // and making them positive doesn't change anything answerwise
  let a = Math.abs(num1);
  let b = Math.abs(num2);
  while (a !== b) {
    const diff = Math.abs(a - b);
    if (a > b) {
      a = diff;
    } else {
      b = diff;
    }
  }

  return a;
}
