const { RPCClient } = require('@alicloud/pop-core');
const { format } = require('fecha');
const assert = require('assert');
const { getDomainRoot } = require('./utils');
const config = require('./config');

const client = new RPCClient({
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  endpoint: config.endpoint,
  apiVersion: '2018-05-10',
});

const describeCdnCertificateDetail = async (certName) => {
  try {
    const cert = await client.request('DescribeCdnCertificateDetail', {
      CertName: certName,
      RegionId: 'cn-hangzhou',
    });
    if (cert && cert.CertId) {
      return cert;
    }
  } catch(e) {
    console.error(e);
  }
  return null;
};

const setDomainServerCertificate = async (domainName, certName) => {
  return client.request('SetDomainServerCertificate', {
    RegionId: 'cn-hangzhou',
    DomainName: domainName,
    ServerCertificateStatus: 'on',
    CertName: certName,
  }, {
    method: 'POST',
  });
};

const describeDomainCertificateInfo = async (domainName) => {
  return client.request('DescribeDomainCertificateInfo', {
    RegionId: 'cn-hangzhou',
    DomainName: domainName,
  });
};

const uploadDomainServerCertificate = async (domainName, cert, key) => {
  assert(domainName, 'UploadDomainServerCertificate: domainName is not specified');
  assert(cert, 'UploadDomainServerCertificate: cert is not specified');
  assert(key, 'UploadDomainServerCertificate: key is not specified');
  const certName = `${getDomainRoot(domainName)}-${format(new Date(), 'isoDate')}`;

  const certInfo = await describeCdnCertificateDetail(certName);
  if (certInfo && certInfo.CertId) {
    await setDomainServerCertificate(domainName, certName);
    return {
      RequestId: certInfo.RequestId,
      CertName: certName,
    };
  }
  const params = {
    RegionId: 'cn-hangzhou',
    DomainName: domainName,
    ServerCertificateStatus: 'on',
    CertName: certName,
    ServerCertificate: cert,
    PrivateKey: key,
    CertType: 'upload',
  };
  const ret = await client.request('SetDomainServerCertificate', params, {
    method: 'POST',
  });
  return {
    RequestId: ret,
    CertName: certName,
  };
};

module.exports = {
  describeDomainCertificateInfo,
  uploadDomainServerCertificate,
  setDomainServerCertificate,
}
