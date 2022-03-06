const globalCache = {};

globalCache._data = {};

globalCache.get = (key) => {
  return globalCache._data[key];
};

globalCache.set = (key, value) => {
  globalCache._data[key] = value;
};

globalCache.clear = (key) => {
  delete globalCache._data[key];
}; 

module.exports = globalCache;
