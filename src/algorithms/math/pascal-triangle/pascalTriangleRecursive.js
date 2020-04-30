export default function pascalTriangleRecursive(n) {
  const row = [1];
  if (n === 0) return row;

  const previousRow = pascalTriangleRecursive(n - 1);

  for (let i = 1; i < n; i++) {
    row.push(previousRow[i] + previousRow[i - 1]);
  }

  row.push(1);

  return row;
}
