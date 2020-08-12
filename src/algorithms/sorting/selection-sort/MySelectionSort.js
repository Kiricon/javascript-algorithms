function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let currVal = arr[i];
    let swapIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < currVal) {
        currVal = arr[j];
        swapIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[swapIndex];
    arr[swapIndex] = temp;
  }

  return arr;
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
console.log(selectionSort(myUnSortedArr));
