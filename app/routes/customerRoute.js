'use strict';
module.exports = function(app) {
  var customerInstance = require('../controllers/customerController');

  app.route('/customer')
    .get(customerInstance.listAll)
    .post(customerInstance.createNew);
   
   app.route('/customer/:CustomerId')
    .get(customerInstance.readById)
    .put(customerInstance.updateById)
    .delete(customerInstance.deleteById);

	app.route('/customer/search/:searchKey')
    .get(customerInstance.search);
    };
