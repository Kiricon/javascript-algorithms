export default function isPowerOfTwo(num) {
  return (num & (num - 1)) === 0;
}
