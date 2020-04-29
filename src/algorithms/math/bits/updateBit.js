export default function updateBit(num, shift, setBit) {
  const mask = ~(1 << shift);
  return (num & mask) | (setBit << shift);
}
