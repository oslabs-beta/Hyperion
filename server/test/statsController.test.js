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

  it('handles an even array', () => {
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

  it('handles small arrays', () => {
    arr = [5];
    expect(calculateStats(arr)).toEqual({
      "min": 5, 
      "max": 5, 
      "mean": 5, 
      "median": 5, 
      "stdDev": NaN, 
      "q1": 5, 
      "q3": 5
    });
  });

  it('handles empty arrays', () => {
    arr = [];
    expect(calculateStats(arr)).toBeUndefined();
  });

  it('handles arrays with different types', () => {
    arr = [3, 4, 5, 'a', 8];
    expect(calculateStats(arr)).toBeUndefined();
  });
});