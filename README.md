# package-license-types

[![Build Status](https://travis-ci.org/shinnn/package-license-types.svg?branch=master)](https://travis-ci.org/shinnn/package-license-types)
[![Build status](https://ci.appveyor.com/api/projects/status/q2fudvpnd95hg5qe?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/package-license-types)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/package-license-types.svg)](https://coveralls.io/r/shinnn/package-license-types)
[![devDependency Status](https://david-dm.org/shinnn/package-license-types/dev-status.svg)](https://david-dm.org/shinnn/package-license-types#info=devDependencies)

Extract license types from package data

```javascript
var pkg = {
  name: 'foo',
  version: '1.0.0',
  description: 'Lorem ipsum dolor sit amet',
  repository: 'shinnn/foo',
  author: 'Shinnosuke Watanabe',
  licenses: [
    'BSD-3-Clause',
    {
      type: 'MIT',
      url: 'LICENSE.md'
    }
  ]
};

packageLicenseTypes(pkg); //=> ['BSD-3-Clause', 'MIT']
```

It supports [package.json](https://docs.npmjs.com/files/package.json), [bower.json](https://github.com/bower/bower.json-spec) and [component.json](https://github.com/componentjs/spec/blob/master/component.json/specifications.md).

## Installation

### Package managers

#### [npm](https://www.npmjs.com/) [![NPM version](https://badge.fury.io/js/package-license-types.svg)](https://www.npmjs.com/package/package-license-types)

```sh
npm install package-license-types
```

#### [bower](http://bower.io/) [![Bower version](https://badge.fury.io/bo/package-license-types.svg)](https://github.com/shinnn/package-license-types/releases)

```sh
bower install package-license-types
```

#### [Duo](http://duojs.org/)

```javascript
var packageLicenseTypes = require('shinnn/package-license-types');
```

### Standalone

[Download the script file directly](https://raw.githubusercontent.com/shinnn/package-license-types/master/package-license-types.js) and install the dependency.

#### Dependency

* [is-spdx-license-identifier](https://github.com/shinnn/is-spdx-license-identifier.js)

## API

### packageLicenseTypes(*packageData*)

*packageData*: `Object`  
Return: `Array` of `String`

It returns an array of the [SPDX license](http://spdx.org/licenses/) identifiers specified in the `license` and `licenses` properties of its first argument.

```javascript
var packageLicenseTypes = require('package-license-types');

var pkg = require('./package.json');
packageLicenseTypes(pkg); //=> ['MIT']
```

```javascript
packageLicenseTypes({
  licenses: [
    'MIT',        // valid SPDX license identifier
    'foo-bar-baz' // invalid
  ]
}); //=> ['MIT']
```

It returns an empty array when it cannot find any license types from data.

```javascript
packageLicenseTypes({
  license: {
    url: 'https://github.com/shinnn/package-license-types/blob/master/LICENSE'
  }
}); //=> []
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
