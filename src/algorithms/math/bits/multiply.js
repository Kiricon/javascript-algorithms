import isEven from './isEven';
import multiplyByTwo from './multiplyByTwo';
import divideByTwo from './divideByTwo';
import isPositive from './isPositive';

export default function multiply(a, b) {
  if (!a || !b) return 0;
  if (isEven(b)) {
    return (multiplyByTwo(a) * divideByTwo(b));
  } if (isPositive(b)) {
    return (multiplyByTwo(a) * divideByTwo((b - 1)) + a);
  }
  return (multiplyByTwo(a) * divideByTwo((b + 1)) - a);
}
