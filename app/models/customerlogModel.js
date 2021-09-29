'user strict';
var sql = require('./newdb.js');
var url = require('url');
var helper = require('./helper');
//Customerlog object constructor

var Customerlog = function(req,customerlog){
    
this.CustomerId = customerlog.CustomerId;
this.LogDate = customerlog.LogDate;
this.LogOper = customerlog.LogOper;
};
Customerlog.create = function (req,newCustomerlog, result) {    
        sql.query("INSERT INTO customerlog set ?",newCustomerlog, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Customerlog.getById = function (req,CustomerId, result) {
        sql.query("SELECT  t.* FROM customerlog t  WHERE t.CustomerId= ? LIMIT 0,1", CustomerId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else if(res && res.length>0){
                    result(null, res);
              
                }else{
                    result("Record Not Found", null);
                }
            });   
};
Customerlog.totalCount = function (req,result) {
        sql.query("SELECT count(*) TotalCount FROM customerlog t  ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Customerlog.totalSearchCount = function (req,searchKey,result) {
        sql.query("SELECT count(*) TotalCount FROM customerlog t  WHERE  LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogOper) LIKE CONCAT('%','"+searchKey+"','%') ", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Customerlog.getAll = function (req,offset,pageSize,result) {
        sql.query("SELECT  t.* FROM customerlog t  LIMIT ?, ?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('customerlog : ', res);  

                 result(null, res);
                }
            });   
};
Customerlog.search = function (req,searchKey,offset,pageSize,result) {

        sql.query("SELECT  t.* FROM customerlog t  WHERE  LOWER(t.CustomerId) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogDate) LIKE CONCAT('%','"+searchKey+"','%') OR LOWER(t.LogOper) LIKE CONCAT('%','"+searchKey+"','%') LIMIT ?,?",[offset,pageSize],function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('customerlog : ', res);  

                 result(null, res);
                }
            });   
};
Customerlog.updateById = function(req,CustomerId, customerlog, result){
  sql.query("UPDATE customerlog SET CustomerId = ?,LogDate = ?,LogOper = ? WHERE CustomerId= ?",[ customerlog.CustomerId, customerlog.LogDate, customerlog.LogOper,CustomerId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Customerlog.remove = function(req,CustomerId, result){
     sql.query("DELETE FROM customerlog Where CustomerId=?",[CustomerId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Customerlog;
