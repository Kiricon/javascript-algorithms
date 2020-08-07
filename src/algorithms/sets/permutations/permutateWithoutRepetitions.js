export default function permutateWithRepetitions(arr) {
  if (arr.length === 1) return [arr];
  const combos = [];
  arr.forEach((item, itemIndex) => {
    const subCombos = permutateWithRepetitions(
      arr.filter((val, index) => index !== itemIndex)
    );
    for (const combo of subCombos) {
      combos.push([item].concat(combo));
    }
  });

  return combos;
}
