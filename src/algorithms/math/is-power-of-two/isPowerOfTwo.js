export default function isPowerOfTwo(num) {
  if (num === 1) return true;
  if (num % 2 !== 0) return false;
  let resultNum = num;
  while (resultNum > 2) {
    if (resultNum % 2 !== 0) return false;
    resultNum /= 2;
  }

  return resultNum === 2;
}
