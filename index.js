const co = require('co');
const SDK = require('./lib/sdk');
const generateCert = require('./lib/letsencrypt');
const ENV = process.env;

const CONFIG = {
  accessKeyId: ENV.ACCESS_KEY_ID,
  appSecret: ENV.ACCESS_SECRET,
  endpoint: ENV.ENDPOINT || 'https://cdn.aliyuncs.com',
  apiVersion: ENV.API_VERSION || '2014-11-11',
};

const domain = ENV.DOMAINS;
const email = ENV.EMAIL;
const dnsType = ENV.DNS_TYPE;
const certPath = '/etc/lego';

co(function* () {
  const sdk = new SDK(CONFIG);
  const certs = yield generateCert(domain, email, dnsType, certPath);
  for (let i = 0; i < certs.length; i++ ) {
    const cert = certs[i];
    console.log(`updaing ${cert.DomainName} ${cert.CertName}`);
    const res = yield sdk.SetDomainServerCertificate(Object.assign(cert, {
      ServerCertificateStatus: 'on',
    }));
    console.log(res);
  }
});