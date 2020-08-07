function findCombos(arr, count) {
  const combos = [];
  if (count === 0) return arr.map((item) => [item]);

  for (const item of arr) {
    const subCombos = findCombos(arr, count - 1);

    for (const combo of subCombos) {
      combos.push([item].concat(combo));
    }
  }
  return combos;
}

export default function permutateWithRepetitions(arr) {
  return findCombos(arr, arr.length - 1);
}
