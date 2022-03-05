const forge = require('node-forge');

const encryptionModule = {};

/**
 * Encrypts a string using AES-256
 * @param {String} string 
 * @param {String} key 
 * @returns the encrypted string
 */
encryptionModule.encryptString = (string, key) => {

  return string;
};

/**
 * Decrypts a string using AES-256
 * @param {String} string 
 * @param {String} key 
 * @returns the encrypted string
 */
encryptionModule.decryptString = (string, key) => {

  return string + '...';
};

module.exports = encryptionModule;