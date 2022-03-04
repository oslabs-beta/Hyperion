const generateCombinations = require('../controllers/generateCombinations.js');

test('handles 2-d array of dimensions 1x1', () => {
  expect(generateCombinations([['A']])).toEqual([['A']]);
});

test('handles 2-d array of dimensions 1x2', () => {
  expect(generateCombinations([['A', 'B']])).toEqual([['A'], ['B']]);
});

test('handles 2-d array of dimensions 2x3', () => {
  expect(generateCombinations([['A', 'B'], ['C', 'D', 'E']])).toEqual([['A', 'C'], ['A', 'D'], ['A', 'E'], ['B', 'C'], ['B', 'D'], ['B', 'E']]);
});

test('handles 2-d array of dimensions 3x2', () => {
  expect(generateCombinations([['A', 'B', 'C'], ['D', 'E']])).toEqual([['A', 'D'], ['A', 'E'], ['B', 'D'], ['B', 'E'], ['C', 'D'], ['C', 'E']]);
});

