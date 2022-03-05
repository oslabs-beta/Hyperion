const { calculateStats } = require('../controllers/statsController.js')

describe('stats test', () => {
  let arr; 

  it('handles an odd array', () =>{
    arr = [48, 52, 57, 61, 64, 72, 76, 77, 81, 85, 88];
    expect(calculateStats(arr)).toEqual({
      "min": 48, 
      "max": 88, 
      "mean": 69.18, 
      "median": 72, 
      "stdDev": 13.59, 
      "q1": 59, 
      "q3": 79
    });
  });

  it('handles an even array', () =>{
    arr = [48, 52, 57, 61, 64, 72, 76, 77, 81, 85];
    expect(calculateStats(arr)).toEqual({
      "min": 48, 
      "max": 85, 
      "mean": 67.3, 
      "median": 68, 
      "stdDev": 12.72, 
      "q1": 58, 
      "q3": 76.75
    });
  });
});