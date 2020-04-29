export default function setBit(num, shift) {
  return (1 << shift) | num;
}
