import countSetBits from './countSetBits';

export default function bitsDiff(num1, num2) {
  return (countSetBits(num1 ^ num2));
}
