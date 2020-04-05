const { RPCClient } = require('@alicloud/pop-core');
const { format } = require('fecha');
const assert = require('assert');
const { getDomainRoot } = require('./utils');
const config = require('./config');

const client = new RPCClient({
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  endpoint: config.endpoint,
  apiVersion: config.apiVersion,
});

const describeDomainCertificateInfo = async (domainName) => {
  return client.request('DescribeDomainCertificateInfo', {
    RegionId: 'cn-hangzhou',
    DomainName: 'f1.ojcdn.com',
  });
};

const uploadDomainServerCertificate = async (domainName, cert, key) => {
  assert(domainName, 'UploadDomainServerCertificate: domainName is not specified');
  assert(cert, 'UploadDomainServerCertificate: cert is not specified');
  assert(key, 'UploadDomainServerCertificate: key is not specified');
  const CertName = `${getDomainRoot(domainName)}-${format(new Date(), 'isoDate')}`;
  const params = {
    RegionId: 'cn-hangzhou',
    DomainName: domainName,
    ServerCertificateStatus: 'on',
    CertName,
    ServerCertificate: cert,
    PrivateKey: key,
    CertType: 'upload',
  };
  const ret = await client.request('SetDomainServerCertificate', params, {
    method: 'POST',
  });
  return {
    RequestId: ret,
    CertName,
  };
}

const setDomainServerCertificate = async (domainName, certName) => {
  return client.request('SetDomainServerCertificate', {
    RegionId: 'cn-hangzhou',
    DomainName: domainName,
    ServerCertificateStatus: 'on',
    CertName: certName,
  }, {
    method: 'POST',
  });
}

module.exports = {
  describeDomainCertificateInfo,
  uploadDomainServerCertificate,
  setDomainServerCertificate,
}
