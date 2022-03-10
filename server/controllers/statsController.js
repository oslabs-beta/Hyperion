const statsController = {};

/**
 * Calculate summary statistics for an array of numbers (min, max, mean, median, stdDev, q1 and q3).
 * If the input is invalid, returns undefined.
 * Q1 and Q3 are inclusive.
 * The standard deviation is calculated using the formula for a sample (and not population).
 * 
 * @param {Array<number>} arr Array of numbers
 * @returns Returns an object containing keys named min, max, mean, median, stdDev, q1, q3.
 */
statsController.calculateStats = (arr) => {

  // Verify that the input matches the specifications
  if (!Array.isArray(arr) || !arr.length) return undefined;
  if (arr.some(element => typeof element !== 'number')) return undefined;

  // calculate min, max, mean, stdDev
  arr.sort((a,b) => a - b);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  let mean = arr.reduce((a, b) => a + b) / arr.length;
  mean = Math.round(mean * 100) / 100;
  let stdDev = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (arr.length - 1));
  stdDev = Math.round(stdDev * 100) / 100;

  // calculate quartiles and median 
  const quartile = (q) => {
    const pos = (arr.length - 1) * q; // [1, 2, 3, 4, 5, 6] length = 6 / 5/ 5 * 0.25 = 1.25
    const base = Math.floor(pos); // base is 1
    const rest = pos - base; // rest is 0.25
    if (arr[base + 1] !== undefined) return arr[base] + rest * (arr[base + 1] - arr[base]);
    else return arr[base];
  };

  const q1 = quartile(.25);
  const median = quartile(.50);
  const q3 = quartile(.75);

  return {
    min, 
    max, 
    mean, 
    median, 
    stdDev, 
    q1, 
    q3
  };
};

module.exports = statsController;
