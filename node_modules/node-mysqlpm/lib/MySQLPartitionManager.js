/* eslint no-use-before-define: 0, no-multi-str: 0 */

'use strict';

var
  fs = require('fs'),
  path = require('path');

// module deps
var
  _ = require('underscore'),
  async = require('async'),
  BashTemplate = require('node-bash-template'),
  SQLTemplate = require('node-sql-template'),
  raise = require('node-raise');

function MySQLPartitionManager(options) {

  if ( ! _.isObject(options)) {
    raise(TypeError, 'Missing or invalid options,', options);
  }

  if ( ! _.isObject(options.connection)) {
    raise(TypeError, 'Missing or invalid connection,', options.connection);
  }

  this._isDebug = !! options.isDebug;

  _initBackupDir.call(this, options.backupDir);
  _initSQLTemplate.call(this, options.connection);
  _initBashTemplate.call(this);
}

MySQLPartitionManager.forge = function (options) {
  return new this(options);
};

MySQLPartitionManager.prototype.empty = function (options, done) {

  if ( ! _.isObject(options)) {
    raise(TypeError, 'Missing or invalid options,', options);
  }

  if ( ! _.isString(options.schema)) {
    raise(TypeError, 'Missing or invalid schema,', options.schema);
  }

  if ( ! _.isString(options.table)) {
    raise(TypeError, 'Missing or invalid table,', options.table);
  }

  if ( ! _.isString(options.partition)) {
    raise(TypeError, 'Missing or invalid partition,', options.partition);
  }

  var
    schema = options.schema,
    table = options.table,
    partition = options.partition,

    sql = this._sql,

    context = this,
    locals = {};

  async.series(
    [
      // initialize variables
      function (callback) {

        var
          dbFileNoExt = table+'_'+partition,

          partitionedTable = table,
          exchangedWithTable = dbFileNoExt;

        locals.partitionedTable = partitionedTable;
        locals.exchangedWithTable = exchangedWithTable;

        callback();
      },

      // create table
      function (callback) {
        sql.run('createTable', [
          schema,
          locals.exchangedWithTable,
          locals.exchangedWithTable,
          locals.partitionedTable,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // exchange partition
      function (callback) {
        sql.run('exchangePartition', [
          schema,
          locals.partitionedTable,
          partition,
          locals.exchangedWithTable,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // drop table
      function (callback) {
        sql.run('dropTable', [
          schema,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      }
    ],
    function (error) {
      done(error);
    }
  );
};

MySQLPartitionManager.prototype.backup = function (options, done) {

  if ( ! _.isObject(options)) {
    raise(TypeError, 'Missing or invalid options,', options);
  }

  if ( ! _.isString(options.schema)) {
    raise(TypeError, 'Missing or invalid schema,', options.schema);
  }

  if ( ! _.isString(options.table)) {
    raise(TypeError, 'Missing or invalid table,', options.table);
  }

  if ( ! _.isString(options.partition)) {
    raise(TypeError, 'Missing or invalid partition,', options.partition);
  }

  var
    schema = options.schema,
    table = options.table,
    partition = options.partition,

    backupDir = this._backupDir,

    sql = this._sql,
    bash = this._bash,

    context = this,
    locals = {};

  async.series(
    [
      // query mysql to get datadir
      function (callback) {
        sql.run('getDataDir', function (error, rows) {
          if (error) {
            return callback(error);
          }

          locals.dataDir = rows[0].dataDir;

          callback();
        });
      },

      // initialize variables
      function (callback) {

        var
          dbSchemaDir = path.join(locals.dataDir, schema),

          dbFileNoExt = table+'_'+partition,
          dbFilePathNoExt = path.join(dbSchemaDir, dbFileNoExt),
          dbFilePathIbd = dbFilePathNoExt+'.ibd',
          dbFilePathCfg = dbFilePathNoExt+'.cfg',

          partitionedTable = table,
          exchangedWithTable = dbFileNoExt;

        locals.dbSchemaDir = dbSchemaDir;
        locals.dbFileNoExt = dbFileNoExt;
        locals.dbFilePathIbd = dbFilePathIbd;
        locals.dbFilePathCfg = dbFilePathCfg;
        locals.partitionedTable = partitionedTable;
        locals.exchangedWithTable = exchangedWithTable;

        callback();
      },

      // create table
      function (callback) {
        sql.run('createTable', [
          schema,
          locals.exchangedWithTable,
          locals.exchangedWithTable,
          locals.partitionedTable,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // exchange partition
      function (callback) {
        sql.run('exchangePartitionAtBackup', [
          schema,
          locals.partitionedTable,
          partition,
          locals.exchangedWithTable,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // copy ibd file
      function (callback) {
        fs.exists(locals.dbFilePathIbd, function (exists) {
          if ( ! exists) {
            return callback(new Error('Missing '+locals.dbFilePathIbd));
          }
          bash.run('copy', {
            from: locals.dbFilePathIbd,
            to: backupDir
          }, function (error) {
            callback(error);
          });
        });
      },

      // copy cfg file
      function (callback) {
        fs.exists(locals.dbFilePathCfg, function (exists) {
          if ( ! exists) {
            return callback();
          }
          bash.run('copy', {
            from: locals.dbFilePathCfg,
            to: backupDir
          }, function (error) {
            callback(error);
          });
        });
      },

      // unlock tables
      function (callback) {
        sql.run('unlockTables', function (error) {
          callback(error);
        });
      },

      function (callback) {

        var
          filepath = path.join(backupDir, path.basename(locals.dbFilePathIbd));

        fs.exists(filepath, function (exists) {
          if ( ! exists) {
            return callback(new Error('Missing '+filepath));
          }
          sql.run('dropTable', [
            schema,
            locals.exchangedWithTable
          ], function (error) {
            callback(error);
          });
        });
      }
    ],
    function (error) {
      done(error);
    }
  );
};

MySQLPartitionManager.prototype.restore = function (options, done) {

  if ( ! _.isObject(options)) {
    raise(TypeError, 'Missing or invalid options,', options);
  }

  if ( ! _.isString(options.schema)) {
    raise(TypeError, 'Missing or invalid schema,', options.schema);
  }

  if ( ! _.isString(options.table)) {
    raise(TypeError, 'Missing or invalid table,', options.table);
  }

  if ( ! _.isString(options.partition)) {
    raise(TypeError, 'Missing or invalid partition,', options.partition);
  }

  var
    schema = options.schema,
    table = options.table,
    partition = options.partition,

    backupDir = this._backupDir,
    sql = this._sql,
    bash = this._bash,

    context = this,
    locals = {};

  async.series(
    [
      // query mysql to get datadir
      function (callback) {
        sql.run('getDataDir', function (error, rows) {
          if (error) {
            return callback(error);
          }

          locals.dataDir = rows[0].dataDir;

          callback();
        });
      },

      // initialize variables
      function (callback) {

        var
          dbBackupDir = path.join(backupDir),
          dbSchemaDir = path.join(locals.dataDir, schema),

          dbFileNoExt = table+'_'+partition,
          dbFilePathNoExt = path.join(dbBackupDir, dbFileNoExt),
          dbFilePathIbd = dbFilePathNoExt+'.ibd',
          dbFilePathCfg = dbFilePathNoExt+'.cfg',

          partitionedTable = table,
          exchangedWithTable = dbFileNoExt;

        locals.dbSchemaDir = dbSchemaDir;
        locals.dbFileNoExt = dbFileNoExt;
        locals.dbFilePathIbd = dbFilePathIbd;
        locals.dbFilePathCfg = dbFilePathCfg;
        locals.partitionedTable = partitionedTable;
        locals.exchangedWithTable = exchangedWithTable;

        callback();
      },

      // check for .ibd file existence
      function (callback) {
        fs.exists(locals.dbFilePathIbd, function (exists) {
          if ( ! exists) {
            return callback(new Error('Missing '+locals.dbFilePathIbd));
          }
          callback();
        });
      },

      // discard tablespace
      function (callback) {
        sql.run('discardTablespace', [
          schema,
          locals.exchangedWithTable,
          locals.exchangedWithTable,
          locals.partitionedTable,
          locals.exchangedWithTable,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // copy backup ibd file to datadir
      function (callback) {
        bash.run('copy', {
          from: locals.dbFilePathIbd,
          to: locals.dbSchemaDir
        }, function (error, stdout, stderr) {
          if (error) {
            return callback(error);
          }
          if (stderr) {
            return callback(new Error(stderr));
          }
          callback();
        });
      },

      // copy cfg file to datadir
      function (callback) {
        fs.exists(locals.dbFilePathCfg, function (exists) {
          if ( ! exists) {
            return callback();
          }

          bash.run('copy', {
            from: locals.dbFilePathCfg,
            to: locals.dbSchemaDir
          }, function (error, stdout, stderr) {
            if (error) {
              return callback(error);
            }
            if (stderr) {
              return callback(new Error(stderr));
            }
            callback();
          });
        });
      },

      // import tablespace
      function (callback) {
        sql.run('importTablespace', [
          schema,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // exchange partition
      function (callback) {
        sql.run('exchangePartition', [
          schema,
          locals.partitionedTable,
          partition,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // drop table
      function (callback) {
        sql.run('dropTable', [
          schema,
          locals.exchangedWithTable
        ], function (error) {
          callback(error);
        });
      },

      // analyze table to update information_schema.partitions
      function (callback) {
        sql.run('analyzeTable', [
          schema,
          locals.partitionedTable
        ], function (error) {
          callback(error);
        });
      }
    ],
    function (error) {
      done(error);
    }
  );
};

MySQLPartitionManager.prototype.end = function () {
  this._sql.end();
};

function _initBackupDir(dir) {
  this._backupDir = dir;
}

function _initSQLTemplate(connection) {

  var
    options = {
      template: {
        dir: path.resolve(__dirname, '../sql'),
        ext: 'sql'
      },
      connection: _.extend({}, connection, { multipleStatements: true }),
      isDebug: this._isDebug
    };

  this._sql = SQLTemplate.forge(options);
}

function _initBashTemplate() {

  var
    options = {
      template: {
        dir: path.resolve(__dirname, '../bash'),
        ext: 'sh'
      },
      isDebug: this._isDebug
    };

  this._bash = BashTemplate.forge(options);
}

module.exports = MySQLPartitionManager;
