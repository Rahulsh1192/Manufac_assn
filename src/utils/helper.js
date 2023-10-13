export const helpers = {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateGamma,
};

function calculateGamma(obj) {
  let gamma;
  gamma = (+obj.Ash * +obj.Hue) / +obj.Magnesium;
  return +gamma.toFixed(3);
}
function calculateMean(arr, key) {
  const sum = arr.reduce((total, item) => total + item[key] ?? 0, 0);
  return parseFloat((parseFloat(sum) / parseInt(arr.length)).toFixed(3));
}

function calculateMedian(arr, key) {
  const sorted = arr.map((item) => item[key]).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}

function calculateMode(arr, key) {
  const counts = {};
  let mode = [];
  let maxCount = 0;

  arr.forEach((item) => {
    const value = item[key];
    counts[value] = (counts[value] || 0) + 1;

    if (counts[value] > maxCount) {
      maxCount = counts[value];
      mode = [value];
    } else if (counts[value] === maxCount) {
      mode.push(value);
    }
  });
  console.log(counts);
  return mode;
}
