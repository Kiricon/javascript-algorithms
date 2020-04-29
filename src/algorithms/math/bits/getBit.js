export default function getBit(num, shift) {
  return (num >> shift) & 1;
}
