function myCountSort(arr) {
  const countArr = [];
  arr.forEach((val) => {
    if (!countArr[val]) countArr[val] = 0;
    countArr[val]++;
  });

  const resultArr = [];
  let countIndex = 0;
  while (countIndex < countArr.length) {
    if (!countArr[countIndex]) {
      countIndex++;
      continue;
    }

    resultArr.push(countIndex);
    countArr[countIndex]--;
  }

  return resultArr;
}

const unSortedArr = [3, 4, 3, 3, 4, 0, 1, 1, 0];
console.log(unSortedArr);
console.log(myCountSort(unSortedArr));
