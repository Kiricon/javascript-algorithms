export default function combineWithRepetitions(options, len) {
  if (len === 1) return options.map((o) => [o]);
  const combos = [];

  for (const optionIndex in options) {
    const option = options[optionIndex];
    const subCombos = combineWithRepetitions(
      options.slice(optionIndex),
      len - 1
    );
    for (const combo of subCombos) {
      combos.push([option].concat(combo));
    }
  }

  return combos;
}
