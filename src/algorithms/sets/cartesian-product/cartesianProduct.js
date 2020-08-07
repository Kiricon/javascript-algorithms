export default function cartesianProduct(val1, val2) {
  if (!val1 || !val2) return null;
  const product = [];
  for (const i in val1) {
    for (const j in val2) {
      product.push([val1[i], val2[j]]);
    }
  }

  return product;
}
