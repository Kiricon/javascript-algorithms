function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currIndex = i;
    while (currIndex > 0 && arr[currIndex] < arr[currIndex - 1]) {
      const temp = arr[currIndex];
      arr[currIndex] = arr[currIndex - 1];
      arr[currIndex - 1] = temp;
      currIndex--;
    }
  }

  return arr;
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
console.log(insertionSort(myUnSortedArr));
