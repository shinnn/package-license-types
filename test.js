'use strict';

var requireBowerFiles = require('require-bower-files');
var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(10);

    t.deepEqual(main({license: 'MIT'}), ['MIT'], 'should return a license.');

    t.deepEqual(
      main({license: ['GPL-3.0', 'BSD-3-Clause']}), ['GPL-3.0', 'BSD-3-Clause'],
      'should return licenses.'
    );

    t.deepEqual(
      main({license: {type: 'MIT'}}), ['MIT'],
      'should return a license from an object.'
    );

    t.deepEqual(
      main({licenses: [{type: 'GPL-3.0'}, {type: 'BSD-3-Clause'}]}), ['GPL-3.0', 'BSD-3-Clause'],
      'should return licenses from an array of objects.'
    );

    t.deepEqual(
      main({licenses: ['foo', {type: 'bar'}]}), [],
      'should exclude non-SPDX-license values.'
    );

    t.deepEqual(
      main({}), [],
      'should return `[]` when it takes an object which has no license-related properties.'
    );

    t.deepEqual(
      main({licenses: []}), [],
      'should return `[]` when `licenses` property includes no licenses.'
    );

    t.deepEqual(
      main({licenses: [{url: 'foo'}]}), [],
      'should return `[]` when it cannot find any license types from `licenses`.'
    );

    t.throws(function() {
      main();
    }, /TypeError/, 'should throw a type error when it takes no arguments.');

    t.throws(function() {
      main(null);
    }, /TypeError/, 'should throw a type error when it takes non-object value.');
  });
}

runTest('require(\'package-license-types\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.packageLicenseTypes', window.packageLicenseTypes);
