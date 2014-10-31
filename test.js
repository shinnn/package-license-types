'use strict';

var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(9);

    t.deepEqual(main({license: 'MIT'}), ['MIT'], 'should return a license.');

    t.deepEqual(
      main({licenses: ['GPL', 'BSD']}), ['GPL', 'BSD'],
      'should return licenses.'
    );

    t.deepEqual(
      main({license: {type: 'MIT'}}), ['MIT'],
      'should return a license from an object.'
    );

    t.deepEqual(
      main({licenses: [{type: 'GPL'}, {type: 'BSD'}]}), ['GPL', 'BSD'],
      'should return licenses from an array of objects.'
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
    }, /TypeError/, 'should throw a type error when it takes falsy value.');
  });
}

runTest('require(\'package-license-types\')', require('./'));

global.window = {};

var bowerMain = require('./bower.json').main;
require(bowerMain);

runTest('window.packageLicenseTypes', window.packageLicenseTypes);
