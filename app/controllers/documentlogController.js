'use strict';
var helper = require('../models/helper.js');
var DocumentlogController = require('../models/documentlogModel.js');

exports.listAll = function(req, res) {
	helper.checkPermission(req,"v",function (isPermited) {
        if(isPermited){
        var pageNo=1;
        if(req.query && req.query.pageNo){
        pageNo=parseInt(req.query.pageNo);
        }
        var pageSize=30;
        if(req.query && req.query.pageSize){
        pageSize=parseInt(req.query.pageSize);
        }
        var offset = (pageNo - 1) * pageSize;
  DocumentlogController.getAll(req,offset,pageSize,function(err, documentlog) {

  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
      var totalCount=0; 
      
      DocumentlogController.totalCount(req,function(err, total) {
			if (err){ 
             res.status(200).send(helper.createResponse(helper.Error,0,err,""));
            }else{ 
            if(total && total[0] && total[0].TotalCount && total[0].TotalCount>0){
            totalCount=total[0].TotalCount;
            var result={records:documentlog,pageNo:pageNo,pageSize:pageSize,totalCount:totalCount};
            res.status(200).send(helper.createResponse(helper.Success,1,"Record found",result));
            }else{
            res.status(200).send(helper.createResponse(helper.Error,0,"No Record Found",""));
            }
            }});
	}

    
  });
  } else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};


exports.search = function(req, res) {
	helper.checkPermission(req,"v",function (isPermited) {
        if(isPermited){
        var pageNo=1;
        if(req.query && req.query.pageNo){
        pageNo=parseInt(req.query.pageNo);
        }
        var pageSize=30;
        if(req.query && req.query.pageSize){
        pageSize=parseInt(req.query.pageSize);
        }
        var offset = (pageNo - 1) * pageSize;
  DocumentlogController.search(req,req.params.searchKey.toLowerCase(),offset,pageSize,function(err, documentlog) {

  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
       var totalCount=0;
		  DocumentlogController.totalSearchCount(req,req.params.searchKey.toLowerCase(),function(err, total) {
			if (err){ 
             res.status(200).send(helper.createResponse(helper.Error,0,err,""));
            }else{ 
            if(total && total[0] && total[0].TotalCount && total[0].TotalCount>0){
            totalCount=total[0].TotalCount;
            var result={records:documentlog,pageNo:pageNo,pageSize:pageSize,totalCount:totalCount};
            res.status(200).send(helper.createResponse(helper.Success,1,"Record found",result));
            }else{
            res.status(200).send(helper.createResponse(helper.Error,0,"No Record Found",""));
            }
            }});
	}

    
  });
  } else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};


exports.createNew = function(req, res) {
helper.checkPermission(req,"a",function (isPermited) {
        if(isPermited){
  var reqObj = new DocumentlogController(req,req.body);
   var createObj = {
    
DocumentId:req.body.DocumentId,
LogDate:req.body.LogDate,
LogOper:req.body.LogOper,
    };
   if(!createObj.DocumentId || !createObj.LogDate || !createObj.LogOper){

            res.status(400).send({ error:true, message: 'Please provide required fields' });

        }
else{
 
  DocumentlogController.create(req,createObj, function(err, documentlog) {
    
	  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Record Created",documentlog));
	}
  });
}
} else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};


exports.readById = function(req, res) {
helper.checkPermission(req,"v",function (isPermited) {
        if(isPermited){
  DocumentlogController.getById(req,req.params.DocumentId, function(err, documentlog) {
      if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Record found",documentlog[0]));
	}
  });
  } else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};


exports.updateById = function(req, res) {
helper.checkPermission(req,"u",function (isPermited) {
        if(isPermited){
  DocumentlogController.updateById(req,req.params.DocumentId, new DocumentlogController(req,req.body), function(err, documentlog) {
     if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Record Updated",""));
	}
  });
  } else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};


exports.deleteById = function(req, res) {
helper.checkPermission(req,"d",function (isPermited) {
        if(isPermited){
  DocumentlogController.remove(req,req.params.DocumentId, function(err, documentlog) {
      if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Deleted",""));
	}
  });
  } else{
            res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
		}
    });
};
