import factorial from '../factorial/factorial';

export default function pascalTriangle(n) {
  const row = [];
  for (let k = 0; k <= n; k++) {
    row[k] = factorial(n) / (factorial(k) * factorial(n - k));
  }

  return row;
}
