export default function integarPartition(num) {
  const comboTable = [];

  // Fill out first row to make things easy
  comboTable[0] = [1];
  for (let i = 1; i <= num; i++) {
    comboTable[0][i] = 0;
  }

  for (let y = 1; y <= num; y++) {
    comboTable[y] = [0];
    for (let x = 1; x <= num; x++) {
      const comboNum = comboTable[y - 1][x];
      if (x === y) {
        comboTable[y][x] = comboNum + 1;
      } else if (y > x) {
        comboTable[y][x] = comboNum;
      } else {
        const diff = x - y;
        comboTable[y][x] = comboNum + comboTable[y][diff];
      }
    }
  }


  return comboTable[num][num];
}
