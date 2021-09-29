/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

'use strict';

// core deps
var
  path = require('path');

// module deps
var
  expect = require('chai').expect;

// file deps
var
  PartitionManager = require('../lib/PartitionManager');

describe('Unit tests', function () {

  var
    pm;

  before(function () {

    var
      options = {
        connection: require('./connection.json'),
        backupDir: path.resolve(__dirname, './backup')
      };

    pm = PartitionManager.forge(options);
  });

  it.only('#backup', function (done) {
    var
      options = {
        schema: 'si_match_scopa_archive',
        table: 'monthly_score_stat',
        partition: 'p201401'
      };

    pm.backup(options, function (error) {
      expect(error).to.be.null;
      done(error);
    });
  });

  it('#restore', function (done) {

    var
      options = {
        schema: 'si_match_scopa_archive',
        table: 'monthly_score_stat',
        partition: 'p201401'
      };

    pm.restore(options, function (error) {
      expect(error).to.be.null;
      done(error);
    });
  });
});
