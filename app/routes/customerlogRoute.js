'use strict';
module.exports = function(app) {
  var customerlogInstance = require('../controllers/customerlogController');

  app.route('/customerlog')
    .get(customerlogInstance.listAll)
    .post(customerlogInstance.createNew);
   
   app.route('/customerlog/:CustomerId')
    .get(customerlogInstance.readById)
    .put(customerlogInstance.updateById)
    .delete(customerlogInstance.deleteById);

	app.route('/customerlog/search/:searchKey')
    .get(customerlogInstance.search);
    };
