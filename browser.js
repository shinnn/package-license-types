/*!
 * package-license-types | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/package-license-types
*/
window.packageLicenseTypes = function packageLicenseTypes(pkg) {
  'use strict';
  var licenses;

  if (Array.isArray(pkg.licenses)) {
    licenses = pkg.licenses;
  } else if (pkg.license) {
    if (Array.isArray(pkg.license)) {
      licenses = pkg.license;
    } else {
      licenses = [pkg.license];
    }
  } else {
    licenses = [];
  }

  return licenses.reduce(function(result, license) {
    var type;
    if (typeof license === 'string') {
      type = license;
    } else if (license && license.type) {
      type = license.type;
    }

    if (type && window.isSpdxLicenseId(type)) {
      result.push(type);
    }

    return result;
  }, []);
};
