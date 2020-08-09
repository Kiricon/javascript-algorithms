import MergeSort from '../../sorting/merge-sort/MergeSort';

export default class Knapsack {
  constructor(possibleKnapsackItems, maxKnapsackWeight) {
    this.possibleItems = possibleKnapsackItems;
    this.maxWeight = maxKnapsackWeight;
  }

  sortPossibleItemsByKey(key) {
    this.possibleItems = new MergeSort({
      compareCallback: (itemA, itemB) => {
        if (itemA[key] === itemB[key]) {
          return 0;
        }

        return itemA[key] > itemB[key] ? -1 : 1;
      },
    }).sort(this.possibleItems);
  }

  solveZeroOneKnapsackProblem() {
    this.sortPossibleItemsByKey('value');
    this.sortPossibleItemsByKey('weight');

    this.selectedItems = [];

    const numberOfRows = this.possibleItems.length;
    const numberOfColumns = this.maxWeight;
    const knapsackMatrix = Array(numberOfRows)
      .fill(null)
      .map(() => {
        return Array(numberOfColumns + 1).fill(null);
      });

    // Fill the first column with 0s
    for (const itemIndex in this.possibleItems) {
      knapsackMatrix[itemIndex][0] = 0;
    }

    // fill out first row
    const firstItemIndex = 0;
    const firstItemWeight = this.possibleItems[firstItemIndex].weight;
    const firstItemValue = this.possibleItems[firstItemIndex].value;
    for (let weightIndex = 1; weightIndex <= this.maxWeight; weightIndex++) {
      const ans = firstItemWeight <= weightIndex ? firstItemValue : 0;
      knapsackMatrix[firstItemIndex][weightIndex] = ans;
    }

    for (
      let itemIndex = 1;
      itemIndex < this.possibleItems.length;
      itemIndex++
    ) {
      for (let weightIndex = 1; weightIndex <= this.maxWeight; weightIndex++) {
        const currentItemWeight = this.possibleItems[itemIndex].weight;
        const currentItemValue = this.possibleItems[itemIndex].value;

        if (currentItemWeight > weightIndex) {
          knapsackMatrix[itemIndex][weightIndex] =
            knapsackMatrix[itemIndex - 1][weightIndex];
        } else {
          knapsackMatrix[itemIndex][weightIndex] = Math.max(
            currentItemValue +
              knapsackMatrix[itemIndex - 1][weightIndex - currentItemWeight],
            knapsackMatrix[itemIndex - 1][weightIndex]
          );
        }
      }
    }

    let itemIndex = this.possibleItems.length - 1;
    let weightIndex = this.maxWeight;

    while (itemIndex > 0) {
      const currentItem = this.possibleItems[itemIndex];
      const prevItem = this.possibleItems[itemIndex - 1];

      if (
        knapsackMatrix[itemIndex][weightIndex] &&
        knapsackMatrix[itemIndex][weightIndex] ===
          knapsackMatrix[itemIndex - 1][weightIndex]
      ) {
        const prevSumValue = knapsackMatrix[itemIndex - 1][weightIndex];
        const prevPrevSumValue = knapsackMatrix[itemIndex - 2][weightIndex];
        if (
          !prevSumValue ||
          (prevSumValue && prevPrevSumValue !== prevSumValue)
        ) {
          this.selectedItems.push(prevItem);
        }
      } else if (
        knapsackMatrix[itemIndex - 1][weightIndex - currentItem.weight]
      ) {
        this.selectedItems.push(prevItem);
        weightIndex -= currentItem.weight;
      }

      itemIndex--;
    }
  }

  get totalValue() {
    return this.selectedItems.reduce((accumulator, item) => {
      return accumulator + item.totalValue;
    }, 0);
  }

  get totalWeight() {
    return this.selectedItems.reduce((accumulator, item) => {
      return accumulator + item.totalWeight;
    }, 0);
  }
}
