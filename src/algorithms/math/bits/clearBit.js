export default function clearBit(num, shift) {
  const mask = ~(1 << shift);
  return mask & num;
}
