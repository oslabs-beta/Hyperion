const encryptionModule = require('../controllers/encryptionModule');

const testString = '123Hello this is a test string with various characters https:// @;--_~~~';
const testPassword = 'password123@';
const testObject = {
  key1: 'i am the value of key 1',
  keyarr: ['i am an array', 'i am also in the same array', [3, 'nested array', 90.5]],
  aNumber: -756392653,
  anObject: {hi: 'hello world'}
};
const invalidJSON = 'test';

test('checks the type and length of the arguments', () => {
  expect(encryptionModule.encryptString(3, testPassword)).toBeUndefined();
  expect(encryptionModule.encryptString(testString, 6)).toBeUndefined();
  expect(encryptionModule.encryptString('', testPassword)).toBeUndefined();
  expect(encryptionModule.encryptString(testString, '')).toBeUndefined();

  expect(encryptionModule.decryptString(3, testPassword)).toBeUndefined();
  expect(encryptionModule.decryptString(testString, 6)).toBeUndefined();
  expect(encryptionModule.decryptString('', testPassword)).toBeUndefined();
  expect(encryptionModule.encryptString(testString, '')).toBeUndefined();

  expect(encryptionModule.encryptString(testString, testPassword)).not.toBeUndefined();
});

test('encrypted string is different from the original string', () => {
  const encryptedString = encryptionModule.encryptString(testString, testPassword);
  expect(encryptedString).not.toMatch(testString);
});

test('encrypt then decrypt a string successfully', () => {
  const encryptedString = encryptionModule.encryptString(testString, testPassword);
  const decryptedString = encryptionModule.decryptString(encryptedString, testPassword);
  expect(decryptedString).toMatch(testString);
});

test('cannot decrypt string with wrong password', () => {
  const encryptedString = encryptionModule.encryptString(testString, testPassword);
  const decryptedString = encryptionModule.decryptString(encryptedString, 'otherpassword');
  expect(decryptedString).toBeUndefined();
});

test('cannot decrypt non-JSON input', () => {
  let encryptedString = encryptionModule.encryptString(testString, testPassword);
  const decryptedString = encryptionModule.decryptString(encryptedString.slice(20), testPassword);
  expect(decryptedString).toBeUndefined();
});

test('encrypt then decrypt an object serialized with JSON.stringify / JSON.parse', () => {
  const encryptedObject = encryptionModule.encryptString(JSON.stringify(testObject), testPassword);
  const decryptedObject = encryptionModule.decryptString(encryptedObject, testPassword);
  expect(JSON.parse(decryptedObject)).toEqual(testObject);
});

