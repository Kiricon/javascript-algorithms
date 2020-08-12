function myMergeSort(arr) {
  if (arr.length === 1) return arr;

  const mid = Math.ceil(arr.length / 2);
  // Merge Sort left and right so we can merge them together;
  const left = myMergeSort(arr.slice(0, mid));
  const right = myMergeSort(arr.slice(mid, arr.length));

  // Time to merge sorted left and right
  let leftIndex = 0;
  let rightIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (leftIndex >= left.length) {
      arr[i] = right[rightIndex];
      rightIndex++;
      continue;
    }

    if (rightIndex >= right.length) {
      arr[i] = left[leftIndex];
      leftIndex++;
      continue;
    }

    if (right[rightIndex] > left[leftIndex]) {
      arr[i] = right[rightIndex];
      rightIndex++;
      continue;
    } else {
      arr[i] = left[leftIndex];
      leftIndex++;
      continue;
    }
  }

  return arr;
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
console.log(myMergeSort(myUnSortedArr));
