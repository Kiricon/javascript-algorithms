function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function quickSort(arr, start, end) {
  if (start >= end) return;

  const pivot = arr[end];

  let i = start;
  for (let j = start; j <= end; j++) {
    if (arr[j] <= pivot) {
      swap(arr, i, j);
      i++;
    }
  }

  quickSort(arr, start, i);
  quickSort(arr, i + 1, end);
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
quickSort(myUnSortedArr, 0, myUnSortedArr.length - 1);
console.log(myUnSortedArr);
