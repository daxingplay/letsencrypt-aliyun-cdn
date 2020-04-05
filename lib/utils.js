const getDomainRoot = (domainName) => {
  const parts = domainName.split('.');
  const mainDomainParts = parts.slice(parts.length - 2);
  return mainDomainParts.join('.');
}

module.exports = {
  getDomainRoot,
};