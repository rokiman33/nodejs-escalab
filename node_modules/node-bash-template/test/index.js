/* eslint-env mocha */
/* eslint no-unused-expressions:0 */

'use strict';

var
  path = require('path');

var
  expect = require('chai').expect;

var
  BashTemplate = require('../lib/BashTemplate');

describe('Unit tests', function () {

  var
    template;

  before(function () {

    var
      options = {
        template: {
          dir: path.resolve(__dirname, './bash'),
          ext: 'sh'
        },
        isDebug: true
      };

    template = BashTemplate.forge(options);
  });

  it('renders', function () {

    var
      rendered = template.render('script', { message: 'ok' });

    expect(rendered).to.equal('echo ok\n');
  });

  it('runs', function (done) {

    template.run('script', { message: 'ok' }, function (error, stdout, stderr) {
      expect(error).to.be.null;
      expect(stdout).to.equal('ok\n');
      expect(stderr).to.equal('');
      done();
    });
  });
});
