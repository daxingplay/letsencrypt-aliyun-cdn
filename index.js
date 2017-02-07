'use strict';

const co = require('co');
const SDK = require('./lib/sdk');
const generateCert = require('./lib/letsencrypt');
const Certificate = require('./lib/certificate');
const ENV = process.env;

const CONFIG = {
  accessKeyId: ENV.ACCESS_KEY_ID,
  appSecret: ENV.ACCESS_SECRET,
  endpoint: ENV.ENDPOINT || 'https://cdn.aliyuncs.com',
  apiVersion: ENV.API_VERSION || '2014-11-11',
};

const domains = (ENV.DOMAINS || '').split(',');
const email = ENV.EMAIL;
const dnsType = ENV.DNS_TYPE;
const certPath = '/etc/lego';

co(function* () {
  const sdk = new SDK(CONFIG);
  const { ServerCertificate, PrivateKey } = yield generateCert(domains, email, dnsType, certPath);
  const { GetDomainDetailModel: mainDomainInfo } = yield sdk.DescribeCdnDomainDetail({ DomainName: domains[0] });
  const certIsEqual = Certificate.isEqual(mainDomainInfo.ServerCertificate, ServerCertificate.toString());
  let CertName = mainDomainInfo.CertificateName;

  // check if cert need to update; this action generate new cert name;
  if (mainDomainInfo.ServerCertificateStatus === 'off' || !certIsEqual) {
    CertName = `${domains[0]}-${Date.now()}`;
    console.log(`updating cert, generate cert name: ${CertName}`);
    yield sdk.SetDomainServerCertificate({
      DomainName: domains[0],
      ServerCertificateStatus: 'on',
      CertName, ServerCertificate, PrivateKey,
    });
  } else {
    console.log(`no need to update certicate. cert is equal? ${certIsEqual}`);
  }

  // check each other domain whether it has used new cert, otherwise, set this domain to use cert which main domain uses.
  for (let i = 1; i < domains.length; i++) {
    const domain = domains[i];
    const { GetDomainDetailModel: domainInfo } = yield sdk.DescribeCdnDomainDetail({ DomainName: domain });
    if (domainInfo.CertificateName !== CertName) {
      console.log(`updaing ${domain} to use cert: ${CertName}`);
      yield sdk.SetDomainServerCertificate({
        DomainName: domain,
        CertName,
        ServerCertificateStatus: 'on',
      });
    } else {
      console.log(`${domain} has already used ${CertName}, skip.`);
    }
  }
});
