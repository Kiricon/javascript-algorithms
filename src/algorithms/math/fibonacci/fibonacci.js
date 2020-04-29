export default function fibonacci(num) {
  const nums = [1];
  let sum = 1;
  let lastSum = 0;
  for (let i = 2; i <= num; i++) {
    const temp = sum;
    sum += lastSum;
    nums.push(sum);
    lastSum = temp;
  }

  return nums;
}
