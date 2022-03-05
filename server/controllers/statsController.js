const db = require('../models/dbModel.js');
const statsController = {};

statsController.calculateStats = (arr) => {
  arr.sort((a,b) => a - b);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  let mean = arr.reduce((a,b) => a + b) / arr.length;
  mean = Math.round(mean*100)/100
  let stdDev = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (arr.length - 1));
  stdDev = Math.round(stdDev*100)/100
  //inclusive 
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

  return {"min": min, "max": max, "mean": mean, "median": median, "stdDev": stdDev, "q1": q1, "q3": q3};
}



module.exports = statsController;