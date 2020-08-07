function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function fisherYates(arr) {
  const len = arr.length;
  const newArr = [...arr];

  if (len < 2 || !arr) return arr;
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = getRandomInt(i);
    const temp = newArr[randomIndex];
    newArr[randomIndex] = newArr[i];
    newArr[i] = temp;
  }

  return newArr;
}
