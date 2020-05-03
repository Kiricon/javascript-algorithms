export default function fastPowering(num, pow) {
  if (pow === 0) return 1;
  if (pow === 1) return num;

  if (pow % 2 === 0) {
    return fastPowering(num, pow / 2) * fastPowering(num, pow / 2);
  }
  const newPow = pow - 1;
  return fastPowering(num, newPow / 2) * fastPowering(num, newPow / 2) * num;
}
