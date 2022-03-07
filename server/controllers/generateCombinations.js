/**
 * Generate the combinations of parameters we want to test for
 * given a two dimensional array of parameters provided by the user
 * @param {Array[]} paramsArray Two dimensional array of parameters provided by the user
 * @returns {Array} One-dimensional array containing all the combinations from the original array
 */
const generateCombinations = (paramsArray) => {

  // Return undefined if the input is not a 2D array
  if (!Array.isArray(paramsArray) || !Array.isArray(paramsArray[0])) return undefined;

  const combinations = [];

  const generator = (i, arr) => {
    if (arr.length === paramsArray.length) return combinations.push([...arr]);
    for (let n = 0; n < paramsArray[i].length; n++) {
      generator(i + 1, [...arr, paramsArray[i][n]]);
    }
  };

  // Invoke generator function to recursively populate the combinations array
  generator(0, []);

  return combinations;
};

module.exports = generateCombinations;