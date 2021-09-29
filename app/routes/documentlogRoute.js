'use strict';
module.exports = function(app) {
  var documentlogInstance = require('../controllers/documentlogController');

  app.route('/documentlog')
    .get(documentlogInstance.listAll)
    .post(documentlogInstance.createNew);
   
   app.route('/documentlog/:DocumentId')
    .get(documentlogInstance.readById)
    .put(documentlogInstance.updateById)
    .delete(documentlogInstance.deleteById);

	app.route('/documentlog/search/:searchKey')
    .get(documentlogInstance.search);
    };
