export default function isPowerOfTwoBitwise(num) {
  if (num <= 0) return false;
  return (num & (num - 1)) === 0;
}
