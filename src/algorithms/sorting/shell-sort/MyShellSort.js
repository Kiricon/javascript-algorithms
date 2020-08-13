function myShellSort(arr) {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = 0; i + gap < arr.length; i++) {
      if (arr[i] > arr[i + gap]) {
        const temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;
      }
    }
    gap = Math.floor(gap / 2);
  }
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
myShellSort(myUnSortedArr);
console.log(myUnSortedArr);
