const assert = require('assert');
const { validateCnpFormat, validateCnpContent } =  require('../utils/cnpOperations');

describe('it checks if the CNP is a valid one', () => {
  it('checks if validateFormat works properly by passing a valid cnp', (done) => {
    let isValid = validateCnpFormat("1940705080008");
    assert(isValid);
    done();
  });

  it('check if the validateContent works properly by passing a valid cnp', (done) => {
    let isValid = validateCnpContent("1940705080018");
    assert(isValid);
    done();
  });

  it('checks if validateFormat works properly by passing an invalid cnp', (done) => {
    let isValid = validateCnpFormat("1940A0508001A");
    assert(!isValid);
    done();
  });

  it('check if the validateContent works properly by passing an invalid cnp', (done) => {
    let isValid = validateCnpContent("6134567890123");
    assert(!isValid);
    done();
  });
})
