const circleRadius = 1;

function getNGonSideLength(sideLength, splitCount) {
  if (splitCount <= 0) {
    return sideLength;
  }

  const halfSide = sideLength / 2;

  const perpendicular = Math.sqrt((circleRadius ** 2) - (halfSide ** 2));
  const excessRadius = circleRadius - perpendicular;
  const splitSideLength = Math.sqrt((excessRadius ** 2) + (halfSide ** 2));

  return getNGonSideLength(splitSideLength, splitCount - 1);
}

function getNGonSideCount(splitCount) {
  const hexagonSideCount = 6;

  return hexagonSideCount * (splitCount ? 2 ** splitCount : 1);
}

export default function liuHui(splitCount = 1) {
  const nGonSideLength = getNGonSideLength(circleRadius, splitCount - 1);
  const nGonSideCount = getNGonSideCount(splitCount - 1);
  const nGonPerimeter = nGonSideLength * nGonSideCount;
  const approximateCircleArea = (nGonPerimeter / 2) * circleRadius;

  return approximateCircleArea / (circleRadius ** 2);
}
