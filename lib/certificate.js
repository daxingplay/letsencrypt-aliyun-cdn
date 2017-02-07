'use strict';

const x509 = require('x509');

module.exports = {
  isEqual: function(cert1, cert2) {
    const ret1 = x509.parseCert(cert1);
    const ret2 = x509.parseCert(cert2);
    return ret1.fingerPrint === ret2.fingerPrint;
  },
};
