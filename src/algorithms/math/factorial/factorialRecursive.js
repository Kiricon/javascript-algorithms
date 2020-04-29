export default function factorialRecursive(num) {
  return num > 0 ? factorialRecursive(num - 1) * num : 1;
}
