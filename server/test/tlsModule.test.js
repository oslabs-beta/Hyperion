const tlsModule = require('../controllers/tlsModule');

const mockPool = {};

const successObject = {
  rows: [{
    ssl: true,
    version: 'TLSv1.2'
  }]
};

const successObject2 = {
  rows: [{
    ssl: true,
    version: 'TLSv1.3'
  }]
};

const failureObject = {
  rows: [{
    ssl: false,
    version: 'TLSv1.1'
  }]
}

const failureObject2 = {
  rows: [{
    ssl: false,
    version: 'TLSv1.2'
  }]
}

const failureObject3 = {
  rows: [{
    ssl: true,
    version: 'TLSv1.1'
  }]
}

const invalidObject = {
  invalidKey: 'this object is invalid'
}

mockPool.query = jest.fn();

mockPool.query
  .mockReturnValueOnce(Promise.resolve(successObject))
  .mockReturnValueOnce(Promise.resolve(successObject2))
  .mockReturnValueOnce(Promise.resolve(failureObject))
  .mockReturnValueOnce(Promise.resolve(failureObject2))
  .mockReturnValueOnce(Promise.resolve(failureObject3))
  .mockReturnValueOnce(Promise.resolve(invalidObject));


test('return true when TLS connection is enabled (1/2)', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).resolves.toBe(true);
});

test('return true when TLS connection is enabled (2/2)', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).resolves.toBe(true);
});

test('return false when TLS connection is disabled (1/3)', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).resolves.toBe(false);
});

test('return false when TLS connection is disabled (2/3)', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).resolves.toBe(false);
});

test('return false when TLS connection is disabled (3/3)', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).resolves.toBe(false);
});

test('throws error if the object is not valid', () => {
  return expect(tlsModule.isTlsEnabled(mockPool)).rejects.toThrow();
});

