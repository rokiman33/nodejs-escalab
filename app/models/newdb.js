'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'rokiman21',
    database : 'giftdata'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
