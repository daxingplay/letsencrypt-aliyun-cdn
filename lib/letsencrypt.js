'use strict';

const co = require('co');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const execFile = require('child_process').execFile;

module.exports = function generateCert(domain, email, dns, certPath) {
  const domains = domain.split(',');
  const certName = domains[0];
  const privateKeyPath = path.join(certPath, `./${certName}.key`);
  const isNew = !fs.statSync(privateKeyPath).isFile();
  return new Promise((resolve, reject) => {
    let params = [
      '--dns',
      dns,
      '--email',
      email,
      '--path',
      certPath,
      '--accept-tos',
    ].concat(domains.reduce((arr, d) => arr.concat(['-d', d]), []));
    if (isNew) {
      params.push('run');
    } else {
      params.push('renew');
      params.push('--reuse-key');
      params.push('--days');
      params.push('10');
    }
    const child = execFile('/usr/bin/lego', params, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        const ServerCertificate = fs.readFileSync(path.join(certPath, `./${certName}.crt`));
        const PrivateKey = fs.readFileSync(privateKeyPath);
        resolve(domains.map(d => ({
          DomainName: d,
          CertName: certName,
          ServerCertificate,
          PrivateKey,
        })));
      }
    });
  });
};
