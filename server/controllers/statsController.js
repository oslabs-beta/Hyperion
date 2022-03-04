const db = require('../models/dbModel.js');
const statsController = {};

statsController.calculateStats = (arr) => {
  arr.sort((a,b) => a - b);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const mean = arr.reduce((a,b) => a + b) / arr.length;
  const stdDev = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (arr.length));
  
  //inclusive method 
  const quartile = (q) => {
    const pos = (arr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base]);
    } else {
        return arr[base];
    };
  };
  const q1 = quartile(.25) 
  const median = quartile(.50)
  const q3 = quartile( .75)

  return {"min": min, "mean": mean, "median": median, "max": max, "stdDev": stdDev, "q1": q1, "q3": q3};
}

console.log(statsController.calculateStats([48, 52, 57, 61, 64, 72, 76, 77, 81, 85, 88]));

exports.module = statsController;