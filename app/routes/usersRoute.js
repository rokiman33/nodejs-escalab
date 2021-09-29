'use strict';
module.exports = function(app) {
  var usersInstance = require('../controllers/usersController');

  app.route('/users')
    .get(usersInstance.listAll)
    .post(usersInstance.createNew);
   
   app.route('/users/:Id')
    .get(usersInstance.readById)
    .put(usersInstance.updateById)
    .delete(usersInstance.deleteById);

	app.route('/users/search/:searchKey')
    .get(usersInstance.search);
    };
