export default function bitLength(num) {
  let startNum = 1;
  let count = 0;
  while (startNum <= num) {
    startNum <<= 1;
    count += 1;
  }

  return count;
}
