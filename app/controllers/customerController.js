'use strict';
var helper = require('../models/helper.js');
var CustomerController = require('../models/customerModel.js');

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
  CustomerController.getAll(req,offset,pageSize,function(err, customer) {

  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
      var totalCount=0; 
      
      CustomerController.totalCount(req,function(err, total) {
			if (err){ 
             res.status(200).send(helper.createResponse(helper.Error,0,err,""));
            }else{ 
            if(total && total[0] && total[0].TotalCount && total[0].TotalCount>0){
            totalCount=total[0].TotalCount;
            var result={records:customer,pageNo:pageNo,pageSize:pageSize,totalCount:totalCount};
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
  CustomerController.search(req,req.params.searchKey.toLowerCase(),offset,pageSize,function(err, customer) {

  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
       var totalCount=0;
		  CustomerController.totalSearchCount(req,req.params.searchKey.toLowerCase(),function(err, total) {
			if (err){ 
             res.status(200).send(helper.createResponse(helper.Error,0,err,""));
            }else{ 
            if(total && total[0] && total[0].TotalCount && total[0].TotalCount>0){
            totalCount=total[0].TotalCount;
            var result={records:customer,pageNo:pageNo,pageSize:pageSize,totalCount:totalCount};
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
  var reqObj = new CustomerController(req,req.body);
   var createObj = {
    
//CustomerId:req.body.CustomerId,
CustName:req.body.CustName,
CustIdentity:req.body.CustIdentity,
CustCert:req.body.CustCert,
CustDocType:req.body.CustDocType,
CustFinalDate:req.body.CustFinalDate,
CustActivationDate:req.body.CustActivationDate,
CustSale:req.body.CustSale,
CustPay:req.body.CustPay,
CustReLoad:req.body.CustReLoad,
CustStatus:req.body.CustStatus,
CustInfoAdic1:req.body.CustInfoAdic1,
CustInfoAdic2:req.body.CustInfoAdic2,
CustInfoAdic3:req.body.CustInfoAdic3,
CustInfoAdic4:req.body.CustInfoAdic4,
CustDateAdic1:req.body.CustDateAdic1,
CustDateAdic2:req.body.CustDateAdic2,
CustValueAdic1:req.body.CustValueAdic1,
CustValueAdic2:req.body.CustValueAdic2,
CustValueAdic3:req.body.CustValueAdic3,
    };
   if(!createObj.CustomerId || !createObj.CustName){

            res.status(400).send({ error:true, message: 'Please provide required fields' });

        }
else{
 
  CustomerController.create(req,createObj, function(err, customer) {
    
	  if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Record Created",customer));
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
  CustomerController.getById(req,req.params.CustomerId, function(err, customer) {
      if (err){
      res.status(200).send(helper.createResponse(helper.Error,0,err,""));
	  }else{
    res.status(200).send(helper.createResponse(helper.Success,1,"Record found",customer[0]));
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
  CustomerController.updateById(req,req.params.CustomerId, new CustomerController(req,req.body), function(err, customer) {
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
  CustomerController.remove(req,req.params.CustomerId, function(err, customer) {
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
