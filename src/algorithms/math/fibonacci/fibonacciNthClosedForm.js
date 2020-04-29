export default function fibonacciNthClosedForm(n) {
  if (n > 75) throw new Error('Number can\'t be larger than 75');

  const a = 1 / Math.sqrt(5);

  const b = ((1 + Math.sqrt(5)) / 2) ** n;
  const c = ((1 - Math.sqrt(5)) / 2) ** n;

  return Math.floor(a * (b - c));
}
