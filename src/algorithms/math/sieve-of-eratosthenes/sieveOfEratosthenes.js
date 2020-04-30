// Find all prime numbers up to n
export default function sieveOfEratosthenese(n) {
  const boolArray = new Array(n + 1).fill(true);
  boolArray[0] = false;
  boolArray[1] = false;

  for (let i = 2; i <= n; i++) {
    if (boolArray[i]) {
      let multiple = i;
      while (i * multiple <= n) {
        boolArray[i * multiple] = false;
        multiple++;
      }
    }
  }

  const indicesArr = [];
  boolArray.forEach((v, i) => {
    if (v) indicesArr.push(i);
  });

  return indicesArr;
}
