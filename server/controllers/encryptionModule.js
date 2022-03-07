const forge = require('node-forge');

const encryptionModule = {};

const keyLengthBytes = 32; 
const keyLengthBits = keyLengthBytes * 8; // 32 bytes = 256 bits
const numIterations = 310000;

/**
 * Encrypts a string using AES-256-GCM
 * @param {String} string the string to be encrypted
 * @param {String} password password that will be used to derive a 256-bit key using PBKDF2
 * @returns the encrypted string
 */
encryptionModule.encryptString = (string, password) => {

  const encryptionObject = {
    iv: undefined,
    salt: undefined,
    payload: undefined
  };
  let iv = forge.random.getBytesSync(keyLengthBytes);
  let salt = forge.random.getBytesSync(keyLengthBits);
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
 * @returns the encrypted string
 */
encryptionModule.decryptString = (string, password) => {

  let encryptionObject = JSON.parse(string);

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
  if (!pass) throw  new Error('Unable to decrypt message')

  return decipher.output.toString();
};

module.exports = encryptionModule;