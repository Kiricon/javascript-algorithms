function findPowerSet(originalSet, currSet, sets, position) {
  if (currSet.length > originalSet.length) return;

  sets.push([...currSet]);

  for (let i = position; i < originalSet.length; i++) {
    currSet.push(originalSet[i]);
    findPowerSet(originalSet, currSet, sets, i + 1);
    currSet.pop();
  }
}

export default function btPowerSet(originalSet) {
  const sets = [];
  findPowerSet(originalSet, [], sets, 0);
  return sets;
}
