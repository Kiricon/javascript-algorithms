export default function countSetBits(num) {
  let shiftNumb = num;
  let count = 0;
  while (shiftNumb !== 0) {
    if (shiftNumb & 1) count += 1;
    shiftNumb >>= 1;
  }

  return count;
}
