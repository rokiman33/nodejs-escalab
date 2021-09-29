'use strict';

var
  fs = require('fs'),
  exec = require('child_process').exec,
  path = require('path');

// module deps
var
  _ = require('underscore');

// file deps
var
  raise = require('./functions/raise');

var
  settings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

function _getTemplate(filename) {

  var
    dir = this._dir,
    ext = this._ext,

    template = this._template,

    filepath;

  filename = path.basename(filename, ext)+ext;

  if ( ! template[filename]) {
    filepath = path.join(dir, filename);
    template[filename] = _.template(
      fs.readFileSync(filepath, { encoding: 'utf8' }), settings);
  }

  return template[filename];
}

function _exec(bash, done) {
  var child = exec(bash, done);
  if (this._isDebug) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
  return child;
}

function BashTemplate(options) {

  if ( ! _.isObject(options)) {
    raise(TypeError, 'Missing or invalid options,', options);
  }

  if ( ! options.template) {
    raise(TypeError, 'Missing or invalid template configuration,',
      options.template);
  }

  var
    template = options.template;

  this._dir = template.dir || './bash';
  this._ext = '.'+(template.ext.replace(/^\.+/ig, '') || 'sh');
  this._isDebug = !! options.isDebug;

  this._template = {};
}

BashTemplate.forge = function (options) {
  return new this(options);
};

BashTemplate.prototype.render = function (filename, data) {

  if ( ! _.isString(filename)) {
    raise(TypeError, 'Missing or invalid filename,', filename);
  }

  if ( ! _.isObject(data)) {
    raise(TypeError, 'Missing or invalid data,', data);
  }

  var
    template = _getTemplate.call(this, filename),
    bash = template(data);

  return bash;
};

BashTemplate.prototype.run = function (filename, data, done) {

  if (_.isFunction(data)) {
    done = data;
    data = {};
  }

  var
    bash = this.render(filename, data);

  if (this._isDebug) {
    console.log(bash);
  }

  return _exec.call(this, bash, done);
};

module.exports = BashTemplate;
