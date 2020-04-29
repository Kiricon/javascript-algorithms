export default function multiplyUnsigned(num1, num2) {
  let result = 0;

  let multiplyier = num2;
  let bitIndex = 0;
  while (multiplyier !== 0) {
    if (multiplyier & 1) {
      result += (num1 << bitIndex);
    }

    bitIndex += 1;
    multiplyier >>= 1;
  }

  return result;
}
