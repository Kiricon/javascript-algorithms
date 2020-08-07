export default function bwPowerSet(ogSet) {
  const subSets = [];
  const maxSets = 2 ** ogSet.length;

  for (let comboIndex = 0; comboIndex < maxSets; comboIndex++) {
    const subSet = [];
    for (const i in ogSet) {
      if (comboIndex & (1 << i)) {
        subSet.push(ogSet[i]);
      }
    }
    subSets.push(subSet);
  }

  return subSets;
}
