export default function fibonacciNth(n) {
  let sum = 1;
  let prevSum = 0;
  for (let i = 2; i <= n; i++) {
    const temp = sum;
    sum += prevSum;
    prevSum = temp;
  }

  return sum;
}
