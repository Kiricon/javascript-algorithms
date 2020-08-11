export default function linearSearch(arr, val, callback) {
  const results = [];

  for (let i = 0; i < arr.length; i++) {
    if (!!callback && callback(arr[i], val) === 0) {
      results.push(i);
      continue;
    }

    if (arr[i] === val) results.push(i);
  }

  return results;
}
