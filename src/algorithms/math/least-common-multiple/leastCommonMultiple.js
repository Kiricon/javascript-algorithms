import greatestCommonDivisor from '../euclidean-algorithm/euclideanAlgorithm';

export default function leastCommonMultiple(a, b) {
  if (a === 0 || b === 0) return 0;
  const aAbs = Math.abs(a);
  const bAbs = Math.abs(b);
  return (aAbs * bAbs) / greatestCommonDivisor(a, b);
}
