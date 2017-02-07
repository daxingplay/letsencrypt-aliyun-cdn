'use strict';

// const co = require('co');
const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const certificate = require('../lib/certificate');

describe('Certificate Test', function() {

  it('cert1 and cert2 should equal', function() {
    const crt1 = fs.readFileSync(path.resolve(__dirname, './certs/cert-1.crt')).toString();
    const crt2 = require('./certs/cert-2.js');
    expect(certificate.isEqual(crt1, crt2)).to.be.true;
  });

});
