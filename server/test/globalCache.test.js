const globalCache = require('../controllers/globalCache');

test('set and retrieve values from cache', () => {
  globalCache.set('A', 'B');
  globalCache.set(2, 7);
  expect(globalCache.get('A')).toEqual('B');
  expect(globalCache.get(2)).toEqual(7);
});

test('clear value from cache', () => {
  expect(globalCache.get('A')).toEqual('B');
  globalCache.clear('A');
  expect(globalCache.get('A')).toBeUndefined();
});

