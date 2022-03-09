/**
 * Implement AES-256-GCM using node-forge
 * https://www.npmjs.com/package/node-forge
 */

const forge = require('node-forge');

const encryptionModule = {};

const keyLengthBytes = 32; 
const numIterations = 310000;

/**
 * Encrypts a string using AES-256-GCM
 * @param {String} string the string to be encrypted
 * @param {String} password password that will be used to derive a 256-bit key using PBKDF2
 * @returns the encrypted string
 */
encryptionModule.encryptString = (string, password) => {

  if (typeof string !== 'string' || typeof password !== 'string') return undefined;
  if (!string.length || !password.length) return undefined;

  const encryptionObject = {
    iv: undefined,
    salt: undefined,
    payload: undefined
  };
  let iv = forge.random.getBytesSync(keyLengthBytes);
  let salt = forge.random.getBytesSync(keyLengthBytes);
  let key = forge.pkcs5.pbkdf2(password, salt, numIterations, keyLengthBytes);
  let cipher = forge.cipher.createCipher('AES-GCM', key);

  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(string));
  cipher.finish();
  let encrypted = cipher.output;

  encryptionObject.payload = forge.util.bytesToHex(encrypted);
  encryptionObject.iv = forge.util.bytesToHex(iv);
  encryptionObject.salt = forge.util.bytesToHex(salt);
  encryptionObject.tag = forge.util.bytesToHex(cipher.mode.tag);

  return JSON.stringify(encryptionObject);
};

/**
 * Decrypts a string using AES-256-GCM
 * @param {String} string Serialized object containing the encrypted payload, iv, salt, and tag
 * @param {String} password that was used to encrypt the data
 * @returns the decrypted string
 */
encryptionModule.decryptString = (string, password) => {

  if (typeof string !== 'string' || typeof password !== 'string') return undefined;
  if (!string.length || !password.length) return undefined;


  let encryptionObject;
  try {
    encryptionObject = JSON.parse(string);
  } catch (e) {
    return undefined;
  }
  
  let { payload, iv, salt, tag } = encryptionObject;

  payload = forge.util.hexToBytes(payload);
  salt = forge.util.hexToBytes(salt);
  iv = forge.util.hexToBytes(iv);
  tag = forge.util.hexToBytes(tag);
  
  let key = forge.pkcs5.pbkdf2(password, salt, numIterations, keyLengthBytes);

  let decipher = forge.cipher.createDecipher('AES-GCM', key);
  decipher.start({iv, tag});
  decipher.update(forge.util.createBuffer(payload));
  let pass = decipher.finish(); 

  if (!pass) return undefined;

  return decipher.output.toString();
};

module.exports = encryptionModule;