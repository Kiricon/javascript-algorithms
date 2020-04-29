export default function isPositive(num) {
  if (num === 0) return false;
  return ((num >> 31) & 1) === 0;
}
