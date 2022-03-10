/**
 * Use globalCache to store in volatile memory the information 
 * that is needed to generate the AES keys for encryption/decryption. 
 * The cache is designed as a key-value pair storage system.
 */
const globalCache = {};

/**
 * Cache object. This is not intended to be manipulated directly.
 * See helper functions below
 */
globalCache._data = {};

/**
 * Retrieve value from cache
 * @param {*} key 
 * @returns 
 */
globalCache.get = (key) => {
  return globalCache._data[key];
};

/**
 * Place key-value pair in cache
 * @param {*} key 
 * @param {*} value 
 */
globalCache.set = (key, value) => {
  globalCache._data[key] = value;
};

/**
 * Delete a key-value pair from cache
 * @param {*} key 
 * @param {*} value 
 */
globalCache.clear = (key) => {
  delete globalCache._data[key];
}; 

module.exports = globalCache;
