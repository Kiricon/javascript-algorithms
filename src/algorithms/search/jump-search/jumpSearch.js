export default function jumpSearch(arr, val, comparator) {
  if (arr.length === 0) return -1;

  const jumpSize = Math.floor(Math.sqrt(arr.length));

  const defaulCompare = (a, b) => {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  };
  comparator = comparator || defaulCompare;
  let currIndex = 0;
  let prevIndex = 0;

  while (comparator(arr[currIndex], val) === -1) {
    prevIndex = currIndex;
    if (currIndex + jumpSize > arr.length - 1) {
      currIndex = arr.length - 1;
      if (comparator(arr[currIndex], val) === -1) return -1;
    } else {
      currIndex += jumpSize;
    }
  }

  while (prevIndex <= currIndex) {
    if (comparator(arr[prevIndex], val) === 0) return prevIndex;
    if (comparator(arr[currIndex], val) === 0) return currIndex;
    prevIndex++;
    currIndex--;
  }

  return -1;
}
