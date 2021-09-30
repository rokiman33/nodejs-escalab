'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'us-mm-auto-sfo-04-bh.cleardb.net',
    port     : '3306',
    user     : 'b85feb6f36bdab',
    password : '436e0f80',
    database : 'heroku_825bf03bb435a0e'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
