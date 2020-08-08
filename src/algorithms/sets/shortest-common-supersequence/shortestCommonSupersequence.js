import longestCommonSubSequence from "../longest-common-subsequence/longestCommonSubsequence";

export default function shortestCommonSuperSequence(seq1, seq2) {
  const lcs = longestCommonSubSequence(seq1, seq2);
  const superSequence = [];

  let seq1Index = 0;
  let seq2Index = 0;
  let lcsIndex = 0;

  let setOnHold1 = false;
  let setOnHold2 = false;

  while (lcsIndex < lcs.length) {
    const seq1Char = seq1[seq1Index] || null;
    const seq2Char = seq2[seq2Index] || null;
    const lcsChar = lcs[lcsIndex];

    if (seq1Index < seq1.length) {
      if (!setOnHold1 && seq1Char !== lcsChar) {
        superSequence.push(seq1Char);
        seq1Index++;
      } else {
        setOnHold1 = true;
      }
    }

    if (seq2Index < seq2.length) {
      if (!setOnHold2 && seq2Char !== lcsChar) {
        superSequence.push(seq2Char);
        seq2Index++;
      } else {
        setOnHold2 = true;
      }
    }

    if (setOnHold1 && setOnHold2) {
      superSequence.push(lcsChar);
      lcsIndex++;
      seq1Index++;
      seq2Index++;
      setOnHold1++;
      setOnHold2++;
    }
  }

  while (seq1Index < seq1.length) {
    superSequence.push(seq1[seq1Index]);
    seq1Index++;
  }

  while (seq2Index < seq2.length) {
    superSequence.push(seq2[seq2Index]);
    seq2Index++;
  }

  return superSequence;
}
