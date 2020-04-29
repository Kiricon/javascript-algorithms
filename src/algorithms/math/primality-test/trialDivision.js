export default function isPrime(number) {
  // Take care of negatives and 1
  if (number <= 1) return false;
  // Take care of floats
  if (number % 1 !== 0) return false;
  // Take care of early on numbers that we will check for later
  if (number === 2 || number === 3 || number === 5) return true;
  // We all know that odd numbers can still be divisible by 5 or 3
  // so let's catch them early
  if (number % 2 === 0 || number % 3 === 0 || number % 5 === 0) return false;

  const max = Math.sqrt(number);

  for (let i = 3; i < max; i += 2) {
    if (number % i === 0) return false;
  }

  return true;
}
