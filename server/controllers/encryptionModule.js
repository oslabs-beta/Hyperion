const forge = require('node-forge');

const encryptionModule = {};

const keyLengthBytes = 32; // 32 bytes = 256 bits
const keyLengthBits = keyLengthBytes * 8;
const numIterations = 310000;

/**
 * Encrypts a string using AES-256
 * @param {String} string the string to be encrypted
 * @param {String} password a 256-bit key will be derived from this password using PBKDF2
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
  let cipher = forge.cipher.createCipher('AES-CBC', key);

  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(string));
  cipher.finish();
  let encrypted = cipher.output;

  encryptionObject.payload = encrypted;
  encryptionObject.iv = iv;
  encryptionObject.salt = salt;

  return JSON.stringify(encryptionObject);
};

/**
 * Decrypts a string using AES-256
 * @param {String} string Serialized object containing the encrypted payload, iv, and salt
 * @param {String} key 
 * @returns the encrypted string
 */
encryptionModule.decryptString = (string, password) => {

  let encryptionObject = JSON.parse(string);

  let { payload, iv, salt } = encryptionObject;
  
  let key = forge.pkcs5.pbkdf2(password, salt, numIterations, keyLengthBytes);

  var decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({iv: iv});
  decipher.update(forge.util.createBuffer(payload));
  var result = decipher.finish(); // check 'result' for true/false
  if (!result) throw  new Error('Unable to decrypt message')

  return decipher.output.toString();
};

module.exports = encryptionModule;