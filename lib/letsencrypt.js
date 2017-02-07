'use strict';

const co = require('co');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const execFile = require('child_process').execFile;

module.exports = function generateCert(domains, email, dns, certPath) {
  const certName = domains[0];
  const certRealPath = path.join(certPath, './certificates');
  const privateKeyPath = path.join(certRealPath, `./${certName}.key`);
  const isNew = !fs.existsSync(privateKeyPath);
  console.info(`private key ${isNew ? 'not ' : ''}exists`);
  return new Promise((resolve, reject) => {
    const baseParams = [
      '--dns',
      dns,
      '--email',
      email,
      '--path',
      certPath,
      '--accept-tos',
    ];
    const params = domains.reduce((arr, d) => arr.concat(['-d', d]), []).concat(baseParams);
    if (isNew) {
      params.push('run');
    } else {
      params.push('renew');
      params.push('--reuse-key');
      params.push('--days');
      params.push('10');
    }
    console.log(`generate cert param: ${params.join(' ')}`);
    const child = execFile('lego', params, (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error) {
        reject(error);
      } else {
        const ServerCertificate = fs.readFileSync(path.join(certRealPath, `./${certName}.crt`));
        const PrivateKey = fs.readFileSync(privateKeyPath);
        resolve({
          domains,
          CertName: certName,
          ServerCertificate,
          PrivateKey,
        });
      }
    });
  });
};
