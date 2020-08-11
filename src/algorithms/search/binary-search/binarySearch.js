const defaultComparator = (a, b) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};
function search(start, end, val, arr, comparator) {
  if (end === start && comparator(arr[start], val) !== 0) return -1;
  const diff = Math.abs(start - end);
  const mid = start + Math.floor(diff / 2);

  switch (comparator(arr[mid], val)) {
    case 0:
      return mid;
    case 1:
      return search(start, mid - 1, val, arr, comparator);
    case -1:
      return search(mid + 1, end, val, arr, comparator);
    default:
      return -1;
  }
}

export default function binarySearch(arr, val, comparator) {
  if (!arr.length) return -1;
  comparator = comparator || defaultComparator;
  return search(0, arr.length - 1, val, arr, comparator);
}
