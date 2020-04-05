const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const util = require('util');
const config = require('./config');

const execFile = util.promisify(childProcess.execFile);

const baseDir = path.resolve(__dirname, '../');
const legoBinPath = path.resolve(baseDir, './lego');

const certPath = path.resolve(baseDir, './certificates');

async function generateCert(domains) {
  const certName = domains[0];
  const certRealPath = path.join(certPath, './certificates');

  const certFileName = config.useWildcardCert ? certName.replace('*', '_') : certName;
  const certificatePath = path.join(certRealPath, `./${certFileName}.crt`);
  const privateKeyPath = path.join(certRealPath, `./${certFileName}.key`);
  const isNew = !fs.existsSync(privateKeyPath);
  console.info(`private key ${isNew ? 'not ' : ''}exists`);

  const baseParams = [
    `--dns=${config.dnsType}`,
    `--email=${config.email}`,
    `--path=${certPath}`,
    '--accept-tos',
  ];
  const params = domains.reduce((arr, d) => arr.concat(['-d', d]), []).concat(baseParams);
  if (isNew) {
    params.push('run');
  } else {
    params.push('renew');
    params.push('--reuse-key');
    // params.push('--days');
    // params.push(`${beforeDays}`);
  }
  console.log(`generate cert param: ${params.join(' ')}`);
  try {
    const { stdout, stderr } = await execFile(legoBinPath, params);

    console.log(stdout);
    console.log(stderr);
  } catch(e) {
    console.log(e.stdout);
    console.log(e.stderr);
    console.error(e);
    throw e;
  }
  
  const ServerCertificate = fs.readFileSync(certificatePath);
  const PrivateKey = fs.readFileSync(privateKeyPath);
  return {
    domains,
    CertName: certFileName,
    ServerCertificate: ServerCertificate.toString(),
    PrivateKey: PrivateKey.toString(),
  };
}

async function check() {
  const exists = fs.existsSync(legoBinPath);
  if (!exists) {
    throw new Error('Cannot find lego bin file');
  }
  if (!fs.existsSync(certPath)) {
    const mkdir = util.promisify(fs.mkdir);
    return mkdir(certPath, { recursive: true });
  }
}

module.exports = {
  generateCert,
  check,
};
