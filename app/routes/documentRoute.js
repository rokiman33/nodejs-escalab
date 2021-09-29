'use strict';
module.exports = function(app) {
  var documentInstance = require('../controllers/documentController');

  app.route('/document')
    .get(documentInstance.listAll)
    .post(documentInstance.createNew);
   
   app.route('/document/:DocumentId')
    .get(documentInstance.readById)
    .put(documentInstance.updateById)
    .delete(documentInstance.deleteById);

	app.route('/document/search/:searchKey')
    .get(documentInstance.search);
    };
