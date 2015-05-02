/*!
 * package-license-types | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/package-license-types
*/

var isSpdxLicenseId = require('is-spdx-license-id');

module.exports = function packageLicenseTypes(pkg) {
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

    if (typeof type === 'string' && isSpdxLicenseId(type)) {
      result.push(type);
    }

    return result;
  }, []);
};
