export default function dpLongestIncreasingSubsequence(seq) {
  const subSequence = new Array(seq.length).fill(1);

  for (let i = 0; i < seq.length; i++) {
    for (let j = 0; j < i; j++) {
      if (seq[j] < seq[i]) {
        subSequence[i] = Math.max(subSequence[i], subSequence[j] + 1);
      }
    }
  }

  return Math.max(...subSequence);
}
