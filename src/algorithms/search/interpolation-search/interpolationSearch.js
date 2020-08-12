export default function interpolationSearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const rangeDelta = arr[end] - arr[start];
    const indexDelta = end - start;
    const valueDelta = val - arr[start];

    if (valueDelta < 0) return -1;
    if (!rangeDelta) {
      return arr[start] === val ? start : -1;
    }

    const mid = start + Math.floor((valueDelta * indexDelta) / rangeDelta);
    if (arr[mid] < val) {
      start = mid + 1;
    } else if (arr[mid] > val) {
      end = mid - 1;
    } else {
      return mid;
    }
  }

  if (val === arr[start]) return start;
  return -1;
}
