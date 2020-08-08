export default function combineWithoutRepetitions(options, len) {
  if (len === 1) return options.map((o) => [o]);
  const combos = [];

  options.forEach((currentOption, optionIndex) => {
    const smallerCombos = combineWithoutRepetitions(
      options.slice(optionIndex + 1),
      len - 1
    );

    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
}
