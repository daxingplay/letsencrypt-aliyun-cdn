const ENV = process.env;

module.exports = {
  accessKeyId: ENV.ACCESS_KEY_ID,
  accessKeySecret: ENV.ACCESS_SECRET,
  endpoint: ENV.ENDPOINT || 'https://cdn.aliyuncs.com',
  apiVersion: ENV.API_VERSION || '2018-05-10',
  email: ENV.EMAIL,
  dnsType: ENV.DNS_TYPE,
  domains: (ENV.DOMAINS || '').split(','),
  useWildcardCert: ENV.WILDCART_CERT !== 'false',
  // do not support before 0 day, it is useless.
  beforeDays: parseInt(ENV.BEFORE_DAYS, 10) || 7,
};
