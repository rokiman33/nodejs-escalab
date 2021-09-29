/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

'use strict';

var
  expect = require('chai').expect;

var
  raise = require('../');

describe('Unit tests', function () {
  it('works', function () {

    expect(function () {
      raise(Error, 'An error message with %s %d %j', 'string', 1, { key: 'value' }, 'and something else');
    }).to.throw(Error, 'An error message with string 1 {"key":"value"} and something else');
  });
});
