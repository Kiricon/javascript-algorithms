import MinHeap from '../../../data-structures/heap/MinHeap';

function myHeapSort(arr) {
  const sortedArr = [];
  const minHeap = MinHeap();

  arr.forEach((num) => minHeap.add(num));

  while (!minHeap.isEmpty()) {
    const nextMinElement = minHeap.poll();

    sortedArr.push(nextMinElement);
  }

  return sortedArr;
}

const myUnSortedArr = [8, 3, 9, 9, 0, 44, 80, 890, 1];
console.log(myUnSortedArr);
console.log(myHeapSort(myUnSortedArr));
