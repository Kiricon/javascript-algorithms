function getValue(matrix, x, y) {
  if (y < 0 || y >= matrix.length) return 0;
  if (x < 0 || x >= matrix[y].length) return 0;
  return matrix[y][x] || 0;
}

function buildMatrix(s1, s2) {
  const subsetMatrix = [];

  for (let y = 0; y < s1.length; y++) {
    const char = s1[y];
    subsetMatrix.push([]);
    for (let x = 0; x < s2.length; x++) {
      const leftVal = getValue(subsetMatrix, x - 1, y);
      const topVal = getValue(subsetMatrix, x, y - 1);
      let val = Math.max(leftVal, topVal);
      if (char === s2[x]) val++;
      subsetMatrix[y][x] = val;
    }
  }

  return subsetMatrix;
}

export default function longestCommonSubsequence(s1, s2) {
  const matrix = buildMatrix(s1, s2);

  const subSequence = [];

  const traverse = (x, y) => {
    if (x < 0 || y < 0) return;
    const val = getValue(matrix, x, y);

    if (val === 0) return;
    const top = getValue(matrix, x, y - 1);
    const left = getValue(matrix, x - 1, y);

    if (top === val) return traverse(x, y - 1);
    if (left === val) return traverse(x - 1, y);
    subSequence.unshift(s2[x]);
    traverse(x - 1, y - 1);
  };

  traverse(s2.length - 1, s1.length - 1);

  return subSequence;
}
