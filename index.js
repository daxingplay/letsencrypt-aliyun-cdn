const { getDomainRoot } = require('./lib/utils');
const { generateCert, check } = require('./lib/letsencrypt');
const {
  describeDomainCertificateInfo,
  uploadDomainServerCertificate,
  setDomainServerCertificate,
} = require('./lib/cdn');
const { domains, beforeDays, useWildcardCert } = require('./lib/config');

async function main() {
  const domainsNeedToBeRenewed = {};
  const currentTime = new Date().getTime();
  const expireThreshold = currentTime + beforeDays * 24 * 60 * 60 * 1000;
  let i = 0;
  // get info one by one to avoid request throttle.
  for (let i = 0; i < domains.length; i++) {
    const currentDomainName = domains[i];
    let renewInfo;
    try {
      const { CertInfos: { CertInfo } } = await describeDomainCertificateInfo(currentDomainName);
      const currentCert = CertInfo.find(o => o.ServerCertificateStatus === 'on');
      if (currentCert) {
        const expireTime = new Date(currentCert.CertExpireTime).getTime();
        if (expireTime <= expireThreshold) {
          renewInfo = currentCert;
        }
      } else {
        renewInfo = {
          DomainName: currentDomainName,
        };
      }
    } catch(e) {
      console.error(e);
    }

    if (renewInfo) {
      const mainDomain = getDomainRoot(currentDomainName);
      domainsNeedToBeRenewed[mainDomain] = domainsNeedToBeRenewed[mainDomain] || [];
      domainsNeedToBeRenewed[mainDomain].push(renewInfo);
    }
  }

  // check if there's any domain needs to be renewed.
  const domainGroupsNeedToBeRenewed = Object.keys(domainsNeedToBeRenewed);
  if (domainGroupsNeedToBeRenewed.length === 0) {
    console.log(`No need to renew domain.`);
    return;
  }

  // group domains by its root.
  const groupForAllDomains = {};
  domains.forEach((domainName) => {
    const mainDomain = getDomainRoot(domainName);
    groupForAllDomains[mainDomain] = groupForAllDomains[mainDomain] || {
      status: 'unknown',
      domains: [],
    };
    groupForAllDomains[mainDomain].domains.push(domainName);
  });

  // renew domains by group
  for (let i = 0; i < domainGroupsNeedToBeRenewed.length; i++) {
    const domainRoot = domainGroupsNeedToBeRenewed[i];
    const allDomainsInThisGroup = groupForAllDomains[domainRoot].domains;
    const { ServerCertificate, PrivateKey } = await generateCert(
      useWildcardCert ? [`*.${domainRoot}`] : allDomainsInThisGroup,
    );
    const domainsInThisRenewGroup = domainsNeedToBeRenewed[domainRoot];
    const firstDomainInRenewGroup = domainsInThisRenewGroup[0];
    const { CertName } = await uploadDomainServerCertificate(
      firstDomainInRenewGroup.DomainName,
      ServerCertificate,
      PrivateKey,
    );
    for (let j = 1; j < domainsInThisRenewGroup.length; j++) {
      const currentDomainName = domainsInThisRenewGroup[j];
      await setDomainServerCertificate(currentDomainName.DomainName, CertName);
    }
  }
}

check()
  .then(main)
  .then(() => {
    console.log('Congratulations. All done.');
    process.exit(0);
  });
